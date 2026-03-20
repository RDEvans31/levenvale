'use client';

import { motion } from 'motion/react';

export default function ProgressBarCredit({
  newBalance,
}: {
  newBalance: number;
}) {
  const roundUpToNearest1000 = (n: number) => {
    return Math.ceil(n / 1000) * 1000;
  };

  const roundDownToNearest1000 = (n: number) => {
    return Math.floor(n / 1000) * 1000;
  };
  const upperBound = roundUpToNearest1000(newBalance);
  const lowerBound = roundDownToNearest1000(newBalance);
  const progressEnd = 1 - (upperBound - newBalance) / (upperBound - lowerBound);

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="w-full flex justify-between mb-2">
        <p className="text-sm font-medium text-gray-700">{lowerBound}</p>
        <p className="text-sm font-medium text-gray-700">{upperBound}</p>
      </div>
      <div className="w-full h-4 mb-4 bg-gray-200 rounded-full">
        <motion.div
          className="h-4 bg-emerald-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progressEnd * 100}%` }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Balance</span>
        <span className="text-lg font-bold text-gray-900">
          {newBalance.toFixed(2)} Tokens
        </span>
      </div>
    </div>
  );
}
