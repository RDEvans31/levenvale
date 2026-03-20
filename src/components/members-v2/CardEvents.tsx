import { ArrowRightCircle, CalendarHeart } from 'lucide-react';
import Link from 'next/link';

export default function CardEvents() {
  return (
    <Link
      href="/members-v2/events"
      className="flex items-center justify-between bg-green-100 rounded-xl px-5 py-4 shadow-md text-forest hover:bg-green-200 transition-colors"
    >
      <div className="flex items-center gap-3">
        <CalendarHeart className="h-6 w-6" />
        <span className="text-lg font-semibold">Events</span>
      </div>
      <ArrowRightCircle className="h-6 w-6" />
    </Link>
  );
}
