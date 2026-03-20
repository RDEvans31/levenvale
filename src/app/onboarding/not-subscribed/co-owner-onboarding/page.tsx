'use client';
import AutoSignOut from '@/components/shared/AutoSignOut';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Key } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default function CoOwnerOnboarding() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data, status } = useSession();
  const router = useRouter();

  const user = data?.user;

  if (!user || status === 'unauthenticated') {
    router.push(`${baseUrl}/login`);
    return;
  }
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    const response = await fetch(`${baseUrl}/api/members/onboard-co-owner`);

    const data = await response.json();
    if (response.ok) {
      setIsSuccess(true);
      setError(null);
    } else {
      setIsSuccess(false);
      setError(data.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col py-8 px-4 sm:px-16 gap-8 items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 items-center mx-auto text-center max-w-full">
        <h1 className="text-xl font-bold">
          Update your profile to gain access 🔐
        </h1>
        <Image
          className="mx-auto w-[50px] sm:w-[100px]"
          src="/levenvale-logo.png"
          alt="Levenvale Farm logo"
          width={180}
          height={180}
          priority
        />
        <p className="px-4 sm:px-0">You&apos;re a co-owner of Levenvale Farm!</p>
        <p className="px-4 sm:px-0">
          So you can access to our members-only features.
        </p>
        <p className="px-4 sm:px-0">
          Please click the button below and we&apos;ll update your profile.
        </p>
        <button
          onClick={handleUpdateProfile}
          disabled={isLoading}
          className="p-2 bg-white shadow rounded-full flex-shrink-0 hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Add to cart"
        >
          {!isLoading && (
            <div className="flex items-center gap-2">
              <Key size={20} className="text-gray-700" />
              <span>Update profile</span>
            </div>
          )}
          {isLoading && <LoadingSpinner />}
        </button>

        {isSuccess && (
          <AutoSignOut redirect="/login?message=Membership granted! Please login again to access." />
        )}
        {error && (
          <>
            <p className="px-4 sm:px-0 text-red-500">{error}</p>
            <p className="px-4 sm:px-0">
              Please reach out to us at{' '}
              <a
                href="mailto:hello@bellobeef.com.au"
                className="text-blue-600 underline underline-offset-4 break-words"
              >
                hello@bellobeef.com.au
              </a>
              and we&apos;ll add you to the list.
            </p>
          </>
        )}
        {/* <p className="px-4 sm:px-0">
          After that&apos;s been confirmed, you&apos;ll need to sign in again
        </p>

        <SignOut /> */}
      </div>
    </div>
  );
}
