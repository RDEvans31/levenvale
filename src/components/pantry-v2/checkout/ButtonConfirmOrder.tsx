'use client';

import { refreshUserBalance } from '@/actions/members/balance';
import { useCartStore, useUserStore } from '@/store';
import { OrderType } from '@/store/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { createOrder } from '../../../app/members-v2/pantry/checkout/actions';
import { OrderInfo } from '../../../app/members-v2/pantry/checkout/types';

export function ButtonConfirmOrder() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const userEmail = session?.user.email;
  const userName = session?.user.name;
  const router = useRouter();

  const { items, getTotal, orderType } = useCartStore();
  const userOrderInfo = useUserStore();

  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('Confirming your order...');

  // Calculate prices using cart store data
  const prices = useMemo(() => {
    const subtotal = getTotal();
    const deliveryFee =
      orderType === OrderType.DELIVERY ? (subtotal >= 200 ? 0 : 19) : 0;
    const fees = subtotal * 0.02;
    const total = subtotal + deliveryFee + fees;
    return { subtotal, deliveryFee, fees, total };
  }, [getTotal, orderType]);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    const loadingMessages = [
      'Confirming your order...',
      'Herding the cattle...',
      'Processing your tokens...',
      'Almost there...',
      'Please wait...',
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex++;

      if (currentIndex < loadingMessages.length) {
        setText(loadingMessages[currentIndex]);
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLoading]);

  const hasShippingAddress = !!userOrderInfo.shippingAddress;
  const hasPhone = !!userOrderInfo.phone;
  const hasDeliveryInstructions = !!userOrderInfo.deliveryInstructions;

  const isPickup = orderType === OrderType.PICKUP;

  const handleConfirmOrder = async () => {
    if (
      (!isPickup && !userOrderInfo.shippingAddress) ||
      !userOrderInfo.phone ||
      !userOrderInfo.deliveryInstructions ||
      !userId ||
      !userEmail
    ) {
      return;
    }
    setIsLoading(true);
    try {
      const orderInfo: OrderInfo = {
        userOrderInfo,
        items,
        orderType,
        ...prices,
      };
      const createOrderResult = await createOrder(
        orderInfo,
        userId,
        userEmail,
        userName || undefined
      );

      if (!createOrderResult.success) {
        console.error('Order creation failed:', createOrderResult.error);
        setIsLoading(false);
      } else {
        await refreshUserBalance(userId);
        router.replace(
          `/members-v2/pantry/checkout/${createOrderResult.value.orderId}/success`
        );
        // Don't set loading to false on success - keep loading until navigation
      }
    } catch (error) {
      console.error('Order creation error:', error);
      setIsLoading(false);
    }
  };

  if (
    (!isPickup && !hasShippingAddress) ||
    !hasPhone ||
    !hasDeliveryInstructions
  ) {
    return (
      <button
        disabled
        className="w-full block bg-gray-400 text-gray-600 py-4 rounded-lg font-medium text-center cursor-not-allowed"
      >
        {isPickup
          ? !hasPhone && !hasDeliveryInstructions
            ? 'Phone number + pickup instructions required'
            : !hasPhone
              ? 'Phone number required'
              : 'Pickup instructions required'
          : !hasShippingAddress && !hasPhone && !hasDeliveryInstructions
            ? 'Shipping address, phone number + delivery note required'
            : !hasShippingAddress && !hasPhone
              ? 'Shipping address + phone number required'
              : !hasShippingAddress && !hasDeliveryInstructions
                ? 'Shipping address + delivery note required'
                : !hasPhone && !hasDeliveryInstructions
                  ? 'Phone number + delivery note required'
                  : !hasShippingAddress
                    ? 'Shipping address required'
                    : !hasPhone
                      ? 'Phone number required'
                      : 'Delivery instructions required'}
      </button>
    );
  }

  return (
    <button
      onClick={handleConfirmOrder}
      disabled={isLoading}
      className="w-full block bg-black text-white py-4 rounded-lg font-medium text-center"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="mr-2">{text}</div>
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        'Confirm Order'
      )}
    </button>
  );
}
