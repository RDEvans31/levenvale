import { ArrowRight, Drumstick } from 'lucide-react';
import Link from 'next/link';

export default function CardGoToPantry({ pantryLink }: { pantryLink: string }) {
  return (
    <Link
      href={pantryLink}
      prefetch={true}
      className="aspect-square bg-brand-green rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 p-4 text-brand-black hover:ring-2 hover:ring-brand-black transition"
    >
      <Drumstick className="h-8 w-8" />
      <span className="text-lg font-semibold">Shop</span>
      <div className="flex items-center justify-center w-10 h-10 bg-brand-white rounded-full">
        <ArrowRight size={20} className="text-brand-black" />
      </div>
    </Link>
  );
}
