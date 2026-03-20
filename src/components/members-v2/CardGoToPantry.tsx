import { ArrowRight, Drumstick } from 'lucide-react';
import Link from 'next/link';

export default function CardGoToPantry({ pantryLink }: { pantryLink: string }) {
  return (
    <Link
      href={pantryLink}
      prefetch={true}
      className="aspect-square bg-green-200 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 p-4 text-forest hover:bg-green-50 transition-colors"
    >
      <Drumstick className="h-8 w-8" />
      <span className="text-lg font-semibold">Shop</span>
      <div className="flex items-center justify-center w-10 h-10 bg-forest bg-opacity-10 rounded-full">
        <ArrowRight size={20} className="text-forest" />
      </div>
    </Link>
  );
}
