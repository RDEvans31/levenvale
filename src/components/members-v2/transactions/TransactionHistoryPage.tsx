'use client';

import { TransactionItem } from '@/types/members/transaction';
import { ArrowDown, ArrowLeft, ArrowUp, Clock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface TransactionHistoryPageProps {
  user: { id?: string; name?: string | null; email?: string | null };
  currentBalance: number;
  transactions: TransactionItem[];
}

const TransactionHistoryPage: React.FC<TransactionHistoryPageProps> = ({
  user,
  currentBalance,
  transactions,
}) => {
  const getTransactionTypeDisplay = (type: 'credit' | 'debit') => {
    if (type === 'credit') {
      return {
        label: 'Credit',
        color: 'text-green-600',
        icon: <ArrowUp className="w-4 h-4" />,
        prefix: '+',
      };
    } else {
      return {
        label: 'Debit',
        color: 'text-red-600',
        icon: <ArrowDown className="w-4 h-4" />,
        prefix: '-',
      };
    }
  };

  const getDescription = (transaction: TransactionItem) => {
    if (transaction.description) {
      return transaction.description;
    }

    if (transaction.referenceId) {
      if (transaction.type === 'debit') {
        return `Order payment (${transaction.referenceId})`;
      } else {
        return `Payment received (${transaction.referenceId})`;
      }
    }

    return transaction.type === 'credit' ? 'Credit added' : 'Debit';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                {user.name || user.email}
              </h1>
              <p className="text-sm text-gray-600 mt-1 truncate">
                Transaction History
              </p>
            </div>
          </div>
        </div>

        {/* Current Balance Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-sm">
          <div className="text-sm text-blue-600 font-medium">
            Current Balance
          </div>
          <div className="text-xl md:text-2xl font-bold text-blue-900 mt-1">
            {currentBalance.toFixed(2)} tokens
          </div>
        </div>
      </div>

      {/* Transactions Table/Cards */}
      <div className="p-4 md:p-6">
        {transactions && transactions.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cash Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Balance After
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map(transaction => {
                    const typeDisplay = getTransactionTypeDisplay(
                      transaction.type
                    );
                    return (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(
                              transaction.createdAt
                            ).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(
                              transaction.createdAt
                            ).toLocaleTimeString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`flex items-center gap-1 text-sm font-medium ${typeDisplay.color}`}
                          >
                            {typeDisplay.icon}
                            {typeDisplay.label}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {getDescription(transaction)}
                          </div>
                          {transaction.referenceId && (
                            <div className="text-xs text-gray-500 mt-1">
                              Ref: {transaction.referenceId}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm font-medium ${typeDisplay.color}`}
                          >
                            {typeDisplay.prefix}
                            {Math.abs(transaction.amount).toFixed(2)} tokens
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {transaction.cashAmount
                              ? `£${transaction.cashAmount.toFixed(2)}`
                              : '—'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {transaction.balanceAfter.toFixed(2)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {transactions.map(transaction => {
                const typeDisplay = getTransactionTypeDisplay(transaction.type);
                return (
                  <div
                    key={transaction.id}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex items-center gap-1 text-sm font-medium ${typeDisplay.color}`}
                        >
                          {typeDisplay.icon}
                          {typeDisplay.label}
                        </div>
                        <div
                          className={`text-sm font-medium ${typeDisplay.color}`}
                        >
                          {typeDisplay.prefix}
                          {Math.abs(transaction.amount).toFixed(2)} tokens
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(transaction.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-900 mb-2">
                      {getDescription(transaction)}
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="space-y-1">
                        {transaction.cashAmount && (
                          <div className="text-gray-600">
                            Cash: £{transaction.cashAmount.toFixed(2)}
                          </div>
                        )}
                        {transaction.referenceId && (
                          <div className="text-xs text-gray-500">
                            Ref: {transaction.referenceId}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">
                          Balance after
                        </div>
                        <div className="font-medium text-gray-900">
                          {transaction.balanceAfter.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <Clock className="w-24 h-24" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No transactions found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              You haven&apos;t made any transactions yet.
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      {transactions.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-700">
            Showing {transactions.length} transaction
            {transactions.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href={`/members-v2/${user.id}`}
          className="bg-forest hover:bg-forestDark text-white p-4 rounded-full font-medium transition-colors shadow-lg flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Home</span>
        </Link>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
