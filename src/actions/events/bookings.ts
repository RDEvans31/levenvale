'use server';

import { getMembershipId } from '@/actions/members/membership';
import {
  LF_API_KEY,
  LF_API_URL,
  ORG_ID,
} from '@/lib/little-farma/little-farma';
import { UserBookingsResponse } from '@/types/events/booking';
import { Result } from '@/types/result';

export async function getUserBookings(
  userId: string,
  limit?: number,
  offset?: number
): Promise<Result<UserBookingsResponse>> {
  try {
    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return { success: false, error: 'API configuration missing' };
    }

    if (!userId) {
      return { success: false, error: 'User ID is required' };
    }

    const membershipResult = await getMembershipId(userId);
    if (!membershipResult.success) {
      return {
        success: false,
        error: `Failed to get membership: ${membershipResult.error}`,
      };
    }

    const membershipId = membershipResult.value.membershipId;

    const params = new URLSearchParams();
    if (limit !== undefined) params.set('limit', String(limit));
    if (offset !== undefined) params.set('offset', String(offset));
    const query = params.toString() ? `?${params.toString()}` : '';

    const response = await fetch(
      `${LF_API_URL}/${ORG_ID}/v2/${membershipId}/bookings${query}`,
      {
        headers: {
          Authorization: `Bearer ${LF_API_KEY}`,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch bookings:', response.status);
      return { success: false, error: 'Failed to fetch bookings' };
    }

    const data: UserBookingsResponse = await response.json();
    return { success: true, value: data };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return {
      success: false,
      error: 'Unexpected error fetching bookings',
    };
  }
}
