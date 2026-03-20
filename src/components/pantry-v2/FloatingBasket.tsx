'use client';

import { useCartStore } from '@/store';
import { Coins, ShoppingBasket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FloatingBasket() {
  const { items, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || items.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50">
      <button
        className="w-full bg-black text-white py-4 px-6 rounded-full shadow-lg flex items-center justify-between hover:bg-gray-800 transition-colors"
        onClick={() => router.push('/members-v2/pantry/cart')}
      >
        <div className="flex items-center gap-2">
          <ShoppingBasket size={24} />
          <span>
            View Basket • {items.length}{' '}
            {items.length === 1 ? 'item' : 'items'}{' '}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Coins size={24} />
          <span className="font-bold">{getTotal().toFixed(2)}</span>
        </div>
      </button>
    </div>
  );
}
