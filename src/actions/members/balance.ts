'use server';

import { LF_API_KEY, LF_API_URL } from '@/lib/little-farma/little-farma';
import { Result } from '@/types/result';
import { revalidateTag } from 'next/cache';

const ORG_ID = process.env.ORG_ID;

interface BonusResponse {
  success: boolean;
  eligible: boolean;
  bonusPercentage: number;
  membershipId: string;
  userId: string;
}

interface BalanceResponse {
  success: boolean;
  balance: number;
  membershipId: string;
  userId: string;
  loyaltyBonus: boolean;
  canSelfTopUp?: boolean;
}

export const getUserTokenBalance = async (
  userId: string
): Promise<
  Result<{ balance: number; loyaltyBonus: boolean; canSelfTopUp: boolean }>
> => {
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
      `${LF_API_URL}/${ORG_ID}/${userId}/credits/balance`,
      {
        headers: {
          Authorization: `Bearer ${LF_API_KEY}`,
        },
        next: { tags: [`${ORG_ID}-${userId}-balance`] },
      }
    );

    if (!response.ok) {
      const errorMsg = await response.text();
      return {
        success: false,
        error: `Failed to fetch balance: ${response.status} ${errorMsg}`,
      };
    }

    const data: BalanceResponse = await response.json();

    if (!data.success) {
      return {
        success: false,
        error: 'API returned unsuccessful response',
      };
    }

    return {
      success: true,
      value: {
        balance: data.balance,
        loyaltyBonus: data.loyaltyBonus,
        canSelfTopUp: data.canSelfTopUp ?? false,
      },
    };
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unexpected error occurred',
    };
  }
};

export const getUserBonusEligibility = async (
  userId: string
): Promise<Result<{ eligible: boolean; bonusPercentage: number }>> => {
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
      `${LF_API_URL}/${ORG_ID}/${userId}/credits/bonus`,
      {
        headers: {
          Authorization: `Bearer ${LF_API_KEY}`,
        },
        next: { revalidate: 600 }, // 10 minutes cache
      }
    );

    if (!response.ok) {
      const errorMsg = await response.text();
      return {
        success: false,
        error: `Failed to fetch bonus eligibility: ${response.status} ${errorMsg}`,
      };
    }

    const data: BonusResponse = await response.json();

    if (!data.success) {
      return {
        success: false,
        error: 'API returned unsuccessful response',
      };
    }

    return {
      success: true,
      value: { eligible: data.eligible, bonusPercentage: data.bonusPercentage },
    };
  } catch (error) {
    console.error('Error fetching bonus eligibility:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unexpected error occurred',
    };
  }
};

export const refreshUserBalance = async (userId: string) => {
  revalidateTag(`${ORG_ID}-${userId}-balance`);
};

interface AddCreditDto {
  amount: number;
  referenceId: string;
  description: string;
  cashAmount?: number;
}

interface AddCreditResponse {
  success: boolean;
  transactionId: string;
  newBalance: number;
  membershipId: string;
  isExisting: boolean;
}

export const addUserTokens = async (
  userId: string,
  creditData: AddCreditDto
): Promise<Result<AddCreditResponse>> => {
  try {
    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return {
        success: false,
        error: 'API configuration missing',
      };
    }

    if (!creditData.amount || !creditData.referenceId) {
      return {
        success: false,
        error: 'Required credit data missing',
      };
    }

    const response = await fetch(
      `${LF_API_URL}/${ORG_ID}/${userId}/credits/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LF_API_KEY}`,
        },
        body: JSON.stringify(creditData),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return {
        success: false,
        error: `API call failed: ${response.status} ${text}`,
      };
    }

    const apiResult: AddCreditResponse = await response.json();

    if (!apiResult.success) {
      return {
        success: false,
        error: 'API returned success: false',
      };
    }

    return {
      success: true,
      value: apiResult,
    };
  } catch (error) {
    console.error('Error adding user tokens:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unexpected error occurred',
    };
  }
};

interface TransferCreditDto {
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

export const transferUserTokens = async (
  fromUserId: string,
  transferData: TransferCreditDto
): Promise<Result<TransferCreditResponse>> => {
  try {
    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return {
        success: false,
        error: 'API configuration missing',
      };
    }

    if (!fromUserId || !transferData.toUserId || !transferData.total) {
      return {
        success: false,
        error: 'Required transfer data missing',
      };
    }

    if (transferData.total <= 0) {
      return {
        success: false,
        error: 'Transfer amount must be greater than 0',
      };
    }

    const response = await fetch(
      `${LF_API_URL}/${ORG_ID}/${fromUserId}/credits/transfer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LF_API_KEY}`,
        },
        body: JSON.stringify(transferData),
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
