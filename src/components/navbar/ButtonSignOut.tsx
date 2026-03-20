'use client';

import { handleSignOut } from '@/lib/actions';
import { useCartStore, useUserStore } from '@/store';
import { LogOut } from 'lucide-react';

export function SignOut({ className }: { className?: string }) {
  const { clearCart } = useCartStore();
  const { clearUserStore } = useUserStore();
  const handleSignOutAction = async () => {
    clearCart();
    clearUserStore();
    await handleSignOut();
  };
  return (
    <form action={handleSignOutAction}>
      <button
        type="submit"
        className={`${className} hover:text-green-900 hover:underline font-medium transition duration-150 flex items-center gap-2`}
      >
        Sign Out
        <LogOut className="h-4 w-4" />
      </button>
    </form>
  );
}
