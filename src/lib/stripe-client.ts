'use client';

import { loadStripe, Stripe } from '@stripe/stripe-js';

// Payments are direct charges on the farm's Stripe Connect account, so Stripe.js
// is loaded with the Little Farma platform publishable key plus that account ID.
const stripeCache = new Map<string, Promise<Stripe | null>>();

export function getStripe(stripeAccountId: string): Promise<Stripe | null> {
  if (!stripeCache.has(stripeAccountId)) {
    stripeCache.set(
      stripeAccountId,
      loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!, {
        stripeAccount: stripeAccountId,
      })
    );
  }
  return stripeCache.get(stripeAccountId)!;
}
