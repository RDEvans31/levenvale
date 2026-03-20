'use client';

import { Drumstick } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CardGoToPantry({ pantryLink }: { pantryLink: string }) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center max-w-sm mx-auto border border-gray-100">
      <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-gray-50">
        <Drumstick size={56} className="text-gray-700" />
      </div>
      <button
        onClick={() => router.push(pantryLink)}
        className="px-8 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 font-semibold text-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition mb-2"
      >
        Go to Pantry
      </button>
      <p className="text-gray-400 text-sm mt-2">
        Access the pantry to allocate yourself food.
      </p>
    </div>
  );
}
