import { WooCommerceOrderResponse } from './woocommerce-order-response';

export interface WooCommerceAddressRequestPayload {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface WooCommerceBillingAddressRequestPayload
  extends WooCommerceAddressRequestPayload {
  email: string;
}

export interface WooCommerceShippingLineRequestPayload {
  method_id: string;
  method_title: string;
  total: string;
}

export interface WooCommerceFeeLineRequestPayload {
  id?: number;
  name: string;
  tax_class?: string;
  tax_status?: string;
  amount: string;
  total: string;
  total_tax?: string;
  taxes?: Array<{
    id: number;
    total: string;
    subtotal: string;
  }>;
  meta_data?: Array<{
    id: number;
    key: string;
    value: string;
  }>;
}

interface WooCommerceLineItemRequestPayload {
  product_id: number | string;
  variation_id?: number;
  quantity: number;
  price?: number;
}

export interface WooCommerceOrderRequestPayload {
  id?: number;
  order_key?: string;
  payment_method: string;
  created_via?: string;
  payment_method_title: string;
  currency?: string;
  total?: string;
  status?: string;
  set_paid: boolean;
  customer_note: string;
  billing: WooCommerceBillingAddressRequestPayload;
  shipping: WooCommerceAddressRequestPayload;
  line_items: WooCommerceLineItemRequestPayload[];
  shipping_lines: WooCommerceShippingLineRequestPayload[];
  fee_lines: WooCommerceFeeLineRequestPayload[];
}

export type WooCommerceOrderUpdateRequestPayload =
  Partial<WooCommerceOrderResponse>;
