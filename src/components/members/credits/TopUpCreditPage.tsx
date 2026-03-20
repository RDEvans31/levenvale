'use client';

import { useOrg } from '@/context/OrgContext';
import convertCashToToken from '@/lib/helper/convertCashToToken';
import { useState } from 'react';
import { CreditsPaymentForm } from './PaymentForm';

export default function TopUpCreditPage({
  userId,
  creditBalance,
  amount,
  returnUrl,
}: {
  userId: string;
  creditBalance: number;
  amount?: number;
  returnUrl?: string;
}) {
  const [currencyAmount, setAmount] = useState<number>(amount ?? 0);
  const { tokensPerLocalCurrency, localCurrency } = useOrg();
  const currencySymbol = localCurrency === 'GBP' ? '£' : '$';

  return (
    <div className="mx-auto max-w-sm px-10">
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-lg">
          <div className="rounded-xl mx-auto py-10 w-full">
            <div className="flex items-center bg-gray-100 rounded-lg py-4 focus-within:ring-2 focus-within:ring-black focus-within:ring-inset w-full">
              <span className="text-base text-black mx-2">{currencySymbol}</span>
              <input
                id="price"
                name="price"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={currencyAmount === 0 ? '' : currencyAmount}
                onChange={e => {
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value)) {
                    setAmount(value === '' ? 0 : Number(value));
                  }
                }}
                className={`w-1/2 max-w-sm bg-gray-100 border-none outline-none text-2xl font-medium ${
                  currencyAmount > 0 ? 'text-black' : 'text-gray-400'
                } placeholder:text-gray-300 focus:ring-0 p-0`}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                You have {creditBalance} Tokens.
              </p>
              {currencyAmount && (
                <p className="text-sm text-green-500">
                  +{convertCashToToken(currencyAmount, tokensPerLocalCurrency)} Tokens.
                </p>
              )}
            </div>
          </div>
        </div>
        {currencyAmount > 0 && (
          <div className="w-full">
            <CreditsPaymentForm
              userId={userId}
              total={currencyAmount}
              returnUrl={returnUrl}
            />
            <div className="flex flex-col text-center items-center justify-between mt-8 mb-8">
              <p className="text-xs text-gray-500">
                *Please note: Tokens cannot be exchanged back to cash because
                that would compromise the &apos;private&apos; nature of the
                token system.
              </p>
              <p className="text-xs text-center text-gray-500 mt-2">
                Should you need a refund for any reason, we&apos;re happy to
                give you one in the form of more tokens that you can use in our
                ecosystem :)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
