import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OrderType, type CartStore } from './types';

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      orderType: OrderType.DELIVERY,
      setOrderType: (type: OrderType) => set({ orderType: type }),
      orderId: undefined,
      setOrderId: (id: number | undefined) => set({ orderId: id }),
      items: [],
      addItem: item =>
        set(state => {
          const existing = state.items.find(i => i.id === item.id);

          if (!existing) {
            return { items: [...state.items, { ...item, quantity: 1 }] };
          }
          if (
            existing &&
            existing.currentStock &&
            existing.currentStock > existing.quantity
          ) {
            return {
              items: state.items.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          if (existing && !existing.manageStock) {
            return {
              items: state.items.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }

          return { items: state.items };
        }),
      removeItem: id =>
        set(state => ({
          items: state.items.filter(item => item.id !== id),
        })),
      updateQuantity: (id: number | string, quantity: number) =>
        set(state => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      updateItemStock: (
        id: number | string,
        stock: number | null,
        stockStatus?: 'instock' | 'outofstock' | 'onbackorder',
        manageStock?: boolean
      ) =>
        set(state => ({
          items: state.items.map(item =>
            item.id === id
              ? {
                  ...item,
                  currentStock: stock,
                  ...(stockStatus !== undefined && { stockStatus }),
                  ...(manageStock !== undefined && { manageStock }),
                }
              : item
          ),
        })),
      clearCart: () => set({ items: [], orderId: undefined }),
      getTotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
