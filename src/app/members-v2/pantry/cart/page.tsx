import { getUserTokenBalance } from '@/actions/members/balance';
import { fetchUserShippingData } from '@/actions/users';
import CartPage from '@/components/pantry-v2/cart/CartPage';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  let shippingData = undefined;

  if (!session || !session.user.id) {
    return (
      <ErrorDisplay errorMsg="Something went wrong with your session! Please sign out and sign back in!" />
    );
  }
  const { id, name, email } = session.user;

  if (!name || !email) {
    redirect('/onboarding/complete-profile');
  }

  const [userShippingDataResponse, creditBalanceResult] = await Promise.all([
    fetchUserShippingData(id),
    getUserTokenBalance(id),
  ]);

  if (userShippingDataResponse.success) {
    shippingData = userShippingDataResponse.value;
  }
  if (!creditBalanceResult.success) {
    return (
      <ErrorDisplay
        errorMsg={`Failed to load credit balance: ${creditBalanceResult.error}`}
      />
    );
  }

  const { balance: creditBalance } = creditBalanceResult.value;

  return (
    <CartPage
      userId={id}
      name={name}
      email={email}
      shippingData={shippingData}
      creditBalance={creditBalance}
    />
  );
}
