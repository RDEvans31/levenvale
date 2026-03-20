interface OrderProduct {
  name: string;
  images: {
    url: string;
  }[];
}

export interface OrderVariation {
  id: string;
  productId: string;
  unitType: string;
  amount: number;
  value: number;
  stockQuantity: number;
  lowStockThreshold: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  variationId: string;
  productId: string;
  product: OrderProduct;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  variation: OrderVariation;
}

export interface Order {
  fees: any;
  id: string;
  membershipId: string;
  organisationId: string;
  email: string;
  currency: string;
  total: number;
  status: string;
  referenceId: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingState: string;
  shippingPostcode: string;
  shippingCountry: string;
  shippingPhone: string;
  note: string | null;
  orderType: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}
