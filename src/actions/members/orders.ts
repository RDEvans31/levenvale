'use server';

import { LF_API_KEY, LF_API_URL } from '@/lib/little-farma/little-farma';
import { Order } from '@/types/members/order';
import { Result } from '@/types/result';

const ORG_ID = process.env.ORG_ID;

interface OrdersResponse {
  success: boolean;
  orders: Order[];
  membershipId: string;
  total: number;
}

export const getUserOrders = async (
  membershipId: string
): Promise<Result<OrdersResponse>> => {
  try {
    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return {
        success: false,
        error: 'API configuration missing',
      };
    }

    if (!membershipId) {
      return {
        success: false,
        error: 'Membership ID is required',
      };
    }

    const response = await fetch(`${LF_API_URL}/${ORG_ID}/${membershipId}/orders`, {
      headers: {
        Authorization: `Bearer ${LF_API_KEY}`,
      },
      next: { revalidate: 86400, tags: [`${membershipId}-orders`] },
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
}

export const getUserOrder = async (
  membershipId: string,
  orderId: string
): Promise<Result<SingleOrderResponse>> => {
  try {
    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return {
        success: false,
        error: 'API configuration missing',
      };
    }

    if (!membershipId || !orderId) {
      return {
        success: false,
        error: 'Membership ID and Order ID are required',
      };
    }

    const response = await fetch(
      `${LF_API_URL}/${ORG_ID}/${membershipId}/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${LF_API_KEY}`,
        },
        next: {
          revalidate: 86400,
          tags: [`${membershipId}-order-${orderId}`],
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
