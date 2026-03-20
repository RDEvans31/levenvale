import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function MembersPage() {
  const session = await auth();

  const userId = session?.user.id;

  if (!session) {
    redirect('/login');
  }
  if (userId) {
    redirect(`/members-v2/${userId}`);
  }

  return <></>;
}
