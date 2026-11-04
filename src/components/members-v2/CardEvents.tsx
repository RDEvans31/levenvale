import { ArrowRight, CalendarHeart } from 'lucide-react';
import Link from 'next/link';

export default function CardEvents() {
  return (
    <Link
      href="/members-v2/events"
      className="aspect-square bg-brand-white border-2 border-brand-green rounded-2xl shadow-xl text-brand-black hover:border-brand-black transition-colors flex flex-col items-center justify-center gap-3 p-4"
    >
      <CalendarHeart className="h-8 w-8" />
      <span className="text-lg font-semibold">Events</span>
      <div className="flex items-center justify-center w-10 h-10 bg-brand-green rounded-full">
        <ArrowRight size={20} className="text-brand-black" />
      </div>
    </Link>
  );
}
