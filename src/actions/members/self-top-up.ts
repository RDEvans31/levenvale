'use server';

import { LF_API_KEY, LF_API_URL } from '@/lib/little-farma/little-farma';
import { Result } from '@/types/result';
import { revalidateTag } from 'next/cache';

const ORG_ID = process.env.ORG_ID;

export const submitSelfTopUp = async (
  orgId: string,
  membershipId: string,
  amount: number,
  description: string
): Promise<Result<{ transactionId: string; newBalance: number }>> => {
  try {
    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return {
        success: false,
        error: 'API configuration missing',
      };
    }

    if (!membershipId) {
      return {
        success: false,
        error: 'Membership ID is required',
      };
    }

    if (amount <= 0) {
      return {
        success: false,
        error: 'Amount must be greater than 0',
      };
    }

    const referenceId = `self_topup_${Date.now()}_${membershipId}`;

    const response = await fetch(
      `${LF_API_URL}/${orgId}/${membershipId}/credits/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LF_API_KEY}`,
        },
        body: JSON.stringify({
          amount,
          referenceId,
          description: description || 'Cash deposit - honesty box',
          isSelfTopUp: true,
        }),
      }
    );

    if (response.status === 403) {
      return {
        success: false,
        error: 'Self top-up not enabled',
      };
    }

    if (response.status === 400) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        error: errorData?.error || 'Invalid request',
      };
    }

    if (!response.ok) {
      const text = await response.text();
      return {
        success: false,
        error: `Failed to submit top-up: ${response.status} ${text}`,
      };
    }

    const apiResult = await response.json();

    if (!apiResult.success) {
      return {
        success: false,
        error: 'API returned unsuccessful response',
      };
    }

    revalidateTag(`${ORG_ID}-${membershipId}-balance`);

    return {
      success: true,
      value: {
        transactionId: apiResult.transactionId,
        newBalance: apiResult.newBalance,
      },
    };
  } catch (error) {
    console.error('Error submitting self top-up:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unexpected error occurred',
    };
  }
};
