'use server';

import { Result } from '@/types/result';
import { revalidateTag } from 'next/cache';
import { CreateOrderDto, CreateOrderResponse, OrderInfo } from './types';

const LF_API_URL = process.env.LF_API_URL;
const LF_API_KEY = process.env.LF_API_KEY;

const createOrderPayload = (
  orderInfo: OrderInfo,
  userId: string,
  userEmail: string,
  userName?: string
): CreateOrderDto => {
  // Transform cart items to order items
  const orderItems = orderInfo.items.map(item => ({
    variationId: item.id.toString(),
    productId: item.parentId?.toString() || item.id.toString(),
    name: item.name,
    sku: '', // Could be added to CartItem type later if needed
    price: item.price, // Convert to tokens for storage
    quantity: item.quantity,
  }));

  // Create fees array
  const fees = [
    {
      feeName: 'Processing Fee',
      amount: orderInfo.fees,
    },
  ];

  // Add delivery fee if applicable
  if (orderInfo.deliveryFee > 0) {
    fees.push({
      feeName: 'Delivery Fee',
      amount: orderInfo.deliveryFee,
    });
  }

  const isPickup = orderInfo.orderType === 'pickup';
  const phone = orderInfo.userOrderInfo.phone || '';

  // For pickup orders, use default Levenvale Farm address and user's name
  if (isPickup) {
    const firstName = userName?.split(' ')[0] || 'Customer';
    const lastName = userName?.split(' ').slice(1).join(' ') || '';

    return {
      userId,
      email: userEmail,
      currency: 'tokens',
      total: orderInfo.total,
      shippingFirstName: firstName,
      shippingLastName: lastName,
      shippingAddress1: 'Levenvale Farm',
      shippingAddress2: '',
      shippingCity: 'Taunton',
      shippingState: 'Somerset',
      shippingPostcode: 'TA3 6FH',
      shippingCountry: 'GB',
      shippingPhone: phone,
      orderType: orderInfo.orderType,
      note: orderInfo.userOrderInfo.deliveryInstructions,
      fees,
      orderItems,
    };
  }

  // For delivery orders, use provided shipping address
  const shippingAddress = orderInfo.userOrderInfo.shippingAddress;

  return {
    userId,
    email: userEmail,
    currency: 'tokens',
    total: orderInfo.total,
    shippingFirstName: shippingAddress?.firstName || '',
    shippingLastName: shippingAddress?.lastName || '',
    shippingAddress1: shippingAddress?.address1 || '',
    shippingAddress2: shippingAddress?.address2 || '',
    shippingCity: shippingAddress?.city || '',
    shippingState: shippingAddress?.state || '',
    shippingPostcode: shippingAddress?.postcode || '',
    shippingCountry: shippingAddress?.country || 'GB',
    shippingPhone: phone,
    orderType: orderInfo.orderType,
    note: orderInfo.userOrderInfo.deliveryInstructions,
    fees,
    orderItems,
  };
};

export const createOrder = async (
  orderInfo: OrderInfo,
  userId: string,
  membershipId: string,
  userEmail: string,
  userName?: string
): Promise<Result<CreateOrderResponse>> => {
  try {
    // Get authenticated user
    // const session = await auth();
    // if (!session?.user?.id) {
    //   return { success: false, error: 'User not authenticated' };
    // }

    // // Get user details
    // const userResult = await getUserById(session.user.id, ['shippingAddresses']);
    // if (!userResult.success) {
    //   return { success: false, error: 'Failed to get user details' };
    // }

    // const user = userResult.value;

    // // Check if user has enough credit
    // if (user.creditBalance < convertCashToToken(orderInfo.total)) {
    //   return {
    //     success: false,
    //     error: 'Insufficient credit balance. Please top up your account.'
    //   };
    // }

    // // Create order payload
    // For now using dummy values since auth is commented out
    const orderPayload = createOrderPayload(
      orderInfo,
      userId,
      userEmail,
      userName
    );

    const response = await fetch(`${LF_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LF_API_KEY}`,
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.log(errorData);
      return {
        success: false,
        error: 'Failed to create order on Little Farma',
      };
    }

    const orderResponse: CreateOrderResponse = await response.json();
    revalidateTag(`${membershipId}-orders`);
    revalidateTag(`${userId}-shippingData`);
    return {
      success: true,
      value: orderResponse,
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while creating the order',
    };
  }
};
