'use client';

import { EventDto } from '@/types/events/event';
import { Calendar, Clock, Coins, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
  event: EventDto;
}

const PLACEHOLDER_IMAGE = '/placeholder-product.svg';

function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function isSameDay(date1: string, date2: string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function formatEventTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getBookingBadge(closeBookingDateTime: string | null) {
  const isClosed =
    closeBookingDateTime !== null &&
    new Date(closeBookingDateTime) < new Date();

  if (isClosed) {
    return (
      <span className="absolute top-2 left-2 px-2 py-1 text-sm bg-amber-400 text-white rounded-full">
        Booking Closed
      </span>
    );
  }

  return (
    <span className="absolute top-2 left-2 px-2 py-1 text-sm bg-green-500 text-white rounded-full">
      Open
    </span>
  );
}

export function EventCard({ event }: EventCardProps) {
  const displayImage = event.images?.[0]?.url || PLACEHOLDER_IMAGE;
  const location = [event.city, event.postcode].filter(Boolean).join(', ');

  return (
    <Link
      href={`/members-v2/events/${event.id}`}
      className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative h-40 w-full">
        <Image
          src={displayImage}
          alt={event.images?.[0]?.altText || event.title}
          fill
          className="object-cover"
        />
        {getBookingBadge(event.closeBookingDateTime)}
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-base text-gray-900 line-clamp-2">{event.title}</h3>

        {event.description && (
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {event.description.replace(/<[^>]*>/g, '')}
          </p>
        )}

        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-1 text-gray-600 text-xs">
            <Calendar size={12} />
            <span>
              {formatEventDate(event.startsAt)}
              {!isSameDay(event.startsAt, event.endsAt) &&
                ` - ${formatEventDate(event.endsAt)}`}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 text-xs">
            <Clock size={12} />
            <span>
              {formatEventTime(event.startsAt)} -{' '}
              {formatEventTime(event.endsAt)}
            </span>
          </div>
          {location && (
            <div className="flex items-center gap-1 text-gray-600 text-xs">
              <MapPin size={12} />
              <span>{location}</span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <Coins size={14} className="text-gray-700" />
              <span className="font-bold text-gray-900">
                {event.depositInTokens.toFixed(2)}
              </span>
              <span className="text-gray-500">deposit</span>
            </div>
            {event.bookingCount > 0 && (
              <span className="text-sm text-gray-500">
                {event.bookingCount} booked
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
