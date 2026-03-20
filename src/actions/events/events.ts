'use server';

import { LF_API_KEY, LF_API_URL } from '@/lib/little-farma/little-farma';
import { EventCategoryDto, EventDto } from '@/types/events/event';
import { Result } from '@/types/result';
import { revalidateTag } from 'next/cache';

interface EventCategoriesResponse {
  categories: EventCategoryDto[];
}

interface EventsResponse {
  events: EventDto[];
}

interface SingleEventResponse {
  success: boolean;
  event: EventDto;
}

export async function getEventCategories(): Promise<
  Result<EventCategoryDto[]>
> {
  try {
    const res = await fetch(`${LF_API_URL}/events/categories`, {
      headers: {
        Authorization: `Bearer ${LF_API_KEY}`,
      },
      cache: 'no-store', // Disabled for testing
      // next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      console.error('Failed to fetch event categories:', res.status);
      return { success: false, error: 'Failed to fetch event categories' };
    }

    const data: EventCategoriesResponse = await res.json();
    return { success: true, value: data.categories };
  } catch (error) {
    console.error('Error fetching event categories:', error);
    return {
      success: false,
      error: 'Unexpected error fetching event categories',
    };
  }
}

export async function getEventsByCategory(
  categoryId: string,
  limit?: number
): Promise<Result<EventDto[]>> {
  try {
    const res = await fetch(
      `${LF_API_URL}/events/categories/${categoryId}?status=live&startDate=${new Date().toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${LF_API_KEY}`,
        },
        cache: 'no-store', // Disabled for testing
        // next: { revalidate: 1800 }, // Cache for 30 minutes
      }
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch events for category ${categoryId}:`,
        res.status
      );
      return { success: false, error: 'Failed to fetch events' };
    }

    const data: EventsResponse = await res.json();
    const events = limit ? data.events.slice(0, limit) : data.events;
    return { success: true, value: events };
  } catch (error) {
    console.error(`Error fetching events for category ${categoryId}:`, error);
    return { success: false, error: 'Unexpected error fetching events' };
  }
}

export async function getEventById(eventId: string): Promise<Result<EventDto>> {
  try {
    const res = await fetch(`${LF_API_URL}/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${LF_API_KEY}`,
      },
      cache: 'no-store', // Disabled for testing
      // next: { tags: [`event-${eventId}`], revalidate: 1800 },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return { success: false, error: 'Event not found' };
      }
      console.error(`Failed to fetch event ${eventId}:`, res.status);
      return { success: false, error: 'Failed to fetch event' };
    }

    const data: SingleEventResponse = await res.json();
    return { success: true, value: data.event };
  } catch (error) {
    console.error(`Error fetching event ${eventId}:`, error);
    return { success: false, error: 'Unexpected error fetching event' };
  }
}

export async function getEventCategory(
  categoryId: string
): Promise<Result<EventCategoryDto>> {
  try {
    const categoriesResult = await getEventCategories();
    if (!categoriesResult.success) {
      return { success: false, error: categoriesResult.error };
    }

    const category = categoriesResult.value.find(c => c.id === categoryId);
    if (!category) {
      return { success: false, error: 'Category not found' };
    }

    return { success: true, value: category };
  } catch (error) {
    console.error(`Error fetching event category ${categoryId}:`, error);
    return { success: false, error: 'Unexpected error fetching category' };
  }
}

export async function revalidateEvent(eventId: string): Promise<void> {
  revalidateTag(`event-${eventId}`);
}
