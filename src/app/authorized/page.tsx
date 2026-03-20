import { SignOut } from '@/components/navbar/ButtonSignOut';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { auth } from '@/lib/auth';
import { hasMinimumRole, ROLES, UserRole } from '@/lib/roles';
import { redirect } from 'next/navigation';

export default async function AuthorizedPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const userId = session.user.id;

  console.log(session.user);

  if (!userId) {
    console.error('Error: No userId found in session.');
    return (
      <div>
        <ErrorDisplay
          errorMsg={`Error: No userId found in session. ${JSON.stringify(session.user)}.`}
        />
        <p className="text-gray-600">
          Please message me on Whatsapp by clicking my number below. Send me a
          screenshot of this page and I&apos;ll work with you to sort it out.{' '}
          <a
            href="https://wa.me/447482400662"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            +447482400662
          </a>
        </p>
        <SignOut />
      </div>
    );
  }

  if (!session.user.name) {
    redirect('/onboarding/complete-profile');
  }

  if (hasMinimumRole(session.user.role as UserRole, ROLES.member) && userId) {
    redirect(`/members-v2/${userId}`);
  }
  redirect('/onboarding/not-subscribed');
}
