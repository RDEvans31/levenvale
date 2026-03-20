'use client';

import { useCartStore } from '@/store';
import { OrderType } from '@/store/types';

export default function OrderOptions() {
  const { orderType, setOrderType } = useCartStore();

  return (
    <div className="flex gap-4 mt-6 px-4">
      <button
        onClick={() => setOrderType(OrderType.DELIVERY)}
        className={`flex-1 py-2 px-6 rounded-full transition-colors ${
          orderType === OrderType.DELIVERY
            ? 'bg-black text-white'
            : 'bg-gray-200'
        }`}
      >
        Delivery
      </button>
      <button
        onClick={() => setOrderType(OrderType.PICKUP)}
        className={`flex-1 py-2 px-6 rounded-full transition-colors ${
          orderType === OrderType.PICKUP ? 'bg-black text-white' : 'bg-gray-200'
        }`}
      >
        Pick-up
      </button>
    </div>
  );
}
