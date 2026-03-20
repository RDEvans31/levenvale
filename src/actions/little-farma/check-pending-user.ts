'use server';

import {
  LF_API_KEY,
  LF_API_URL,
  ORG_ID,
} from '@/lib/little-farma/little-farma';
import { Result } from '@/types/result';

export interface PendingUserResponse {
  success: boolean;
  userId?: string;
  name?: string;
  email?: string;
  role?: string;
}

export const checkIfUserIsPending = async (
  userEmail: string
): Promise<Result<PendingUserResponse>> => {
  try {
    if (!LF_API_URL || !ORG_ID) {
      return {
        success: false,
        error: 'Little Farma API configuration is missing',
      };
    }

    if (!userEmail) {
      return {
        success: false,
        error: 'User email is required',
      };
    }

    const url = `${LF_API_URL}/${ORG_ID}/is-pending?email=${userEmail}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(LF_API_KEY && { Authorization: `Bearer ${LF_API_KEY}` }),
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Little Farma API error: ${response.status}`,
      };
    }

    const data: PendingUserResponse = await response.json();

    return {
      success: true,
      value: data,
    };
  } catch (error) {
    console.error('Error checking pending user status:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unexpected error occurred',
    };
  }
};
