'use client';

import { refreshUserBalance } from '@/actions/members/balance';
import { checkCartStock } from '@/actions/pantry/stock-check';
import { createOrder } from '@/app/members-v2/pantry/checkout/actions';
import { OrderInfo } from '@/app/members-v2/pantry/checkout/types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { useCartStore, useUserStore } from '@/store';
import { OrderType } from '@/store/types';
import { ArrowLeft, Check, Coins, Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { PhoneNumberForm } from '../checkout/PhoneNumberForm';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default function CartPage({
  userId,
  name,
  email,
  shippingData,
  creditBalance,
}: {
  userId: string;
  name: string;
  email: string;
  creditBalance: number;
  shippingData?: {
    shippingAddresses: {
      id: string;
      firstName: string;
      lastName: string;
      address1: string;
      address2: string | null;
      city: string;
      state: string;
      postcode: string;
      country: string;
      email: string;
      phone: string | null;
    }[];
    phoneNumbers: {
      id: string;
      number: string;
      type: string;
      isDefault: boolean;
      isVerified: boolean;
    }[];
  };
}) {
  const router = useRouter();

  const {
    orderType,
    items,
    removeItem,
    updateQuantity,
    updateItemStock,
    getTotal,
    setOrderType,
  } = useCartStore();
  const { phone, deliveryInstructions, setDeliveryInstructions } =
    useUserStore();

  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stockChecking, setStockChecking] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const updateCollectionInstructions = (day?: string, timeSlot?: string) => {
    const currentDay = day || selectedDay;
    const currentTimeSlot = timeSlot || selectedTimeSlot;

    if (!currentDay) return;

    let collectionNote = `Collection on ${currentDay}`;
    if (currentTimeSlot) {
      collectionNote += ` (${currentTimeSlot})`;
    }

    // Update delivery instructions with collection day and time
    const currentInstructions = deliveryInstructions || '';
    const collectionPattern =
      /Collection on (Mon|Tues|Wed|Thurs)(?: \([^)]+\))?/;

    if (collectionPattern.test(currentInstructions)) {
      // Replace existing collection info
      setDeliveryInstructions(
        currentInstructions.replace(collectionPattern, collectionNote)
      );
    } else {
      // Add collection info
      setDeliveryInstructions(
        currentInstructions
          ? `${currentInstructions}. ${collectionNote}`
          : collectionNote
      );
    }
  };

  const handleDaySelection = (day: string) => {
    setSelectedDay(day);
    updateCollectionInstructions(day, selectedTimeSlot ?? undefined);
  };

  const handleTimeSlotSelection = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    updateCollectionInstructions(selectedDay ?? undefined, timeSlot);
  };

  // Calculate prices using useMemo to prevent unnecessary recalculations
  const prices = useMemo(() => {
    const subtotal = getTotal();
    const deliveryFee =
      orderType == OrderType.DELIVERY
        ? subtotal >= Number(200)
          ? 0
          : Number(19)
        : 0;
    const fees = subtotal * 0.02;
    const total = subtotal + deliveryFee + fees;
    return { subtotal, deliveryFee, fees, total };
  }, [getTotal, items, orderType]); // we need to include items because this needs to be recalculated if items changes

  // Calculate top-up amount for pickup orders
  const { hasEnoughCredit, topUpAmount } = useMemo(() => {
    const hasEnoughCredit = creditBalance >= prices.total;

    const calculateTokenTopUpAmount = (balance: number, orderTotal: number) => {
      const tokenAmount = (orderTotal - balance) * 1.1;
      const divisor = 10;
      const rounded = Math.ceil(tokenAmount / divisor);
      const tokenAmountRounded = Math.round(rounded * divisor);
      return tokenAmountRounded;
    };

    const topUpAmount = !hasEnoughCredit
      ? Math.ceil(calculateTokenTopUpAmount(creditBalance, prices.total) / 2)
      : 0;

    return { hasEnoughCredit, topUpAmount };
  }, [creditBalance, prices.total]);

  // Check if any items have quantity exceeding available stock
  const hasStockIssues = useMemo(() => {
    return items.some(item => {
      if (item.manageStock) {
        // Quantity-tracked items: check if quantity exceeds stock
        return item.currentStock !== null && item.quantity > item.currentStock;
      } else {
        // Status-tracked items: check if out of stock
        return item.stockStatus === 'outofstock';
      }
    });
  }, [items]);

  const proceedToDeliveryConfirmation = async () => {
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsLoading(true);
    setError(null);

    router.push(`/members-v2/pantry/checkout`);
  };

  const handleConfirmOrder = async () => {
    const userEmail = email;
    const userName = name;
    if (!userId || !userEmail || !userName) {
      router.push(`${baseUrl}/login`);
      return;
    }
    setIsLoading(true);
    try {
      const names = userName.split(' ');
      const firstName = names[0];
      const lastName = names[1] ?? undefined;

      const orderInfo: OrderInfo = {
        userOrderInfo: {
          shippingAddress: {
            firstName: firstName,
            lastName: lastName,
            address1: 'Levenvale Farm',
            city: 'Taunton',
            state: 'Somerset',
            postcode: 'TA3 6FH',
            country: 'GB',
          },
          phone,
          deliveryInstructions: deliveryInstructions,
        },
        items,
        orderType,
        ...prices,
      };
      const createOrderResult = await createOrder(
        orderInfo,
        userId,
        userEmail,
        userName
      );

      if (!createOrderResult.success) {
        console.error('Order creation failed:', createOrderResult.error);
        setIsLoading(false);
      } else {
        await refreshUserBalance(userId);
        router.replace(
          `/members-v2/pantry/checkout/${createOrderResult.value.orderId}/success`
        );
      }
    } catch (error) {
      console.error('Order creation error:', error);
      setIsLoading(false);
    }
  };

  // Check stock for all cart items and handle hydration mismatch
  useEffect(() => {
    const checkStock = async () => {
      if (items.length === 0) {
        setMounted(true);
        return;
      }

      setStockChecking(true);
      try {
        const result = await checkCartStock(items);

        if (result.success) {
          // Update stock for each item
          result.value.forEach(update => {
            updateItemStock(
              update.id,
              update.stock,
              update.stockStatus,
              update.manageStock
            );
          });
        } else {
          console.error('Stock check failed:', result.error);
          setError(result.error);
        }
      } catch (error) {
        console.error('Error checking stock:', error);
        setError('Failed to check stock availability');
      } finally {
        setStockChecking(false);
        setMounted(true);
      }
    };

    checkStock();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Show loading state before hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 bg-white border-b z-40">
          <div className="px-4 py-3">
            <h1 className="text-2xl font-bold">Levenvale Farm</h1>
          </div>
        </div>
        <div className="p-4 flex-col justify-center items-center text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">
            {stockChecking
              ? 'Checking stock availability...'
              : 'Loading your cart...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 bg-white border-b z-40">
          <div className="px-4 py-3">
            <h1 className="text-2xl font-bold">Levenvale Farm</h1>
          </div>
        </div>
        <div className="p-4 flex justify-center items-center">
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg w-full max-w-md">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Preparing your order!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between p-4">
        <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white transition-colors">
          <Link href="/members-v2/pantry" className="text-black">
            <ArrowLeft size={24} />
          </Link>
        </button>
        <div className="py-auto">
          <h2 className="text-2xl font-bold">Levenvale Farm</h2>
        </div>
      </div>
      <div className="p-4 pb-40">
        {/* Order Type Selection */}
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setOrderType(OrderType.DELIVERY)}
              className={`relative p-4 rounded-lg border-2 transition-all h-28 ${
                orderType === OrderType.DELIVERY
                  ? 'border-forest bg-white'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between h-full">
                <div className="text-left flex flex-col justify-center h-full">
                  <div>
                    <h3 className="font-semibold text-gray-900">Delivery</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Delivered Tue-Fri
                    </p>
                  </div>
                  {prices.subtotal >= 200 ? (
                    <p className="font-semibold text-lg text-green-600 mt-2">
                      Free
                    </p>
                  ) : (
                    <div className="mt-2">
                      <p className="text-xs text-gray-400">
                        Free for orders above 200
                      </p>
                      <p className="font-semibold text-lg">19 tokens</p>
                    </div>
                  )}
                </div>
                {orderType === OrderType.DELIVERY && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center text-white bg-forest justify-center">
                    <Check size={16} />
                  </div>
                )}
              </div>
            </button>
            <button
              onClick={() => setOrderType(OrderType.PICKUP)}
              className={`relative p-4 rounded-lg border-2 transition-all h-28 ${
                orderType === OrderType.PICKUP
                  ? 'border-forest bg-white'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between h-full">
                <div className="text-left flex flex-col justify-center h-full">
                  <div>
                    <h3 className="font-semibold text-gray-900">Pick-up</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Mon-Thursday 10am-2pm
                    </p>
                  </div>
                  <p className="font-semibold text-lg mt-2">Free</p>
                </div>
                {orderType === OrderType.PICKUP && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center text-white bg-forest justify-center">
                    <Check size={16} />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        {orderType === OrderType.PICKUP && (
          <>
            <div className="bg-white p-4 mb-4 rounded-lg">
              <PhoneNumberForm
                existingPhoneNumbers={shippingData?.phoneNumbers}
              />
            </div>

            {/* Collection Day Selection */}
            <div className="bg-white p-4 mb-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900">
                  Select a collection day
                </h3>
                <span className="text-sm text-green-600">10am to 2pm</span>
              </div>
              <div className="flex gap-3 overflow-x-auto">
                {['Mon', 'Tues', 'Wed', 'Thurs'].map(day => (
                  <button
                    key={day}
                    onClick={() => handleDaySelection(day)}
                    className={`flex-shrink-0 px-6 py-3 rounded-lg border transition-all ${
                      selectedDay === day
                        ? 'bg-forest text-white border-forest'
                        : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-sm font-medium">{day}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="bg-white p-4 mb-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900">
                  Select a time slot
                </h3>
              </div>
              <div className="flex gap-3 overflow-x-auto">
                {['10am-12pm', '1pm-2pm'].map(timeSlot => (
                  <button
                    key={timeSlot}
                    onClick={() => handleTimeSlotSelection(timeSlot)}
                    className={`flex-shrink-0 px-6 py-3 rounded-lg border transition-all ${
                      selectedTimeSlot === timeSlot
                        ? 'bg-forest text-white border-forest'
                        : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-sm font-medium">{timeSlot}</div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Cart Items */}

        <div className="space-y-4 mb-8">
          {items.map(item => (
            <div
              key={item.id}
              className={`flex items-center gap-4 bg-white p-4 rounded-lg ${
                (item.manageStock &&
                  item.currentStock !== null &&
                  item.quantity > item.currentStock) ||
                (!item.manageStock && item.stockStatus === 'outofstock')
                  ? 'border-2 border-red-200 bg-red-50'
                  : ''
              }`}
            >
              <div className="w-20 h-20 relative">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <h2 className="text-sm text-gray-500">
                  {item.amount}
                  {item.unitType}
                </h2>

                {/* Stock Indicator */}
                <div className="mt-1">
                  {item.manageStock ? (
                    // Quantity-based stock tracking
                    item.currentStock === null ? (
                      <span className="text-gray-500 text-sm">
                        Stock checking...
                      </span>
                    ) : item.currentStock === 0 ? (
                      <span className="text-red-600 text-sm font-medium">
                        Out of Stock
                      </span>
                    ) : item.currentStock <= 5 ? (
                      <span className="text-orange-600 text-sm">
                        Only {item.currentStock} left
                      </span>
                    ) : (
                      <span className="text-green-600 text-sm">
                        {item.currentStock} in stock
                      </span>
                    )
                  ) : (
                    <span className="text-green-600 text-sm">In Stock</span>
                  )}
                </div>

                {/* Quantity vs Stock Warning */}
                {((item.manageStock &&
                  item.currentStock !== null &&
                  item.quantity > item.currentStock) ||
                  (!item.manageStock && item.stockStatus === 'outofstock')) && (
                  <div className="mt-1">
                    <span className="text-red-600 text-sm bg-red-50 px-2 py-1 rounded">
                      {item.manageStock
                        ? `You have ${item.quantity} in cart but only ${item.currentStock} available`
                        : 'This item is currently out of stock'}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-1">
                  <Coins size={24} />
                  <span className="font-bold">{item.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    disabled={
                      item.currentStock != null && item.manageStock
                        ? item.currentStock <= item.quantity
                        : false
                    }
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={`p-1 rounded-full ${
                      item.currentStock != null &&
                      item.manageStock &&
                      item.currentStock <= item.quantity
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'hover:bg-gray-200'
                    }`}
                    title={
                      item.currentStock != null &&
                      item.manageStock &&
                      item.currentStock <= item.quantity
                        ? item.currentStock === 0
                          ? 'Out of stock'
                          : `Only ${item.currentStock} available`
                        : 'Add one more'
                    }
                  >
                    {!(item.currentStock != null && item.manageStock
                      ? item.currentStock <= item.quantity
                      : false) && <Plus size={16} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <>
            {/* Price Breakdown */}
            <div className="bg-white rounded-lg p-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <div className="text-right">
                  <span>{prices.subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery fee</span>
                <span className="text-gray-600">
                  {prices.deliveryFee.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Processing Fee</span>
                <span className="text-gray-600">{prices.fees.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <div className="text-right">
                  {/* <span className="text-gray-500 line-through text-sm mr-2">{(prices.total * 1.1).toFixed(2)}</span> */}
                  <span>{prices.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {mounted && items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 space-y-4">
          {hasStockIssues && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm font-medium">
                Please adjust quantities before proceeding - some items exceed
                available stock
              </p>
            </div>
          )}
          {orderType === OrderType.DELIVERY && (
            <button
              onClick={proceedToDeliveryConfirmation}
              disabled={hasStockIssues}
              className={`w-full block py-4 rounded-lg font-medium text-center ${
                hasStockIssues
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {hasStockIssues
                ? 'Adjust quantities to continue'
                : 'Go to confirmation'}
            </button>
          )}
          {orderType === OrderType.PICKUP && (
            <>
              {!hasEnoughCredit ? (
                <>
                  <Link
                    href={`/members-v2/${userId}/credits?amount=${topUpAmount}&returnUrl=${encodeURIComponent('/members-v2/pantry/cart')}`}
                    className="w-full block bg-black text-white py-4 rounded-lg font-medium text-center mb-2"
                  >
                    Add tokens
                  </Link>
                  <button
                    disabled
                    className="w-full block py-4 rounded-lg font-medium text-center bg-gray-300 text-gray-500 cursor-not-allowed"
                  >
                    Confirm order 🎉
                  </button>
                </>
              ) : (
                <button
                  onClick={handleConfirmOrder}
                  disabled={hasStockIssues || !selectedDay || !selectedTimeSlot}
                  className={`w-full block py-4 rounded-lg font-medium text-center ${
                    hasStockIssues || !deliveryInstructions
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {hasStockIssues
                    ? 'Adjust quantities to continue'
                    : !selectedDay
                      ? 'Select a collection day to continue'
                      : !selectedTimeSlot
                        ? 'Select a time slot to continue'
                        : 'Confirm order 🎉'}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
