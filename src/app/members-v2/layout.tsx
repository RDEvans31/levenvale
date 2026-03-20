import '@/app/globals.css';
import { getOrgInfo } from '@/actions/members/org-info';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { OrgProvider } from '@/context/OrgContext';
import { auth } from '@/lib/auth';
import { hasMinimumRole, ROLES, UserRole } from '@/lib/roles';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Levenvale Farm Members Portal',
  description:
    'Levenvale Farm is a regenerative farm in Bellingen, NSW. The mission is to build food-security and community sovereignty, while restoring the land and the people in it. This members portal is only available to members.',
};

async function AuthCheck({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  if (!hasMinimumRole(session?.user.role as UserRole, ROLES.member)) {
    redirect('/onboarding/not-subscribed');
  }
  return <>{children}</>;
}

export default async function MembersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgInfoResult = await getOrgInfo();
  const tokensPerLocalCurrency = orgInfoResult.success
    ? orgInfoResult.value.tokensPerLocalCurrency
    : 2;
  const localCurrency = orgInfoResult.success
    ? orgInfoResult.value.localCurrency
    : 'AUD';

  return (
    <OrgProvider
      tokensPerLocalCurrency={tokensPerLocalCurrency}
      localCurrency={localCurrency}
    >
      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-50 flex justify-center items-center">
            <LoadingSpinner />
          </div>
        }
      >
        <AuthCheck>{children}</AuthCheck>
      </Suspense>
    </OrgProvider>
  );
}
