import { getEventsByCategory } from '@/actions/events';
import { EventCategoryDto } from '@/types/events/event';
import Link from 'next/link';
import { EventCard } from './EventCard';

interface CategoryDisplayProps {
  category: EventCategoryDto;
}

export async function CategoryDisplay({ category }: CategoryDisplayProps) {
  const eventsResult = await getEventsByCategory(category.id, 6);

  if (!eventsResult.success || eventsResult.value.length === 0) {
    return null;
  }

  const events = eventsResult.value;

  return (
    <div className="rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold">{category.name}</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto md:scrollbar-hidden pb-2">
        {events.map(event => (
          <div key={event.id} className="flex-shrink-0 w-48">
            <EventCard event={event} />
          </div>
        ))}
      </div>

      {category.eventCount > 6 && (
        <div className="mt-4 text-center">
          <Link
            href={`/members-v2/events/category/${category.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            View all {category.eventCount} events
          </Link>
        </div>
      )}
    </div>
  );
}
