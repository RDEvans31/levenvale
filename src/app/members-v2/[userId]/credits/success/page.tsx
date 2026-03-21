import {
  addUserTokens,
  getUserBonusEligibility,
} from '@/actions/members/balance';
import { getOrgInfo } from '@/actions/members/org-info';
import ProgressBarCredit from '@/components/members-v2/credits/success/ProgressBarCredit';
import TotalContribution from '@/components/members-v2/credits/success/TotalContribution';
import TotalContributionSkeleton from '@/components/members-v2/credits/success/skeletons/TotalContributionSkeleton';
import { SignOut } from '@/components/navbar/ButtonSignOut';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { auth } from '@/lib/auth';
import convertCashToToken from '@/lib/helper/convertCashToToken';
import { LF_API_KEY, LF_API_URL } from '@/lib/little-farma/little-farma';
import { stripe } from '@/lib/stripe';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

const ORG_ID = process.env.ORG_ID;

type PaymentIntent = {
  id: string;
  status: string;
  amount: number;
  currency: string;
  created: number;
};

interface AddCreditDto {
  userId: string;
  amount: number;
  referenceId: string;
  description: string;
  cashAmount: number;
}

export default async function CreditSuccessPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ userId: string }>;
}) {
  const session = await auth();
  const paymentIntentId = (await searchParams)['payment_intent'] as string;
  const paymentIntentClientSecret = (await searchParams)[
    'payment_intent_client_secret'
  ] as string;
  const redirectStatus = (await searchParams)['redirect_status'] as string;
  let paymentSucceeded = false;
  let paymentIntent: PaymentIntent;
  const returnUrl = (await searchParams)['returnUrl'] as string | undefined;

  const { userId: id } = await params;
  const userId = session?.user.id == id && id;
  const membershipId = session?.user.membershipId;
  if (!userId || !membershipId) {
    return (
      <div className="bg-gray-50">
        <ErrorDisplay errorMsg="No user found in database. Please contact support." />
        <SignOut />
      </div>
    );
  }

  if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
    return <ErrorDisplay errorMsg="API configuration missing" />;
  }

  if (
    !paymentIntentId ||
    redirectStatus !== 'succeeded' ||
    !paymentIntentClientSecret
  ) {
    return (
      <ErrorDisplay errorMsg="Sorry! There was an error verifying the payment. You will not have been charged and no tokens have been added. If you have been charged, contact us and we'll sort you out." />
    );
  }
  try {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    paymentSucceeded = paymentIntent.status == 'succeeded';
  } catch (error) {
    return (
      <ErrorDisplay
        errorMsg={`Error verifying payment. paymentId: ${paymentIntentId}. ${error}`}
      />
    );
  }

  if (!paymentSucceeded) {
    return (
      <ErrorDisplay
        errorMsg={`Payment unsuccessful. paymentId: ${paymentIntentId}`}
      />
    );
  }

  const orgInfoResult = await getOrgInfo();
  const tokensPerLocalCurrency = orgInfoResult.success
    ? orgInfoResult.value.tokensPerLocalCurrency
    : 2;
  const localCurrencySymbol =
    orgInfoResult.success && orgInfoResult.value.localCurrency === 'GBP'
      ? '£'
      : '$';

  const currencyAmount = paymentIntent.amount / 100;
  let creditAmount = convertCashToToken(currencyAmount, tokensPerLocalCurrency);

  // Check for loyalty bonus and apply it
  const bonusResponse = await getUserBonusEligibility(membershipId);
  let bonusAmount = 0;
  let description = `Stripe payment: ${localCurrencySymbol}${currencyAmount.toFixed(2)}`;

  if (bonusResponse.success && bonusResponse.value.eligible) {
    bonusAmount = creditAmount * (bonusResponse.value.bonusPercentage / 100);
    creditAmount = creditAmount + bonusAmount;
    description = `Stripe payment: ${localCurrencySymbol}${currencyAmount.toFixed(2)} (with ${bonusResponse.value.bonusPercentage}% loyalty bonus)`;
  }

  const creditData: AddCreditDto = {
    userId,
    amount: creditAmount,
    referenceId: paymentIntentId,
    description,
    cashAmount: currencyAmount,
  };

  const result = await addUserTokens(membershipId, creditData);

  if (!result.success) {
    console.error('Error calling LF API for credit addition:', result.error);
    return (
      <ErrorDisplay
        errorMsg={`Error adding credit via API. paymentId: ${paymentIntentId}. ${result.error}`}
      />
    );
  }

  // Convert the new balance from the API response back to tokens if needed
  const newTokenBalance = result.value.newBalance;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-emerald-700 px-4 py-8">
      <div className="max-w-md mx-auto space-y-8">
        {/* Success Icon */}
        <div className="text-center pt-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            You&apos;re good to go!
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="px-4">
          <ProgressBarCredit newBalance={newTokenBalance} />
        </div>

        {/* Chart Section */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Your total contributions
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Every contribution goes towards
            <br />
            building the food security you deserve
          </p>

          <div className="mt-6 mb-6">
            <Suspense fallback={<TotalContributionSkeleton />}>
              <TotalContribution membershipId={membershipId} />
            </Suspense>
          </div>
        </div>

        {returnUrl && (
          <div className="px-4">
            <Link
              href={returnUrl}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 rounded-lg text-center transition-colors block"
            >
              Next
            </Link>
          </div>
        )}

        {/* CTA Button */}
        {!returnUrl && (
          <div className="px-4">
            <Link
              href="/members-v2/pantry"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 rounded-lg text-center transition-colors block"
            >
              Access the pantry now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
