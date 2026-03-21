import { getUserOrders } from '@/actions/members';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import OrderCard from './OrderCard';

interface PreviousOrdersProps {
  userId: string;
  membershipId: string;
}

export default async function PreviousOrders({ userId, membershipId }: PreviousOrdersProps) {
  const ordersResponse = await getUserOrders(membershipId);
  const orders = ordersResponse.success ? ordersResponse.value.orders : [];
  const latestOrder = orders[0] ?? null;
  const orderCount = orders.length;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-bold text-gray-900">
          Previous Orders{orderCount > 1 && ` (${orderCount})`}
        </h2>
        <Link
          href={`/members-v2/${userId}/orders`}
          className="flex items-center justify-center px-2 bg-forest bg-opacity-10 rounded-full hover:bg-opacity-20 transition-colors"
        >
          See more <ArrowRight size={16} className="text-forest" />
        </Link>
      </div>
      {latestOrder ? (
        <OrderCard
          order={latestOrder}
          orderNumber={latestOrder.referenceId}
          userId={userId}
        />
      ) : (
        <p className="text-gray-500 text-sm">No previous orders found.</p>
      )}
    </div>
  );
}
