import { getUserTokenBalance } from '@/actions/members/balance';
import SelfTopUpPage from '@/components/members-v2/credits/SelfTopUpPage';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { auth } from '@/lib/auth';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const ORG_ID = process.env.ORG_ID!;

export default async function CreditsPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const session = await auth();
  const { userId } = await params;
  const membershipId = session?.user.membershipId;

  if (!session?.user.id || session.user.id != userId) {
    return (
      <ErrorDisplay
        errorMsg={`You do not have permission to view this page.`}
      />
    );
  }

  if (!membershipId) {
    return (
      <ErrorDisplay errorMsg="Membership not found. Please contact support." />
    );
  }

  try {
    await fetch(`${baseUrl}/api/revalidate/user/${membershipId}/balance`, {
      cache: 'no-store',
    });
  } catch (error) {
    console.error('Failed to revalidate balance:', error);
  }

  const creditBalanceResponse = await getUserTokenBalance(membershipId);

  if (!creditBalanceResponse.success) {
    return (
      <ErrorDisplay
        errorMsg={`Error fetching: ${creditBalanceResponse.error}`}
      />
    );
  }

  const { balance: creditBalance, canSelfTopUp } =
    creditBalanceResponse.value;

  if (!canSelfTopUp) {
    return (
      <ErrorDisplay errorMsg="Self top-up is not enabled for your account." />
    );
  }

  return (
    <SelfTopUpPage
      creditBalance={creditBalance}
      userId={userId}
      orgId={ORG_ID}
      membershipId={membershipId}
    />
  );
}
