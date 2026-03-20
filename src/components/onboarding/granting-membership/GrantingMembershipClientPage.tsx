'use client';

import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GrantingMembershipClientPage() {
  const router = useRouter();
  const [text, setText] = useState('Updating your membership...');

  useEffect(() => {
    const messages = [
      'Updating your membership...',
      'Milking the cows...',
      'Churning the butter...',
      'Almost there...',
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex++;

      if (currentIndex < messages.length) {
        setText(messages[currentIndex]);
      } else {
        clearInterval(interval);
        router.push('/onboarding/granted');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [router]);
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-8 h-8 rounded-md flex items-center justify-center">
        <LoadingSpinner />
      </div>
      <span className="font-semibold">{text}</span>
    </div>
  );
}
