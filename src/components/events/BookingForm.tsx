'use client';

import { bookEvent, BookingResponse } from '@/actions/events';
import { EventProductDto } from '@/types/events/event';
import {
  ArrowLeft,
  ClipboardCheck,
  Coins,
  Loader2,
  Minus,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ProductSelection {
  [productId: string]: number;
}

function ProductCard({
  product,
  quantity,
  onQuantityChange,
}: {
  product: EventProductDto;
  quantity: number;
  onQuantityChange: (qty: number) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-base font-bold text-gray-900">{product.name}</h3>
          {product.description && (
            <p className="text-sm text-gray-500 mt-1">
              {product.description.replace(/<[^>]*>/g, '')}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end ml-4">
          <span className="flex items-center gap-1 text-sm text-gray-900 mb-2">
            <Coins size={14} />
            {product.priceInTokens}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
              className="text-gray-400 hover:text-gray-600"
              disabled={quantity === 0}
            >
              <Minus size={18} />
            </button>
            <span className="text-base w-4 text-center">{quantity}</span>
            <button
              onClick={() =>
                onQuantityChange(
                  product.maxQuantity === null
                    ? quantity + 1
                    : Math.min(product.maxQuantity, quantity + 1)
                )
              }
              className="text-gray-400 hover:text-gray-600"
              disabled={
                product.maxQuantity !== null && quantity >= product.maxQuantity
              }
            >
              <Plus size={18} />
            </button>
          </div>
          <span className="text-xs text-green-600 mt-1">
            {product.maxQuantity === null
              ? 'Unlimited'
              : `${product.maxQuantity} left`}
          </span>
        </div>
      </div>
    </div>
  );
}

interface BookingFormProps {
  eventId: string;
  products: EventProductDto[];
  depositInTokens: number;
}

interface AdditionalInfoAnswers {
  [key: string]: string; // key format: `${productId}-${index}`
}

export function BookingForm({
  eventId,
  products,
  depositInTokens,
}: BookingFormProps) {
  const [selections, setSelections] = useState<ProductSelection>({});
  const [additionalInfoAnswers, setAdditionalInfoAnswers] =
    useState<AdditionalInfoAnswers>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(
    null
  );
  // Group products by type
  const tickets = products.filter(p => p.productType === 'ticket');
  const requiredAddons = products.filter(
    p => p.productType === 'required_addon'
  );
  const optionalAddons = products.filter(
    p => p.productType === 'optional_addon'
  );

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelections(prev => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const calculateProductsTotal = () => {
    return products.reduce((total, product) => {
      const qty = selections[product.id] || 0;
      return total + product.priceInTokens * qty;
    }, 0);
  };

  const productsTotal = calculateProductsTotal();
  const hasSelections = Object.values(selections).some(qty => qty > 0);
  const total = hasSelections ? productsTotal + depositInTokens : 0;

  // Check if all required additional info questions are answered
  const hasUnansweredQuestions = () => {
    for (const product of products) {
      if (product.additionalInfoQuestion) {
        const qty = selections[product.id] || 0;
        for (let i = 0; i < qty; i++) {
          const key = `${product.id}-${i}`;
          if (!additionalInfoAnswers[key]?.trim()) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const handleBooking = async () => {
    setError(null);
    setIsLoading(true);

    try {
      // Transform selections into purchases array
      const purchases = Object.entries(selections)
        .filter(([, quantity]) => quantity > 0)
        .map(([productId, quantity]) => {
          const product = products.find(p => p.id === productId);

          // Collect individual answers for each ticket quantity
          const additionalInfo = product?.additionalInfoQuestion
            ? Array.from(
                { length: quantity },
                (_, i) => additionalInfoAnswers[`${productId}-${i}`] || ''
              )
            : undefined;

          return {
            eventProductId: productId,
            quantity,
            additionalInfo,
          };
        });

      const result = await bookEvent({
        eventId,
        purchases,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      // Success - show success view
      setBookingResult(result.value);
      setIsSuccess(true);
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Success view
  if (isSuccess && bookingResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-md w-full text-center">
          {/* Success heading */}
          <h1 className="text-2xl font-bold text-black mb-4">
            You&apos;re on the list!
          </h1>

          {/* Green checkmark */}
          <div className="flex justify-center mb-6">
            <ClipboardCheck
              className="text-green-600"
              size={80}
              strokeWidth={1.5}
            />
          </div>

          {/* Booking details card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8 text-left">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Your booking
            </h2>

            {/* Event title */}
            <p className="text-base font-medium text-gray-800">
              {bookingResult.event.title}
            </p>

            {/* Date/time */}
            <p className="text-sm text-green-700 mt-1">
              {new Date(bookingResult.event.startsAt).toLocaleString('en-GB', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}{' '}
              -{' '}
              {new Date(bookingResult.event.endsAt).toLocaleString('en-GB', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>

            {/* Address */}
            {bookingResult.event.address && (
              <p className="text-sm text-gray-600 mt-1">
                {bookingResult.event.address.addressLine1}
                {bookingResult.event.address.addressLine2 &&
                  `, ${bookingResult.event.address.addressLine2}`}
                , {bookingResult.event.address.city},{' '}
                {bookingResult.event.address.postcode}
              </p>
            )}

            {/* Map link */}
            {bookingResult.event.mapLink && (
              <a
                href={bookingResult.event.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-700 underline mt-1 inline-block"
              >
                View on map
              </a>
            )}

            <div className="mt-4" />

            {/* Purchased items */}
            <ul className="space-y-2 mb-4">
              {bookingResult.purchases.map(purchase => {
                const product = products.find(
                  p => p.id === purchase.eventProductId
                );
                return (
                  <li
                    key={purchase.eventProductId}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>
                      {product?.name || 'Item'} x{purchase.quantity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Coins size={14} />
                      {(product?.priceInTokens || 0) * purchase.quantity}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Total */}
            <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span className="flex items-center gap-1">
                <Coins size={16} />
                {bookingResult.totalCost}
              </span>
            </div>
          </div>

          {/* Back to dashboard button */}
          <Link
            href="/members-v2"
            className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            Back to your Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Back button */}
        <Link
          href={`/members-v2/events/${eventId}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Back to event</span>
        </Link>

        {/* Tickets Section */}
        {tickets.length > 0 && (
          <div className="mb-8">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              Select tickets
            </h2>
            {tickets.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={selections[product.id] || 0}
                onQuantityChange={qty => handleQuantityChange(product.id, qty)}
              />
            ))}
          </div>
        )}

        {/* Required Add-ons Section */}
        {requiredAddons.length > 0 && (
          <div className="mb-8">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              Choose at least one
            </h2>
            {requiredAddons.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={selections[product.id] || 0}
                onQuantityChange={qty => handleQuantityChange(product.id, qty)}
              />
            ))}
          </div>
        )}

        {/* Optional Add-ons Section */}
        {optionalAddons.length > 0 && (
          <div className="mb-8">
            <h2 className="text-base font-bold text-gray-900 mb-4">Add-on</h2>
            {optionalAddons.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={selections[product.id] || 0}
                onQuantityChange={qty => handleQuantityChange(product.id, qty)}
              />
            ))}
          </div>
        )}

        {/* Additional Info Questions Section */}
        {(() => {
          // Flatten to individual question cards: one per product per quantity
          const questionCards: {
            product: EventProductDto;
            index: number;
            key: string;
          }[] = [];
          products.forEach(product => {
            if (product.additionalInfoQuestion) {
              const qty = selections[product.id] || 0;
              for (let i = 0; i < qty; i++) {
                questionCards.push({
                  product,
                  index: i,
                  key: `${product.id}-${i}`,
                });
              }
            }
          });

          if (questionCards.length === 0) return null;
          return (
            <div className="mb-8">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                Let us know
              </h2>
              {questionCards.map(({ product, index, key }) => (
                <div
                  key={key}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-3"
                >
                  <label className="block text-green-700 font-medium mb-2">
                    {product.name} #{index + 1}:{' '}
                    {product.additionalInfoQuestion}
                  </label>
                  <input
                    type="text"
                    value={additionalInfoAnswers[key] || ''}
                    onChange={e =>
                      setAdditionalInfoAnswers(prev => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    placeholder="Your answer goes here"
                    className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-gray-900 placeholder:text-gray-400 focus:border-green-700 focus:ring-0 focus:outline-none"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Enter &apos;none&apos; if no answer
                  </p>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-lg mx-auto px-4 mb-24">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4 flex flex-col items-center">
        <div className="inline-flex items-center bg-white rounded-full shadow-lg border border-gray-100 p-1.5 pl-6">
          <span className="flex items-center gap-1 text-base font-bold mr-4">
            <Coins size={16} />
            {total}
          </span>
          <button
            onClick={handleBooking}
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!hasSelections || isLoading || hasUnansweredQuestions()}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Booking...
              </span>
            ) : (
              'Book now'
            )}
          </button>
        </div>
        {hasSelections && depositInTokens > 0 && (
          <p className="text-xs text-green-700 mt-2 flex items-center gap-1">
            includes {depositInTokens} <Coins size={12} /> refundable deposit
          </p>
        )}
      </div>
    </div>
  );
}
