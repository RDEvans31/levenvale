'use client';

import { useCartStore, useUserStore } from '@/store';
import { Check, Coins } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

interface OrderItem {
  id: string;
  variationId: string;
  productId: string;
  name: string;
  sku: string | null;
  price: number;
  quantity: number;
  amount: number | null;
  unitType: string | null;
}

interface Order {
  id: string;
  referenceId: string;
  status: string;
  total: number;
  currency: string;
  orderType: string;
  createdAt: string;
  items: OrderItem[];
  shipping: {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone: string;
  };
  note: string | null;
}

interface OrderData {
  order: Order;
  userBalance: number;
}

export default function ClientSuccess({ orderData }: { orderData: OrderData }) {
  const { items, clearCart } = useCartStore();
  const { clearUserStore } = useUserStore();

  useEffect(() => {
    if (items.length > 0) {
      clearCart();
    }
    clearUserStore();
  }, [clearCart, items, clearUserStore]);

  const { order, userBalance } = orderData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-700 flex flex-col items-center justify-center p-4 space-y-6">
      {/* Green checkmark icon */}
      <div className="bg-green-400 rounded-full p-4">
        <Check className="w-12 h-12" color="#fff" />
      </div>

      {/* Order card */}
      <div className="bg-white rounded-lg p-8 shadow-sm max-w-2xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-black">
            Order #{order.referenceId}
          </h1>
          <p className="text-lg text-gray-600 mt-2">Received 🎉</p>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">What your ordered:</h3>
          <div className="space-y-2">
            {order.items.map(item => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <div className="text-left">
                  <p className="font-medium">{item.name}</p>
                  {item.amount && item.unitType && (
                    <p className="text-sm text-gray-500">
                      {item.amount}
                      {item.unitType}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end text-sm text-gray-600">
                    <span className="mr-2">{item.quantity} x </span>
                    <span> {item.price} tokens</span>
                  </div>
                  <div className="flex items-center justify-end font-medium">
                    <Coins className="w-4 h-4 mr-1" />
                    <span>{(item.quantity * item.price).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center py-3 font-bold text-lg border-t-2 border-gray-200">
              <p>Total:</p>
              <div className="flex items-center">
                <Coins className="w-5 h-5 mr-1" />
                <span>{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="mb-6">
          {order.orderType === 'pickup' ? (
            <>
              <h3 className="text-lg font-semibold mb-3">
                We&apos;ll see you at the farm to pick up your order!
              </h3>
              <div className="text-left space-y-1 text-gray-700">
                <p>Levenvale Farm</p>
                <p>Knapp Road</p>
                <p>TA3 6FH</p>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-3">
                We&apos;ll send it to:
              </h3>
              <div className="text-left space-y-1 text-gray-700">
                <p>
                  {order.shipping.firstName} {order.shipping.lastName}
                </p>
                <p>{order.shipping.address1}</p>
                {order.shipping.address2 && <p>{order.shipping.address2}</p>}
                <p>
                  {order.shipping.city}, {order.shipping.state}{' '}
                </p>
                <p>{order.shipping.postcode}</p>
                <p>{order.shipping.country}</p>
                {order.shipping.phone && <p>Phone: {order.shipping.phone}</p>}
              </div>
            </>
          )}
        </div>

        {/* Order Note */}
        {order.note && (
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-2">The note you left:</h3>
            <p className="text-gray-600">{order.note}</p>
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg p-8 shadow-sm max-w-2xl w-full">
        {/* User Balance */}
        <h3 className="text-lg font-semibold mb-3">Token Balance</h3>
        <div className="flex space-x-2">
          <Coins className="w-6 h-6" />
          <p className="text-xl font-bold">
            {userBalance.toFixed(2)} tokens left
          </p>
        </div>

        {/* Order Note */}
        {order.note && (
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-2">The note you left:</h3>
            <p className="text-gray-600">{order.note}</p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col space-y-4 max-w-lg w-full">
        {/* <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors">
          Top up now for an extra 5%
        </button> */}

        {/* <Link
          href="/members"
          className="text-black font-medium text-lg hover:underline text-center py-2"
        >
          No thanks, back to Members Portal
        </Link> */}

        <Link
          href="/members-v2"
          className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors text-center"
        >
          Back to Members Portal
        </Link>
      </div>
    </div>
  );
}
