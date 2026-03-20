'use client';

import { UserBookingDto } from '@/types/events/booking';
import { ChevronDown, Coins } from 'lucide-react';
import { useState } from 'react';

function formatEventDate(startsAt: string, endsAt: string): string {
  const start = new Date(startsAt);
  const end = new Date(endsAt);

  const dateStr = start.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  const startTime = start.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endTime = end.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${dateStr}, ${startTime} - ${endTime}`;
}

interface BookingCardProps {
  booking: UserBookingDto;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const [expanded, setExpanded] = useState(false);

  const { event, purchases } = booking;

  const totalTokens = purchases.reduce(
    (sum, p) => sum + p.eventProduct.priceInTokens * p.quantity,
    0
  );

  const ticketCount = purchases
    .filter(p => p.eventProduct.productType === 'ticket')
    .reduce((sum, p) => sum + p.quantity, 0);

  const addonCount = purchases
    .filter(p => p.eventProduct.productType !== 'ticket')
    .reduce((sum, p) => sum + p.quantity, 0);

  const summaryParts: string[] = [];
  if (ticketCount > 0)
    summaryParts.push(`${ticketCount} ticket${ticketCount !== 1 ? 's' : ''}`);
  if (addonCount > 0)
    summaryParts.push(`${addonCount} add-on${addonCount !== 1 ? 's' : ''}`);

  const isCancelled = event.status === 'cancelled';

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="font-bold text-black text-lg">{event.title}</h3>
        {isCancelled && (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-700 ml-2 shrink-0">
            Cancelled
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
        <Coins size={14} className="shrink-0" />
        <span className="font-medium">{totalTokens} tokens</span>
        <span>·</span>
        <span>{formatEventDate(event.startsAt, event.endsAt)}</span>
      </div>

      {summaryParts.length > 0 && (
        <p className="text-sm text-gray-500 mt-1">{summaryParts.join(' · ')}</p>
      )}

      {purchases.length > 0 && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronDown
              size={16}
              className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
            {expanded ? 'Hide details' : 'Show details'}
          </button>

          {expanded && (
            <div className="mt-3 border-t pt-3">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Items
              </h4>
              <div className="space-y-1">
                {purchases.map(purchase => (
                  <div key={purchase.id}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-800">
                        {purchase.eventProduct.name}
                      </span>
                      <span className="text-gray-500">
                        x{purchase.quantity}
                      </span>
                    </div>
                    {purchase.additionalInfo && (
                      <div className="bg-gray-50 rounded px-3 py-1.5 mt-1 mb-1">
                        <p className="text-xs text-gray-600">
                          {purchase.additionalInfo}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
