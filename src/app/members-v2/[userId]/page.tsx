import CardEvents from '@/components/members-v2/CardEvents';
import CardGoToPantry from '@/components/members-v2/CardGoToPantry';
import PreviousOrders from '@/components/members-v2/PreviousOrders';
import PreviousOrdersSkeleton from '@/components/members-v2/PreviousOrdersSkeleton';
import TokenBalance from '@/components/members-v2/TokenBalance';
import { SignOut } from '@/components/navbar/ButtonSignOut';
import AutoSignOut from '@/components/shared/AutoSignOut';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { auth } from '@/lib/auth';
import { hasMinimumRole, ROLES, UserRole } from '@/lib/roles';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function MembersPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const session = await auth();

  const { userId } = await params;

  if (!userId) {
    return (
      <div className="bg-gray-50">
        <ErrorDisplay errorMsg="No user. Please contact support." />
        <SignOut />
      </div>
    );
  }

  const sessionRole: UserRole = session?.user.role as UserRole;
  if (!sessionRole) {
    redirect('/login');
  }

  if (!hasMinimumRole(sessionRole, ROLES.member)) {
    return <AutoSignOut redirect="/unauthorized" />;
  }

  const greetingDisplay =
    session?.user.name?.split(' ')[0] || session?.user.email;

  if (!greetingDisplay) {
    return (
      <div className="bg-gray-50">
        <ErrorDisplay errorMsg="Email missing. Please take a screenshot, sign out, and contact support." />
        <SignOut />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top navbar */}
      <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm">{greetingDisplay.charAt(0) || 'U'}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md flex items-center justify-center">
            <Image
              src="/levenvale-logo.png"
              alt="Levenvale Farm"
              width={32}
              height={32}
            />
          </div>
          <span className="font-semibold">Levenvale Farm</span>
        </div>
        <SignOut />
      </div>
      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Hi {greetingDisplay}</h1>
        </div>

        {/* Wallet - full width on mobile, left column on desktop */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <TokenBalance userId={userId} membershipId={session.user.membershipId ?? ''} />
          <div className="grid grid-cols-2 gap-4">
            <CardGoToPantry pantryLink="/members-v2/pantry" />
            <CardEvents />
            {/* Previous Orders - spans both columns */}
            <div className="col-span-2 aspect-[2/1]">
              <Suspense fallback={<PreviousOrdersSkeleton />}>
                <PreviousOrders userId={userId} membershipId={session.user.membershipId ?? ''} />
              </Suspense>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
