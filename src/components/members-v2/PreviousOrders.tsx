import { getUserOrders } from '@/actions/members';
import OrderCard from './OrderCard';

interface PreviousOrdersProps {
  userId: string;
}

export default async function PreviousOrders({ userId }: PreviousOrdersProps) {
  // Fetch previous orders from the new API
  const ordersResponse = await getUserOrders(userId);
  const recentOrders = ordersResponse.success
    ? ordersResponse.value.orders.slice(0, 3)
    : [];

  return (
    <div className="col-span-1 md:col-span-2">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Previous Orders</h2>
      {recentOrders.length > 0 ? (
        <div className="space-y-4">
          {recentOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              orderNumber={order.referenceId}
              userId={userId}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-600">No previous orders found.</p>
        </div>
      )}
    </div>
  );
}
