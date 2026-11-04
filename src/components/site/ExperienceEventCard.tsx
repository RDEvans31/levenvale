import { EventDto } from '@/types/events/event';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Public-site version of littlefarmaio's EventCard: prices are shown in
// dollars rather than tokens, and dates use the farm's time zone so server
// and browser render the same text.

interface ExperienceEventCardProps {
  event: EventDto;
  href?: string;
}

const PLACEHOLDER_IMAGE = '/placeholder-product.svg';
const TIME_ZONE = 'Australia/Sydney';

function formatEventDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: TIME_ZONE,
  });
}

function isSameDay(date1: string, date2: string): boolean {
  const day = (value: string) =>
    new Date(value).toLocaleDateString('en-AU', { timeZone: TIME_ZONE });
  return day(date1) === day(date2);
}

function formatEventTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('en-AU', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: TIME_ZONE,
  });
}

function formatPrice(amount: number): string {
  return amount.toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  });
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, '');
}

function getBookingBadge(closeBookingDateTime: string | null) {
  const isClosed =
    closeBookingDateTime !== null &&
    new Date(closeBookingDateTime) < new Date();

  if (isClosed) {
    return (
      <span className="absolute left-2 top-2 rounded-full bg-brand-black px-2 py-1 text-xs text-brand-white">
        Booking Closed
      </span>
    );
  }

  return (
    <span className="absolute left-2 top-2 rounded-full bg-brand-green px-2 py-1 text-xs text-brand-black">
      Open
    </span>
  );
}

function getLowestTicketPrice(event: EventDto): number | null {
  const prices = (event.products || [])
    .filter(
      product =>
        product.productType === 'ticket' &&
        product.priceInCurrency !== null &&
        product.priceInCurrency > 0
    )
    .map(product => product.priceInCurrency as number);

  return prices.length > 0 ? Math.min(...prices) : null;
}

export function ExperienceEventCard({ event, href }: ExperienceEventCardProps) {
  const primaryImage = event.images?.[0];
  const displayImage = primaryImage?.url || PLACEHOLDER_IMAGE;
  const location = [event.city, event.postcode].filter(Boolean).join(', ');
  const lowestTicketPrice = getLowestTicketPrice(event);
  const multiDay = !isSameDay(event.startsAt, event.endsAt);

  const content = (
    <>
      <div className="relative h-48 w-full lg:h-56">
        <Image
          src={displayImage}
          alt={primaryImage?.altText || event.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {getBookingBadge(event.closeBookingDateTime)}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-lg font-medium text-gray-900">
          {event.title}
        </h3>

        {event.description && (
          <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-gray-600">
            {stripHtml(event.description)}
          </p>
        )}

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Calendar size={14} />
            <span>
              {formatEventDate(event.startsAt)}
              {multiDay && ` – ${formatEventDate(event.endsAt)}`}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Clock size={14} />
            <span>
              {formatEventTime(event.startsAt)} –{' '}
              {formatEventTime(event.endsAt)}
            </span>
          </div>
          {location && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <MapPin size={14} />
              <span>{location}</span>
            </div>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          {lowestTicketPrice !== null && (
            <div className="flex items-center gap-1.5 text-sm">
              <Ticket size={14} className="text-gray-700" />
              <span className="text-gray-500">From</span>
              <span className="font-bold text-gray-900">
                {formatPrice(lowestTicketPrice)}
              </span>
            </div>
          )}
          {event.bookingCount > 0 && (
            <span className="text-sm text-gray-500">
              {event.bookingCount} booked
            </span>
          )}
        </div>
      </div>
    </>
  );

  const className =
    'flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm';

  if (href) {
    return (
      <Link
        href={href}
        className={`${className} transition-shadow hover:shadow-md`}
      >
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}
