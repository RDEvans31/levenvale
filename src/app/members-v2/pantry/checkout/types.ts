import {
  BillingAddress,
  CartItem,
  OrderType,
  UserAddress,
} from '@/store/types';

interface OrderItemDto {
  variationId: string;
  productId: string;
  name: string;
  sku?: string;
  price: number; // in tokens
  quantity: number;
}

export interface CreateOrderDto {
  userId: string;
  email: string;
  currency: string;
  total: number;
  referenceId?: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingState: string;
  shippingPostcode: string;
  shippingCountry: string;
  shippingPhone: string;
  orderType: string;
  note?: string;
  fees: {
    feeName: string;
    amount: number;
  }[];
  orderItems: OrderItemDto[];
}

export interface OrderInfo {
  userOrderInfo: {
    shippingAddress?: UserAddress;
    billingAddress?: BillingAddress;
    phone?: string;
    deliveryInstructions?: string;
  };
  items: CartItem[];
  orderType: OrderType;
  subtotal: number;
  deliveryFee: number;
  fees: number;
  total: number;
}

export interface CreateOrderResponse {
  orderId: string;
  referenceId: string;
  status: string;
  total: number;
  currency: string;
}
