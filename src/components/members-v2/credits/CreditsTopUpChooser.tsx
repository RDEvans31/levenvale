'use client';

import { Banknote, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import SelfTopUpPage from './SelfTopUpPage';
import TopUpCreditPage from './TopUpCreditPage';

type TopUpMethod = 'choose' | 'honesty-box' | 'card';

export default function CreditsTopUpChooser({
  userId,
  orgId,
  membershipId,
  creditBalance,
  canSelfTopUp,
  loyaltyBonus,
  bonusPercentage,
}: {
  userId: string;
  orgId: string;
  membershipId: string;
  creditBalance: number;
  canSelfTopUp: boolean;
  loyaltyBonus: boolean;
  bonusPercentage?: number;
}) {
  const [method, setMethod] = useState<TopUpMethod>(
    canSelfTopUp ? 'choose' : 'card'
  );

  if (method === 'honesty-box') {
    return (
      <div>
        <div className="px-4 pt-6">
          <div className="mx-auto max-w-sm">
            <button
              onClick={() => setMethod('choose')}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              &larr; Back to options
            </button>
          </div>
        </div>
        <SelfTopUpPage
          creditBalance={creditBalance}
          userId={userId}
          orgId={orgId}
          membershipId={membershipId}
        />
      </div>
    );
  }

  if (method === 'card') {
    return (
      <div className="min-h-screen flex flex-col px-4 py-8">
        <div className="flex-1">
          {canSelfTopUp && (
            <div className="mx-auto max-w-sm mb-4">
              <button
                onClick={() => setMethod('choose')}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                &larr; Back to options
              </button>
            </div>
          )}
          <TopUpCreditPage
            creditBalance={creditBalance}
            userId={userId}
            membershipId={membershipId}
            loyaltyBonus={loyaltyBonus}
            bonusPercentage={bonusPercentage}
          />
        </div>
        <div className="mx-auto max-w-sm w-full">
          <Link href={`/members-v2/${userId}`}>
            <button className="w-full text-gray-600 hover:text-gray-800 transition-colors text-center">
              <span className="underline">Back to dashboard</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // chooser view (only shown when canSelfTopUp is true)
  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <div className="mx-auto max-w-sm w-full">
          <h1 className="text-xl font-bold text-gray-900 mb-2 text-center">
            Add Tokens
          </h1>
          <p className="text-sm text-gray-500 text-center mb-8">
            How would you like to top up?
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setMethod('honesty-box')}
              className="flex items-center gap-4 w-full bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-400 transition-colors text-left"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100">
                <Banknote className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Honesty Box</p>
                <p className="text-sm text-gray-500">
                  Log a cash deposit you&apos;ve made
                </p>
              </div>
            </button>

            <button
              onClick={() => setMethod('card')}
              className="flex items-center gap-4 w-full bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-400 transition-colors text-left"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Card</p>
                <p className="text-sm text-gray-500">Pay by card online</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-sm w-full">
        <Link href={`/members-v2/${userId}`}>
          <button className="w-full text-gray-600 hover:text-gray-800 transition-colors text-center">
            <span className="underline">Back to dashboard</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
