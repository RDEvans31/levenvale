'use client';
import { getMembershipIdByEmail } from '@/actions/members/membership';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { CircleXIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SubscribedClientPage({ email }: { email: string }) {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const checkMembership = async () => {
      for (let attempt = 0; attempt < 3; attempt++) {
        if (cancelled) return;

        await new Promise(resolve => setTimeout(resolve, 3000));
        if (cancelled) return;

        try {
          const result = await getMembershipIdByEmail(email);
          if (!result.success) {
            setError('Failed to fetch user data. Please try again.');
            return;
          }

          if (result.value.role === 'member') {
            router.push('/onboarding/granting-membership');
            return;
          }
        } catch {
          // Retry on error unless it's the last attempt
          if (attempt === 2) {
            setError(
              'Failed to verify membership. Please contact support at hello@bellobeef.com.au.'
            );
            return;
          }
        }
      }

      setError(
        'Could not update you to member. Please contact support at hello@bellobeef.com.au.'
      );
    };

    checkMembership();

    return () => {
      cancelled = true;
    };
  }, [email, router]);

  return error ? (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-8 h-8 rounded-md flex items-center justify-center">
        <CircleXIcon className="w-5 h-5" />
      </div>
      <span className="font-semibold">
        {error || 'Processing your membership...'}
      </span>
    </div>
  ) : (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-8 h-8 rounded-md flex items-center justify-center">
        <LoadingSpinner />
      </div>
      <span className="font-semibold">Processing your membership...</span>
    </div>
  );
}
