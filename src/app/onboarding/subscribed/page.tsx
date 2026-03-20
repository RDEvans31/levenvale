import SubscribedClientPage from '@/components/onboarding/subscribed/SubscribedClientPage';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SubscribedSuccessPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/login');
  }

  return <SubscribedClientPage email={session.user.email} />;
}
