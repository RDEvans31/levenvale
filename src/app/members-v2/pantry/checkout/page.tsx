import { getUserTokenBalance } from '@/actions/members/balance';
import { SignOut } from '@/components/navbar/ButtonSignOut';
import { OrderSummary } from '@/components/pantry-v2/checkout/OrderSummary';
import { UserDetails } from '@/components/pantry-v2/checkout/UserDetails';
import { auth } from '@/lib/auth';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function CheckoutPage() {
  const session = await auth();
  const userId = session?.user.id;
  const userEmail = session?.user.email;
  if (!userId || !userEmail) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg max-w-md">
            No user in session!
            <p className="text-gray-600">
              There&apos;s been an error with your order/account. Please message
              me on Whatsapp by clicking my number below. Send me a screenshot
              of this page and I&apos;ll work with you to sort it out.{' '}
              <a
                href="https://wa.me/447482400662"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                +447482400662
              </a>
            </p>
          </div>
          <SignOut />
        </div>
      </>
    );
  }

  const creditBalanceResult = await getUserTokenBalance(userId);

  if (!creditBalanceResult.success) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg max-w-md">
            No token balance found: {creditBalanceResult.error}
            <p className="text-gray-600">
              There&apos;s been an error with your order/account. Please message
              me on Whatsapp by clicking my number below. Send me a screenshot
              of this page and I&apos;ll work with you to sort it out.{' '}
              <a
                href="https://wa.me/447482400662"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                +447482400662
              </a>
            </p>
          </div>
        </div>
      </>
    );
  }

  const { balance: creditBalance } = creditBalanceResult.value;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-40">
        <div className="px-4 py-3 flex items-center">
          <Link href="/members-v2/pantry/cart" className="text-black">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-semibold flex-1 text-center">Confirm</h1>
        </div>
      </div>

      {/* Desktop: Two-column layout, Mobile: Single column */}
      <div className="lg:flex lg:gap-8 lg:p-8">
        {/* User Details Column */}
        <div className="lg:flex-1 p-4 lg:p-0 space-y-6">
          <div className="bg-white rounded-lg overflow-hidden">
            <UserDetails userId={userId} />
          </div>
        </div>

        {/* Order Summary Column - Desktop only */}
        <div className="hidden lg:block lg:w-96">
          <div className="sticky top-24">
            <OrderSummary userId={userId} creditBalance={creditBalance} />
          </div>
        </div>
      </div>

      {/* Mobile Order Summary - Mobile only */}
      <div className="lg:hidden">
        <OrderSummary userId={userId} creditBalance={creditBalance} />
      </div>
    </div>
  );
}
