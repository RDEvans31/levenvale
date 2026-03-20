'use client';

import { submitSelfTopUp } from '@/actions/members/self-top-up';
import { useOrg } from '@/context/OrgContext';
import convertCashToToken from '@/lib/helper/convertCashToToken';
import { CheckCircle, Coins } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function SelfTopUpPage({
  userId,
  orgId,
  creditBalance,
}: {
  userId: string;
  orgId: string;
  creditBalance: number;
}) {
  const [currencyAmount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');
  const [newBalance, setNewBalance] = useState<number>(0);
  const { tokensPerLocalCurrency, localCurrency } = useOrg();

  const currencySymbol = localCurrency === 'GBP' ? '£' : '$';
  const tokensToAdd = convertCashToToken(
    currencyAmount,
    tokensPerLocalCurrency
  );

  const handleTopUp = async () => {
    if (currencyAmount <= 0) return;

    setStatus('submitting');
    setError('');

    const result = await submitSelfTopUp(
      orgId,
      userId,
      currencyAmount,
      description
    );

    if (result.success) {
      setNewBalance(result.value.newBalance);
      setStatus('success');
    } else {
      setError(result.error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-emerald-700 px-4 py-8 flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tokens Added!
          </h1>

          <p className="text-gray-700 text-lg mb-4">
            You added {tokensToAdd} tokens to your balance.
          </p>

          <p className="text-xl font-semibold text-gray-900 mb-8">
            Your new balance: {newBalance.toFixed(2)} tokens
          </p>

          <p className="text-sm text-gray-700 leading-relaxed max-w-sm">
            Thank you for using the honesty box!
          </p>
        </div>

        <div className="max-w-md mx-auto w-full space-y-3">
          <Link
            href="/members-v2/pantry"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 rounded-lg text-center transition-colors block"
          >
            Go to Pantry
          </Link>

          <Link
            href={`/members-v2/${userId}`}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 rounded-lg text-center transition-colors block border border-gray-200"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'submitting') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-emerald-700 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full animate-bounce">
            <Coins className="w-12 h-12 text-black" />
          </div>
          <p className="text-black font-medium">Adding tokens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      <div className="flex-1">
        <div className="mx-auto max-w-sm w-full">
          <div className="bg-white rounded-lg">
            <div className="mx-auto max-w-sm w-full px-6">
              <h1 className="font-bold text-gray-600">
                Self Top-Up (Honesty Box)
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Enter the cash amount you deposited and we&apos;ll add the
                tokens to your balance.
              </p>
            </div>

            <div className="rounded-xl mx-auto py-10 px-6 w-full">
              <div className="flex items-center bg-gray-100 rounded-lg py-4 focus-within:ring-2 focus-within:ring-black focus-within:ring-inset w-full">
                <span className="text-base text-black mx-2">
                  {currencySymbol}
                </span>
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
                      if (status === 'error') {
                        setStatus('idle');
                        setError('');
                      }
                    }
                  }}
                  className={`w-1/2 max-w-sm bg-gray-100 border-none outline-none text-2xl font-medium ${
                    currencyAmount > 0 ? 'text-black' : 'text-gray-400'
                  } placeholder:text-gray-300 focus:ring-0 p-0`}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-500">
                  You have {creditBalance} Tokens.
                </p>
                {currencyAmount > 0 && (
                  <div className="text-right">
                    <p className="text-sm text-green-500">
                      +{tokensToAdd} Tokens
                    </p>
                    <p className="text-sm text-blue-500">
                      You&apos;ll have{' '}
                      {(creditBalance + tokensToAdd).toFixed(2)} Tokens
                    </p>
                  </div>
                )}
              </div>

              {currencyAmount > 0 && (
                <div className="mt-6">
                  <textarea
                    placeholder="Add a note (optional)..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full bg-gray-100 rounded-lg p-3 border-none outline-none text-base font-medium text-black placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-inset resize-none"
                    rows={2}
                  />
                </div>
              )}

              {status === 'error' && error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mx-auto max-w-sm w-full">
          {currencyAmount > 0 && (
            <button
              onClick={handleTopUp}
              className="w-full bg-forest text-white py-4 px-6 mb-4 rounded-lg font-semibold text-lg hover:bg-forestDark transition-colors flex items-center justify-center gap-2"
            >
              <Coins className="w-5 h-5" />
              Add {tokensToAdd} Tokens
            </button>
          )}

          <Link href={`/members-v2/${userId}`}>
            <button className="w-full text-gray-600 hover:text-gray-800 transition-colors text-center">
              <span className="underline">Back to dashboard</span>
            </button>
          </Link>

          <div className="flex flex-col text-center items-center justify-between mt-8 mb-8">
            <p className="text-xs text-gray-500">
              *Please note: Tokens cannot be exchanged back to cash because that
              would compromise the &apos;private&apos; nature of the token
              system.
            </p>
            <p className="text-xs text-center text-gray-500 mt-2">
              Should you need a refund for any reason, we&apos;re happy to give
              you one in the form of more tokens that you can use in our
              ecosystem :)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
