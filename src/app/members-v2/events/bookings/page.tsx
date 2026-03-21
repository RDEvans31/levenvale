import { getUserBookings } from '@/actions/events';
import { getUserTokenBalance } from '@/actions/members/balance';
import BookingCard from '@/components/events/BookingCard';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { auth } from '@/lib/auth';
import { ArrowLeft, CalendarCheck, Wallet } from 'lucide-react';
import Link from 'next/link';

export default async function BookingsPage() {
  const session = await auth();
  const userId = session?.user.id;
  const membershipId = session?.user.membershipId;

  if (!userId || !membershipId) {
    return (
      <ErrorDisplay errorMsg="We couldn't find you in our database. Please contact Rob @ +447482400662 on WhatsApp" />
    );
  }

  const [creditBalanceResponse, bookingsResult] = await Promise.all([
    getUserTokenBalance(membershipId),
    getUserBookings(userId),
  ]);

  if (!creditBalanceResponse.success) {
    return (
      <ErrorDisplay
        errorMsg={`Error fetching balance: ${creditBalanceResponse.error}`}
      />
    );
  }

  if (!bookingsResult.success) {
    return (
      <ErrorDisplay
        errorMsg={`Error fetching bookings: ${bookingsResult.error}`}
      />
    );
  }

  const { balance: creditBalance } = creditBalanceResponse.value;
  const { bookings } = bookingsResult.value;

  return (
    <div className="relative min-h-screen bg-[#F5F5F5]">
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50 mx-4">
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors">
          <Link href="/members-v2/events" className="text-black flex">
            <ArrowLeft size={24} />{' '}
            <span className="hidden sm:inline">Back to Events</span>
          </Link>
        </button>

        <div className="bg-black text-white py-4 px-6 rounded-full shadow-lg flex items-center justify-between hover:bg-gray-800 transition-colors ml-auto">
          <div className="flex items-center gap-2">
            <Wallet size={24} />
            <span className="font-bold">{creditBalance}</span>
          </div>
        </div>
      </div>

      <div className="pt-24 px-4 pb-20">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-black">Your Bookings</h1>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <CalendarCheck size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 mb-4">No bookings yet</p>
            <Link
              href="/members-v2/events"
              className="text-forest font-medium hover:underline"
            >
              Browse events
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
