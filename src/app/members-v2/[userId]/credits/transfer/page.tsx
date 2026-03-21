import { getUserTokenBalance } from '@/actions/members/balance';
import TokenTransferPage from '@/components/members-v2/credits/transfer/TokenTransferPage';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { auth } from '@/lib/auth';
import { Result } from '@/types/result';

interface LittleFarmaMember {
  membershipId: string;
  name: string;
  email: string;
}

interface MembersDto {
  members: LittleFarmaMember[];
  total: number;
}

async function getMembers(): Promise<Result<MembersDto>> {
  try {
    const orgId = process.env.ORG_ID;
    const apiKey = process.env.LF_API_KEY;
    const apiUrl = process.env.LF_API_URL;

    if (!orgId || !apiKey || !apiUrl) {
      return {
        success: false,
        error: 'Missing Little Farma API configuration',
      };
    }

    const response = await fetch(`${apiUrl}/${orgId}/members`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch members: ${response.status}`,
      };
    }

    const data = (await response.json()) as MembersDto;

    if (!data.members || !Array.isArray(data.members)) {
      return {
        success: false,
        error: 'Invalid response format from Little Farma API',
      };
    }

    return { success: true, value: data };
  } catch (error) {
    return {
      success: false,
      error: `Failed to fetch members from Little Farma API: ${error}`,
    };
  }
}

export default async function TokenTransfer({
  params,
  searchParams,
}: {
  params: Promise<{ userId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { userId } = await params;
  const session = await auth();
  const membershipId = session?.user.membershipId;

  if (!membershipId) {
    return (
      <ErrorDisplay errorMsg="Membership not found. Please contact support." />
    );
  }

  const queryParams = await searchParams;
  const returnUrl = queryParams.returnUrl as string | undefined;

  const creditBalanceResponse = await getUserTokenBalance(membershipId);

  if (!creditBalanceResponse.success) {
    return (
      <ErrorDisplay
        errorMsg={`Error fetching: ${creditBalanceResponse.error}`}
      />
    );
  }

  const { balance: creditBalance } = creditBalanceResponse.value;

  const membersResult = await getMembers();

  if (!membersResult.success) {
    return <div>Error loading members: {membersResult.error}</div>;
  }

  const { members } = membersResult.value;

  return (
    <TokenTransferPage
      userId={userId}
      membershipId={membershipId}
      creditBalance={creditBalance}
      returnUrl={returnUrl}
      members={members}
    />
  );
}
