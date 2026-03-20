export enum OrderType {
  DELIVERY = 'delivery',
  PICKUP = 'pickup',
}

export interface CartItem {
  id: number | string;
  parentId?: number | string;
  name: string;
  price: number;
  quantity: number;
  amount?: number;
  unitType?: string;
  image?: string;
  originalPrice?: number;
  currentStock: number | null;
  stockStatus: 'instock' | 'outofstock' | 'onbackorder';
  manageStock: boolean;
}

export interface CartStore {
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  orderId: number | undefined;
  setOrderId: (id: number | undefined) => void;
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  updateItemStock: (
    id: number | string,
    stock: number | null,
    stockStatus?: 'instock' | 'outofstock' | 'onbackorder',
    manageStock?: boolean
  ) => void;
  clearCart: () => void;
  getTotal: () => number;
}

interface Address {
  firstName: string;
  lastName?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone?: string;
}

export interface UserAddress extends Address {
  email?: string;
}

export interface BillingAddress extends Address {
  email: string;
}

export interface UserStore {
  shippingAddress: UserAddress | undefined;
  billingAddress: BillingAddress | undefined;
  phone: string | undefined;
  deliveryInstructions: string | undefined;
  setShippingAddress: (address?: UserAddress) => void;
  setBillingAddress: (address?: BillingAddress) => void;
  setPhoneNumber: (phone: string | undefined) => void;
  setDeliveryInstructions: (instructions: string | undefined) => void;
  clearUserStore: () => void;
}
