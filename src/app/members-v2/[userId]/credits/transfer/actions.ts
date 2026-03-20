'use server';

import { LF_API_KEY, LF_API_URL } from '@/lib/little-farma/little-farma';
import { Result } from '@/types/result';

const ORG_ID = process.env.ORG_ID;

export interface TransferDto {
  fromUserId: string;
  toUserId: string;
  total: number;
  description?: string;
}

interface TransferCreditResponse {
  message: string;
  debitTransactionId: string;
  creditTransactionId: string;
  senderNewBalance: number;
  receiverNewBalance: number;
}

export const transferTokens = async (
  transfer: TransferDto
): Promise<Result<TransferCreditResponse>> => {
  try {
    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return {
        success: false,
        error: 'API configuration missing',
      };
    }

    if (!transfer.fromUserId || !transfer.toUserId || !transfer.total) {
      return {
        success: false,
        error: 'Required transfer data missing',
      };
    }

    if (transfer.total <= 0) {
      return {
        success: false,
        error: 'Transfer amount must be greater than 0',
      };
    }

    const requestBody = {
      toUserId: transfer.toUserId,
      total: transfer.total,
      description: transfer.description,
    };

    const response = await fetch(
      `${LF_API_URL}/${ORG_ID}/${transfer.fromUserId}/credits/transfer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LF_API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return {
        success: false,
        error: `Transfer failed: ${response.status} ${text}`,
      };
    }

    const apiResult: TransferCreditResponse = await response.json();

    return {
      success: true,
      value: apiResult,
    };
  } catch (error) {
    console.error('Error transferring tokens:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unexpected error occurred',
    };
  }
};
