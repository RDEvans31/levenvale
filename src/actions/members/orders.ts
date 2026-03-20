'use server';

import { LF_API_KEY, LF_API_URL } from '@/lib/little-farma/little-farma';
import { Order } from '@/types/members/order';
import { Result } from '@/types/result';

const ORG_ID = process.env.ORG_ID;

interface OrdersResponse {
  success: boolean;
  orders: Order[];
  membershipId: string;
  userId: string;
  total: number;
}

export const getUserOrders = async (
  userId: string
): Promise<Result<OrdersResponse>> => {
  try {
    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return {
        success: false,
        error: 'API configuration missing',
      };
    }

    if (!userId) {
      return {
        success: false,
        error: 'User ID is required',
      };
    }

    const response = await fetch(`${LF_API_URL}/${ORG_ID}/${userId}/orders`, {
      headers: {
        Authorization: `Bearer ${LF_API_KEY}`,
      },
      next: { revalidate: 86400, tags: [`${userId}-orders`] },
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch orders: ${response.status}`,
      };
    }

    const data: OrdersResponse = await response.json();

    if (!data.success) {
      return {
        success: false,
        error: 'API returned unsuccessful response',
      };
    }

    return {
      success: true,
      value: data,
    };
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unexpected error occurred',
    };
  }
};

interface SingleOrderResponse {
  success: boolean;
  order: Order;
  membershipId: string;
  userId: string;
}

export const getUserOrder = async (
  userId: string,
  orderId: string
): Promise<Result<SingleOrderResponse>> => {
  try {
    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return {
        success: false,
        error: 'API configuration missing',
      };
    }

    if (!userId || !orderId) {
      return {
        success: false,
        error: 'User ID and Order ID are required',
      };
    }

    const response = await fetch(
      `${LF_API_URL}/${ORG_ID}/${userId}/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${LF_API_KEY}`,
        },
        next: {
          revalidate: 86400,
          tags: [`${userId}-order-${orderId}`],
        },
      }
    );

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch order: ${response.status}`,
      };
    }

    const data: SingleOrderResponse = await response.json();

    if (!data.success) {
      return {
        success: false,
        error: 'API returned unsuccessful response',
      };
    }

    return {
      success: true,
      value: data,
    };
  } catch (error) {
    console.error('Error fetching user order:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unexpected error occurred',
    };
  }
};
