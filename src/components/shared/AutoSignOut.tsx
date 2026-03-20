'use client';
import { handleSignOut } from '@/lib/actions';
import { useCartStore, useUserStore } from '@/store';
import { useEffect } from 'react';

export default function AutoSignOut({ redirect }: { redirect: string }) {
  const { clearCart } = useCartStore();
  const { clearUserStore } = useUserStore();
  useEffect(() => {
    clearCart();
    clearUserStore();
    (async () => {
      await handleSignOut(redirect);
    })();
  }, [redirect, clearCart, clearUserStore]);

  return null;
}
