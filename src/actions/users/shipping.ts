'use server';

import {
  LF_API_KEY,
  LF_API_URL,
  ORG_ID,
} from '@/lib/little-farma/little-farma';
import { Result } from '@/types/result';

export interface ApiShippingAddress {
  id: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string | null;
}

export interface ApiPhoneNumber {
  id: string;
  number: string;
  type: string;
  isDefault: boolean;
  isVerified: boolean;
}

interface UserShippingResponse {
  shippingAddresses: ApiShippingAddress[];
  phoneNumbers: ApiPhoneNumber[];
}

export async function fetchUserShippingData(
  userId: string
): Promise<Result<UserShippingResponse>> {
  if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
    console.error('Little Farma API configuration missing');
    return {
      success: false,
      error: `LF_API_URL: ${LF_API_URL}, LF_API_KEY: ${LF_API_KEY}, ORG_ID: ${ORG_ID} `,
    };
  }

  try {
    const response = await fetch(`${LF_API_URL}/${ORG_ID}/user/${userId}/shipping`, {
      headers: {
        Authorization: `Bearer ${LF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { tags: [`${userId}-shippingData`] },
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch user shipping data: ${response.status}`,
      };
    }

    const data = await response.json();
    return { success: true, value: data };
  } catch (error) {
    console.error('Error fetching user shipping data:', error);
    return {
      success: false,
      error: 'Failed to fetch user shipping data due to network error',
    };
  }
}
