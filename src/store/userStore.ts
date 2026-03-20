import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserStore, UserAddress, BillingAddress } from './types';

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      shippingAddress: undefined,
      billingAddress: undefined,
      phone: undefined,
      deliveryInstructions: undefined,
      setPhoneNumber: (number: string | undefined) => set({ phone: number }),
      setDeliveryInstructions: (instructions: string | undefined) =>
        set({ deliveryInstructions: instructions }),
      setShippingAddress: (address: UserAddress | undefined) =>
        set({ shippingAddress: address }),
      setBillingAddress: (address: BillingAddress | undefined) =>
        set({ billingAddress: address }),
      clearUserStore: () =>
        set({
          shippingAddress: undefined,
          billingAddress: undefined,
          phone: undefined,
          deliveryInstructions: undefined,
        }),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;
