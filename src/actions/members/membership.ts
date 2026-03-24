'use server';

import {
  LF_API_KEY,
  LF_API_URL,
  ORG_ID,
} from '@/lib/little-farma/little-farma';
import { Result } from '@/types/result';

interface MembershipResponse {
  membershipId: string;
  userId: string;
  organisationId: string;
  email: string;
  role: string;
}

type MembershipValue = {
  membershipId: string;
  role: string;
};

export const getMembershipId = async (
  userId: string
): Promise<Result<MembershipValue>> => {
  try {
    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return {
        success: false,
        error: 'API configuration missing',
      };
    }

    if (!userId) {
      return {
        success: false,
        error: 'User ID is required',
      };
    }

    const response = await fetch(
      `${LF_API_URL}/${ORG_ID}/user/${userId}/membership`,
      {
        headers: {
          Authorization: `Bearer ${LF_API_KEY}`,
        },
        // cache: 'no-store',
        cache: 'force-cache',
        next: { tags: [`membershipId-${userId}`] },
      }
    );

    if (!response.ok) {
      const errorMsg = await response.text();
      return {
        success: false,
        error: `Failed to fetch membership ID: ${response.status} ${errorMsg}`,
      };
    }

    const data: MembershipResponse = await response.json();

    return {
      success: true,
      value: {
        membershipId: data.membershipId,
        role: data.role,
      },
    };
  } catch (error) {
    console.error('Error fetching membership ID:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unexpected error occurred',
    };
  }
};

export const getMembershipIdByEmail = async (
  email: string
): Promise<Result<MembershipValue & { userId: string }>> => {
  try {
    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return {
        success: false,
        error: 'API configuration missing',
      };
    }

    if (!email) {
      return {
        success: false,
        error: 'Email is required',
      };
    }

    const response = await fetch(
      `${LF_API_URL}/${ORG_ID}/members/by-email?email=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${LF_API_KEY}`,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const errorMsg = await response.text();
      return {
        success: false,
        error: `Failed to fetch membership ID: ${response.status} ${errorMsg}`,
      };
    }

    const data: MembershipResponse = await response.json();

    return {
      success: true,
      value: {
        membershipId: data.membershipId,
        userId: data.userId,
        role: data.role,
      },
    };
  } catch (error) {
    console.error('Error fetching membership ID by email:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unexpected error occurred',
    };
  }
};
