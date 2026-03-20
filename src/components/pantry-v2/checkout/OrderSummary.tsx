'use client';

import { useCartStore } from '@/store';
import { OrderType } from '@/store/types';
import { Coins } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { ButtonConfirmOrder } from './ButtonConfirmOrder';

export function OrderSummary({
  userId,
  creditBalance,
}: {
  userId: string;
  creditBalance: number;
}) {
  const { items, getTotal, orderType } = useCartStore();
  const prices = useMemo(() => {
    const subtotal = getTotal();
    const deliveryFee =
      orderType === OrderType.DELIVERY ? (subtotal >= 200 ? 0 : 19) : 0;
    const fees = Math.ceil(subtotal * 0.02);
    const total = subtotal + deliveryFee + fees;
    return { subtotal, deliveryFee, fees, total };
  }, [getTotal, orderType]);

  const hasEnoughCredit = creditBalance >= prices.total;

  const calculateTopUpAmount = (balance: number, orderTotal: number) => {
    const currencyAmount = ((orderTotal - balance) * 1.1) / 2;
    const divisor = 10;
    const rounded = Math.ceil(currencyAmount / divisor);
    const currencyAmountRounded = Math.round(rounded * divisor);
    return currencyAmountRounded;
  };

  const topUpAmount = !hasEnoughCredit
    ? calculateTopUpAmount(creditBalance ?? 0, prices.total)
    : 0;

  const returnUrl = `/members-v2/pantry/checkout/`;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            href="/members-v2/pantry"
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Order Summary Content */}
      <div className="p-4 space-y-6 lg:p-0 pb-32 lg:pb-4">
        <div className="bg-white rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                <Image
                  src="/levenvale-logo.png"
                  alt="Levenvale Farm"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">Levenvale Farm</h3>
                <p className="text-gray-500">{items.length} items</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center gap-2">
                <Coins size={24} className="mr-2" />
                <span className="font-bold">{creditBalance}</span>
              </div>
            </div>
          </div>

          {/* Cart Items Summary */}
          <div className="space-y-2 pt-4 border-t">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.name} × {item.quantity}
                </span>
                <span>{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <div className="flex">
                <span>{prices.subtotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery fee</span>
              <span>{prices.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Processing Fee</span>
              <span>{prices.fees.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <div className="flex">
                <Coins size={24} className="mr-2" />
                <span>{prices.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:block">
          {hasEnoughCredit ? (
            <ButtonConfirmOrder />
          ) : (
            <>
              <Link
                href={`/members-v2/${userId}/credits?amount=${topUpAmount}&returnUrl=${returnUrl}`}
                className="w-full block bg-black text-white py-4 rounded-lg font-medium text-center mb-2"
              >
                Add tokens
              </Link>
              <div className="w-full block bg-gray-200 text-gray-600 py-4 rounded-lg font-medium text-center">
                Confirm
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 safe-area-pb lg:hidden">
        {hasEnoughCredit ? (
          <ButtonConfirmOrder />
        ) : (
          <>
            <Link
              href={`/members-v2/${userId}/credits?amount=${topUpAmount}&returnUrl=${returnUrl}`}
              className="w-full block bg-black text-white py-4 rounded-lg font-medium text-center mb-2"
            >
              Add tokens
            </Link>
            <div className="w-full block bg-gray-200 text-gray-600 py-4 rounded-lg font-medium text-center">
              Confirm
            </div>
          </>
        )}
      </div>
    </>
  );
}
