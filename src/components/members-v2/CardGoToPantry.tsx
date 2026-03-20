import { ArrowRight, Drumstick } from 'lucide-react';
import Link from 'next/link';

export default function CardGoToPantry({ pantryLink }: { pantryLink: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center max-w-sm mx-auto border border-forest">
      <p className="text-forest text-sm mb-4 font-medium">
        <Drumstick size={20} className="text-forest" />
      </p>
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-forest text-4xl font-bold">Pantry</h2>
      </div>

      {/* Single action button matching token balance style */}
      <Link href={pantryLink} prefetch={true}>
        <button className="flex flex-col items-center justify-center w-16 h-16 bg-forest bg-opacity-10 border-2 rounded-full hover:bg-forest hover:bg-opacity-20 transition-colors group mb-2">
          <ArrowRight size={24} className="text-forest" />
        </button>
      </Link>

      {/* Button label */}
      <span className="text-forest text-xs font-medium">Get some food</span>
    </div>
  );
}
