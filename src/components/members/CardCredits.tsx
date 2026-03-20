'use client';

import { Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  userId: string;
}

export default function CardCredits({ userId }: Props) {
  const router = useRouter();
  return (
    <div className="bg-forest rounded-2xl shadow-md p-8 flex flex-col items-center text-center max-w-sm mx-auto border border-gray-100">
      <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-forest">
        <Wallet size={56} className="text-white" />
      </div>
      <button
        onClick={() => router.push(`/members/${userId}/credits`)}
        className="px-8 py-3 rounded-lg border border-white bg-forest text-white font-semibold text-lg shadow-sm hover:bg-white hover:text-forest focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition mb-2 inline-block text-center"
      >
        Top Up
      </button>
      <p className="text-gray-400 text-sm mt-2">
        Top up your wallet to allocate yourself food.
      </p>
    </div>
  );
}
