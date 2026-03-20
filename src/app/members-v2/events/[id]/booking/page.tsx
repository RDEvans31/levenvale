import { getEventById } from '@/actions/events';
import { BookingForm } from '@/components/events/BookingForm';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { auth } from '@/lib/auth';

export default async function BookingPage({
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

  const isBookingClosed =
    event.closeBookingDateTime !== null &&
    new Date(event.closeBookingDateTime) < new Date();

  if (isBookingClosed) {
    return <ErrorDisplay errorMsg="Booking for this event has closed" />;
  }

  return (
    <BookingForm
      eventId={id}
      products={event.products}
      depositInTokens={event.depositInTokens}
    />
  );
}
