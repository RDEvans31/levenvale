import { ArrowRight, CalendarHeart } from 'lucide-react';
import Link from 'next/link';

export default function CardEvents() {
  return (
    <Link
      href="/members-v2/events"
      className="aspect-square bg-beige rounded-2xl shadow-xl text-forest hover:brightness-95 transition-colors flex flex-col items-center justify-center gap-3 p-4"
    >
      <CalendarHeart className="h-8 w-8" />
      <span className="text-lg font-semibold">Events</span>
      <div className="flex items-center justify-center w-10 h-10 bg-forest bg-opacity-10 rounded-full">
        <ArrowRight size={20} className="text-forest" />
      </div>
    </Link>
  );
}
