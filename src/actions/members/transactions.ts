'use server';

import { LF_API_KEY, LF_API_URL } from '@/lib/little-farma/little-farma';
import { TransactionResponse } from '@/types/members/transaction';
import { Result } from '@/types/result';

const ORG_ID = process.env.ORG_ID;

export const getUserTransactions = async (
  userId: string
): Promise<Result<TransactionResponse>> => {
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

    const url = `${LF_API_URL}/${ORG_ID}/${userId}/credits/transactions`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${LF_API_KEY}`,
      },
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      return {
        success: false,
        error: `Failed to fetch transactions: ${response.status} ${errorMsg}`,
      };
    }

    const data: TransactionResponse = await response.json();

    if (!data.success) {
      return {
        success: false,
        error: 'API returned unsuccessful response',
      };
    }

    return {
      success: true,
      value: data,
    };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unexpected error occurred',
    };
  }
};
