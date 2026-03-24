'use client';

import { loadStripe, Stripe } from '@stripe/stripe-js';

const stripePromiseCache = new Map<string, Promise<Stripe | null>>();

export const getStripe = (stripeAccountId?: string) => {
  const cacheKey = stripeAccountId || '__default__';

  if (!stripePromiseCache.has(cacheKey)) {
    stripePromiseCache.set(
      cacheKey,
      loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
        stripeAccountId ? { stripeAccount: stripeAccountId } : undefined
      )
    );
  }

  return stripePromiseCache.get(cacheKey)!;
};
