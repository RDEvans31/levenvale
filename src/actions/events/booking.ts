'use server';

import { getMembershipId } from '@/actions/members/membership';
import { auth } from '@/lib/auth';
import {
  LF_API_KEY,
  LF_API_URL,
  ORG_ID,
} from '@/lib/little-farma/little-farma';
import { Result } from '@/types/result';
import { revalidateEvent } from './events';

export interface BookEventRequest {
  eventId: string;
  purchases: {
    eventProductId: string;
    quantity: number;
    additionalInfo?: string[];
  }[];
}

export interface BookingResponse {
  id: string;
  eventId: string;
  membershipId: string;
  totalCost: number;
  newBalance: number;
  purchases: { eventProductId: string; quantity: number }[];
  event: {
    title: string;
    description: string | null;
    startsAt: string;
    endsAt: string;
    address: {
      addressLine1: string;
      addressLine2: string | null;
      city: string;
      postcode: string;
      country: string;
    } | null;
    mapLink: string | null;
  };
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

interface ApiBookingResponse {
  success: boolean;
  booking: BookingResponse;
}

export async function bookEvent(
  request: BookEventRequest
): Promise<Result<BookingResponse>> {
  try {
    // Validate user session server-side
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return {
        success: false,
        error: 'You must be logged in to book an event',
      };
    }

    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return {
        success: false,
        error: 'API configuration missing',
      };
    }

    // Get membership ID for the user
    const membershipResult = await getMembershipId(userId);
    if (!membershipResult.success) {
      return {
        success: false,
        error: `Failed to get membership: ${membershipResult.error}`,
      };
    }

    const membershipId = membershipResult.value.membershipId;

    // Make booking request to Little Farma API
    const response = await fetch(
      `${LF_API_URL}/events/${request.eventId}/booking`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${LF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          membershipId,
          purchases: request.purchases,
        }),
      }
    );

    if (!response.ok) {
      const errorData: ApiErrorResponse = await response
        .json()
        .catch(() => ({}));
      const errorMessage =
        errorData.error || errorData.message || 'Unknown error';

      switch (response.status) {
        case 400:
          return {
            success: false,
            error: `Invalid booking request: ${errorMessage}`,
          };
        case 401:
          return {
            success: false,
            error: 'Not authorized to book this event',
          };
        case 402:
          return {
            success: false,
            error: 'Insufficient tokens to complete this booking',
          };
        case 404:
          return {
            success: false,
            error: 'Event not found',
          };
        case 409:
          return {
            success: false,
            error: 'You have already booked this event',
          };
        default:
          console.error(
            `Booking failed with status ${response.status}:`,
            errorMessage
          );
          return {
            success: false,
            error: 'Failed to complete booking. Please try again.',
          };
      }
    }

    const apiResponse: ApiBookingResponse = await response.json();

    // Invalidate event cache so booking count updates
    await revalidateEvent(request.eventId);

    return {
      success: true,
      value: apiResponse.booking,
    };
  } catch (error) {
    console.error('Error booking event:', error);

    await revalidateEvent(request.eventId);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unexpected error occurred',
    };
  }
}
