import CardSubscription from '@/components/CardSubscriptions';
import { auth } from '@/lib/auth';
import { UserRole } from '@/lib/roles';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function NotSubscribedPage() {
  const session = await auth();

  const sessionRole: UserRole = session?.user.role as UserRole;
  if (!sessionRole) {
    redirect('/login');
  }

  // Check if user is pending member
  if (!session?.user.id || !session?.user?.email) {
    redirect('/login');
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Top navbar */}
      <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-forest rounded-md flex items-center justify-center">
            <Image
              src="/levenvale-logo.png"
              alt="Levenvale Farm"
              width={32}
              height={32}
            />
          </div>
          <span className="font-semibold">Levenvale Farm</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm">
              {session?.user?.name?.charAt(0) || 'U'}
            </span>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Hello {session?.user?.email || 'Member'}
        </h1>
        <p className="text-gray-600">
          It looks like you&apos;re not a member yet!
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CardSubscription />
        <div className="flex justify-center mt-4">
          <Link
            href="/onboarding/not-subscribed/co-owner-onboarding"
            className="inline-block border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            You&apos;re a co-owner?
          </Link>
        </div>
      </div>
    </div>
  );
}
