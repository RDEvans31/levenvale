'use server';

import {
  LF_API_KEY,
  LF_API_URL,
  ORG_ID,
} from '@/lib/little-farma/little-farma';
import { Result } from '@/types/result';

export type Subscription = {
  id: string;
  organisationId: string;
  stripeProductId: string;
  stripePriceId: string;
  lookupKey: string;
  name: string;
  description: string;
  features: string[];
  backgroundColor: string;
  accentColor: string;
  textColor: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function getSubscriptions(): Promise<Result<Subscription[]>> {
  try {
    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return { success: false, error: 'Missing API configuration' };
    }

    const res = await fetch(`${LF_API_URL}/${ORG_ID}/subscriptions`, {
      headers: {
        Authorization: `Bearer ${LF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return {
        success: false,
        error: `Failed to fetch subscriptions: ${res.status}`,
      };
    }

    const data = await res.json();
    return { success: true, value: data.subscriptions };
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return { success: false, error: 'Unexpected error fetching subscriptions' };
  }
}
