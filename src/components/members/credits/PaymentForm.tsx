'use client';

import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { getStripe } from '@/lib/stripe-client';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useCallback, useEffect, useState } from 'react';

const stripePromise = getStripe();

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// this handles all the logic when they click checkout, takes payment then sends them to success page
function PaymentDetailsForm({
  userId,
  clientSecret,
  returnUrl,
}: {
  userId: string;
  clientSecret: string;
  returnUrl?: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentConfirmation = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      e.preventDefault();
      if (!stripe || !elements) {
        return;
      }

      const { error: submitError } = await elements.submit();

      if (submitError) {
        setError(submitError.message || 'Something went wrong');
        setIsLoading(false);
        return;
      }

      const stripeReturnUrl = returnUrl
        ? `${baseUrl}/members/${userId}/credits/success?returnUrl=${returnUrl}`
        : `${baseUrl}/members/${userId}/credits/success`;

      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: stripeReturnUrl,
        },
      });
      if (paymentError) {
        setError(paymentError.message || 'Something went wrong');
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.error('Error during checkout:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handlePaymentConfirmation}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full bg-forest text-white py-4 rounded-lg font-medium relative mt-4"
      >
        <span id="button-text">
          {isLoading ? <LoadingSpinner /> : 'Add Tokens'}
        </span>
      </button>
      {/* Show any error messages */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}
    </form>
  );
}

export function CreditsPaymentForm({
  userId,
  total,
  returnUrl,
}: {
  userId: string;
  total: number;
  returnUrl?: string;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentAmount, setPaymentIntentAmount] = useState<
    number | undefined
  >(undefined);

  const fetchPaymentIntent = useCallback(async (amount: number) => {
    setClientSecret(null);
    try {
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total: amount,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: { clientSecret: string; amount: number } =
        await response.json();
      setClientSecret(data.clientSecret);
      setPaymentIntentAmount(data.amount);
    } catch (error) {
      console.error('Error fetching payment intent:', error);
    }
  }, []);

  useEffect(() => {
    if (total <= 0) return;

    const timeoutId = setTimeout(() => {
      fetchPaymentIntent(total);
    }, 1000); // Wait for 1 second of no changes

    return () => clearTimeout(timeoutId);
  }, [total, fetchPaymentIntent]);

  if (!clientSecret) {
    return <LoadingSpinner />;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: 'payment',
        amount: paymentIntentAmount,
        currency: 'gbp',
        appearance: {
          theme: 'flat',
        },
      }}
    >
      <PaymentDetailsForm
        userId={userId}
        clientSecret={clientSecret}
        returnUrl={returnUrl}
      />
    </Elements>
  );
}
