import 'server-only';

import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

export function formatAmountForStripe(amount: number) {
  return Math.round(amount * 100);
}
