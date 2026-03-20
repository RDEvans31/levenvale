'use client';

import { useRouter } from 'next/navigation';
import ProgressBarCredit from './ProgressBarCredit';

export default function CreditSuccessPageClientComponent({
  oldBalance,
  newBalance,
}: {
  oldBalance: number;
  newBalance: number;
}) {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Way to go!</h1>
      <p className="text-gray-600 mb-8 text-center">
        Your balance is {newBalance?.toString()}
      </p>
      <div className="w-full mb-8 max-w-lg">
        <ProgressBarCredit oldBalance={oldBalance} newBalance={newBalance} />
      </div>
      <button
        onClick={() => {
          router.push('/members/pantry');
        }}
        className="w-full max-w-xs bg-forest hover:bg-forest/90 text-white font-semibold py-3 rounded-lg text-center transition-colors"
      >
        Go to Pantry
      </button>
    </div>
  );
}
