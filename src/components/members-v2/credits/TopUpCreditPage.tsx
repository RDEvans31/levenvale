'use client';

import { useOrg } from '@/context/OrgContext';
import convertCashToToken from '@/lib/helper/convertCashToToken';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { CreditsPaymentForm } from './PaymentForm';

export default function TopUpCreditPage({
  userId,
  membershipId,
  creditBalance,
  amount,
  returnUrl,
  loyaltyBonus,
  bonusPercentage,
}: {
  userId: string;
  membershipId: string;
  creditBalance: number;
  amount?: number;
  returnUrl?: string;
  loyaltyBonus: boolean;
  bonusPercentage?: number;
}) {
  const [currencyAmount, setAmount] = useState<number>(amount ?? 0);
  const { tokensPerLocalCurrency, localCurrency } = useOrg();

  const currencySymbol = localCurrency === 'GBP' ? '£' : '$';

  // Calculate tokens including bonus
  const baseTokens = convertCashToToken(currencyAmount, tokensPerLocalCurrency);
  const bonusTokens =
    loyaltyBonus && bonusPercentage ? baseTokens * (bonusPercentage / 100) : 0;
  const tokensToAdd = baseTokens + bonusTokens;

  return (
    <div className="mx-auto max-w-sm px-10">
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-lg">
          {loyaltyBonus && (
            <div className="bg-yellow-300 border border-yellow-600 mt-8 text-yellow-600 rounded-lg p-2 text-center font-semibold text-sm">
              <div className="p-4 flex flex-col items-center">
                <Star className="text-yellow-600 mb-2" />
                <p className="text-lg">Congratulations!</p>
                <p className="font-semibold text-sm mb-2">You get 10% more</p>
                <p className="text-xs">
                  (As a thank you for being <br /> one of our most loyal
                  members)
                </p>
              </div>
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
                  <p className="text-left text-sm text-gray-500">
                    You have {creditBalance} Tokens.
                  </p>
                  {currencyAmount && (
                    <div className="text-right">
                      <p className="text-sm text-yellow-700">
                        +{baseTokens.toFixed(2)} Tokens
                      </p>
                      {bonusTokens > 0 && (
                        <p className="text-sm text-yellow-600">
                          +{bonusTokens.toFixed(2)} Bonus Tokens
                        </p>
                      )}
                      <p className="text-sm text-neutral-500">
                        You&apos;ll have{' '}
                        {(creditBalance + tokensToAdd).toFixed(2)} Tokens
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {!loyaltyBonus && (
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
                  <div className="text-right">
                    <p className="text-sm text-green-500">
                      +{baseTokens.toFixed(2)} Tokens
                    </p>
                    {bonusTokens > 0 && (
                      <p className="text-sm text-yellow-600">
                        +{bonusTokens.toFixed(2)} Bonus Tokens
                      </p>
                    )}
                    <p className="text-sm text-blue-500">
                      You&apos;ll have{' '}
                      {(creditBalance + tokensToAdd).toFixed(2)} Tokens
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {currencyAmount > 0 && (
          <div className="w-full">
            <CreditsPaymentForm
              userId={userId}
              membershipId={membershipId}
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
