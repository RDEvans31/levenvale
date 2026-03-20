import { getEventById } from '@/actions/events';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { auth } from '@/lib/auth';
import { Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PLACEHOLDER_IMAGE = '/placeholder-product.svg';

function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatEventTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
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

function getLowestPrice(
  products: { priceInCurrency: number | null }[]
): number | null {
  const prices = products
    .map(p => p.priceInCurrency)
    .filter((p): p is number => p !== null);
  return prices.length > 0 ? Math.min(...prices) : null;
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const userId = session?.user.id;
  const { id } = await params;

  if (!userId) {
    return (
      <ErrorDisplay errorMsg="We couldn't find you in our database. Please contact Rob @ +447482400662 on WhatsApp" />
    );
  }

  const eventResult = await getEventById(id);

  if (!eventResult.success) {
    return <ErrorDisplay errorMsg={eventResult.error} />;
  }

  const event = eventResult.value;
  const images =
    event.images.length > 0
      ? event.images
      : [{ id: '1', url: PLACEHOLDER_IMAGE, altText: null, sortOrder: 0 }];
  const lowestPrice = getLowestPrice(event.products);
  const location = [event.city, event.postcode].filter(Boolean).join(', ');
  const isBookingClosed =
    event.closeBookingDateTime !== null &&
    new Date(event.closeBookingDateTime) < new Date();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Back button */}
        <Link
          href="/members-v2/events"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Back to events</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Image Grid */}
          <div className="grid grid-cols-2 gap-2">
            {images.slice(0, 4).map((image, index) => (
              <div
                key={image.id}
                className={`relative aspect-square bg-gray-100 ${
                  index === 0 ? 'rounded-tl-2xl' : ''
                } ${index === 1 ? 'rounded-tr-2xl' : ''} ${
                  index === 2 ? 'rounded-bl-2xl' : ''
                } ${index === 3 ? 'rounded-br-2xl' : ''} overflow-hidden`}
              >
                <Image
                  src={image.url}
                  alt={image.altText || event.title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {/* Fill empty slots if less than 4 images */}
            {images.length < 4 &&
              [...Array(4 - images.length)].map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className={`relative aspect-square bg-gray-100 ${
                    images.length + index === 2 ? 'rounded-bl-2xl' : ''
                  } ${images.length + index === 3 ? 'rounded-br-2xl' : ''}`}
                />
              ))}
          </div>

          {/* Right: Event Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>

            {event.closeBookingDateTime && !isBookingClosed && (
              <p className="text-sm text-amber-500 mt-1">
                Booking closes on{' '}
                {new Date(event.closeBookingDateTime).toLocaleDateString(
                  'en-GB',
                  {
                    weekday: 'long',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }
                )}{' '}
                at{' '}
                {new Date(event.closeBookingDateTime).toLocaleTimeString(
                  'en-GB',
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                )}
              </p>
            )}
            {isBookingClosed && (
              <p className="text-sm text-red-400 mt-1">Booking Closed</p>
            )}

            {event.description && (
              <div
                className="text-sm text-gray-600 mt-4 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            )}

            {/* Date, Time, Location */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Calendar size={14} />
                <span>
                  {formatEventDate(event.startsAt)}
                  {!isSameDay(event.startsAt, event.endsAt) &&
                    ` - ${formatEventDate(event.endsAt)}`}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Clock size={14} />
                <span>
                  {formatEventTime(event.startsAt)} -{' '}
                  {formatEventTime(event.endsAt)}
                </span>
              </div>
              {location && (
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <MapPin size={14} />
                  {event.mapLink ? (
                    <a
                      href={event.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {location}
                    </a>
                  ) : (
                    <span>{location}</span>
                  )}
                </div>
              )}
            </div>

            {/* Booking Card */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <p className="text-base text-center">
                {lowestPrice !== null && <>From £{lowestPrice.toFixed(0)} - </>}
                {event.depositInTokens} tokens deposit
              </p>
              {isBookingClosed ? (
                <button
                  disabled
                  className="block w-full mt-4 bg-gray-400 text-white font-bold py-3 px-6 rounded-full opacity-50 cursor-not-allowed text-center"
                >
                  Book now
                </button>
              ) : (
                <Link
                  href={`/members-v2/events/${id}/booking`}
                  className="block w-full mt-4 bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full transition-colors text-center"
                >
                  Book now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
