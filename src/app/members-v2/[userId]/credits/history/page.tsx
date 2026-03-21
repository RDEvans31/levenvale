import { getUserTokenBalance } from '@/actions/members/balance';
import { getUserTransactions } from '@/actions/members/transactions';
import TransactionHistoryPage from '@/components/members-v2/transactions/TransactionHistoryPage';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const session = await auth();
  if (!(session?.user?.id && session?.user?.email) || session.user.id !== userId) {
    redirect('/login');
  }

  const membershipId = session.user.membershipId;
  if (!membershipId) {
    return (
      <ErrorDisplay errorMsg="Membership not found. Please contact support." />
    );
  }

  // Get user's current balance
  const balanceResponse = await getUserTokenBalance(membershipId);
  if (!balanceResponse.success) {
    return (
      <ErrorDisplay
        errorMsg={`Error fetching balance: ${balanceResponse.error}`}
      />
    );
  }

  // Get transaction history
  const transactionsResponse = await getUserTransactions(membershipId);

  if (!transactionsResponse.success) {
    return (
      <ErrorDisplay
        errorMsg={`Error fetching transactions: ${transactionsResponse.error}`}
      />
    );
  }

  const { balance: currentBalance } = balanceResponse.value;
  const transactionData = transactionsResponse.value;

  return (
    <TransactionHistoryPage
      user={session.user}
      currentBalance={currentBalance}
      transactions={transactionData.transactions}
    />
  );
}
