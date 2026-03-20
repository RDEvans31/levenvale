import { OrderDisplay } from '@/types/members/types';

export default function CardPreviousOrders({
  orders,
}: {
  orders: OrderDisplay[];
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col max-w-sm mx-auto border border-gray-100">
      <h2 className="text-xl font-bold mb-6">Your previous orders</h2>
      <div className="space-y-8">
        {orders?.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <div>
                <span className="block text-xs text-gray-400">Items</span>
                <span className="font-medium">{order.items.join(', ')}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Status</span>
                <span
                  className={`font-medium ${
                    order.status === 'completed'
                      ? 'text-green-600'
                      : order.status === 'processing'
                        ? 'text-yellow-500'
                        : 'text-gray-600'
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="mt-2 md:mt-0">
              <span className="block text-xs text-gray-400">Total</span>
              <span className="font-semibold">{order.total} tokens</span>
            </div>
            {/* <div className="mt-2 md:mt-0">
              <button className="px-8 py-3 flex gap-2 rounded-lg border border-gray-300 bg-white text-gray-900 font-semibold text-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition mb-2">
                Reorder{' '}
                <div className="my-auto">
                  <RefreshCcw size={15} />
                </div>
              </button>
            </div> */}
          </div>
        ))}
        {(!orders || orders.length === 0) && (
          <p className="text-gray-500 text-center py-4">
            No previous orders found
          </p>
        )}
      </div>
    </div>
  );
}
