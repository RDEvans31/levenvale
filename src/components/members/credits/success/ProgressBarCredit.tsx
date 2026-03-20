'use client';

import { motion } from 'motion/react';

export default function ProgressBarCredit({
  oldBalance,
  newBalance,
}: {
  oldBalance: number;
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
  const progressStart = (oldBalance - lowerBound) / (upperBound - lowerBound);
  const progressEnd = 1 - (upperBound - newBalance) / (upperBound - lowerBound);

  return (
    <>
      <div className="w-full flex justify-between">
        <p>{lowerBound}</p>
        <p>{upperBound}</p>
      </div>
      <div className="w-full h-4 mb-4 bg-gray-200 rounded-full dark:bg-gray-700">
        <motion.div
          className="h-4 bg-forest rounded-full dark:bg-blue-500 animate-pulse"
          initial={{ width: `${progressStart * 100}%` }}
          animate={{ width: `${progressEnd * 100}%` }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
        />
      </div>
    </>
  );
}
