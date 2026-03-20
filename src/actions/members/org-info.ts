'use server';

import { LF_API_KEY, LF_API_URL, ORG_ID } from '@/lib/little-farma/little-farma';
import { Result } from '@/types/result';

interface OrgAddress {
  id: string;
  organisationId: string;
  addressLine1: string;
  postcode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrgInfo {
  id: string;
  name: string;
  handle: string;
  plan: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  logoUrl: string | null;
  tokensPerLocalCurrency: number;
  localCurrency: string;
  orderCounter: number;
  config: Record<string, unknown>;
  _count: {
    members: number;
  };
  address: OrgAddress | null;
}

export const getOrgInfo = async (): Promise<Result<OrgInfo>> => {
  try {
    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return {
        success: false,
        error: 'API configuration missing',
      };
    }

    const response = await fetch(`${LF_API_URL}/${ORG_ID}/info`, {
      headers: {
        Authorization: `Bearer ${LF_API_KEY}`,
      },
      next: { tags: ['orgInfo'] },
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      return {
        success: false,
        error: `Failed to fetch org info: ${response.status} ${errorMsg}`,
      };
    }

    const data: { organisation: OrgInfo } = await response.json();

    return {
      success: true,
      value: data.organisation,
    };
  } catch (error) {
    console.error('Error fetching org info:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unexpected error occurred',
    };
  }
};
