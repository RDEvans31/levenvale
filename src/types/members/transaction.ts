export interface TransactionItem {
  id: string;
  amount: number;
  cashAmount: number | null;
  type: 'credit' | 'debit';
  balanceAfter: number;
  description: string | null;
  referenceId: string | null;
  isSelfReported: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionResponse {
  success: boolean;
  transactions: TransactionItem[];
  membershipId: string;
  userId: string;
  total: number;
  hasMore: boolean;
}

export interface TransactionFilters {
  limit?: number;
  offset?: number;
  type?: 'all' | 'credit' | 'debit';
}
