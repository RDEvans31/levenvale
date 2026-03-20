import { getEventCategories } from '@/actions/events';
import { getUserTokenBalance } from '@/actions/members/balance';
import { CategoryDisplay } from '@/components/events/CategoryDisplay';
import { CategoryDisplaySkeleton } from '@/components/events/skeletons/CategoryDisplaySkeleton';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { auth } from '@/lib/auth';
import { ArrowLeft, CalendarCheck, Wallet } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function EventsPage() {
  const session = await auth();

  const userId = session?.user.id;

  if (!userId) {
    return (
      <ErrorDisplay errorMsg="We couldn't find you in our database. Please contact Rob @ +447482400662 on WhatsApp" />
    );
  }

  const creditBalanceResponse = await getUserTokenBalance(userId);

  if (!creditBalanceResponse.success) {
    return (
      <ErrorDisplay
        errorMsg={`Error fetching: ${creditBalanceResponse.error}`}
      />
    );
  }

  const { balance: creditBalance } = creditBalanceResponse.value;
  const categoriesResult = await getEventCategories();
  if (!categoriesResult.success) {
    return (
      <ErrorDisplay
        errorMsg={`Error fetching event categories: ${categoriesResult.error}`}
      />
    );
  }

  const eventCategories = categoriesResult.value;

  return (
    <div className="relative min-h-screen bg-[#F5F5F5]">
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50 mx-4">
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors">
          <Link href="/members-v2" className="text-black flex">
            <ArrowLeft size={24} />{' '}
            <span className="hidden sm:inline">Back to Dashboard</span>
          </Link>
        </button>

        <div className="bg-black text-white py-4 px-6 rounded-full shadow-lg flex items-center justify-between hover:bg-gray-800 transition-colors ml-auto">
          <div className="flex items-center gap-2">
            <Wallet size={24} />
            <span className="font-bold">{creditBalance}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="relative h-48 md:h-64 lg:h-80 bg-green-800 w-full">
          <div className="absolute inset-0">
            <Image
              src="/home/levenvale-hero-mobile.jpg"
              alt="Levenvale Farm"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
              <Image
                src="/levenvale-logo.png"
                alt="Levenvale Farm Logo"
                width={96}
                height={96}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="px-2">
          <div className="pt-16 px-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-black">Events</h1>
            </div>
            <div className="flex justify-center mt-3">
              <Link
                href="/members-v2/events/bookings"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:underline"
              >
                <CalendarCheck size={16} />
                Your Bookings
              </Link>
            </div>
          </div>

          <div className="mt-8 px-4 pb-20">
            {eventCategories.length === 0 ? (
              <div className="bg-white rounded-lg p-6 text-center">
                <p className="text-gray-600">
                  No event categories available at this time.
                </p>
              </div>
            ) : (
              eventCategories.map(category => (
                <Suspense
                  key={category.id}
                  fallback={<CategoryDisplaySkeleton />}
                >
                  <CategoryDisplay category={category} />
                </Suspense>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
