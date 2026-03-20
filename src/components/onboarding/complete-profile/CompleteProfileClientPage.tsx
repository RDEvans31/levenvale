'use client';

import { Result } from '@/types/result';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CompleteProfileClientPage({
  updateName,
}: {
  updateName: (name: string) => Promise<Result<string>>;
}) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = await updateName(name);
    if (result.success) {
      setIsLoading(false);
      router.push('/authorized');
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {!error && (
        <div className="flex flex-col py-8 px-4 sm:px-16 gap-8 items-center justify-center min-h-screen">
          <div className="flex flex-col gap-4 items-center mx-auto text-center max-w-md w-full">
            <h1 className="text-xl font-bold">What should we call you?</h1>
            <p className="text-gray-600">Please enter your name to continue</p>

            <div className="w-full space-y-4 mt-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064526]"
                  placeholder="Enter your full name"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                onClick={() => handleSubmit()}
                className="w-full p-3 bg-forest text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                {isLoading ? 'Loading...' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
