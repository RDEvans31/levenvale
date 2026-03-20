'use client';

import { signInWithMagicLink } from '@/lib/actions';
import { Key } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import LoadingSpinner from '../shared/LoadingSpinner';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn-primary w-full" disabled={pending}>
      {pending ? <LoadingSpinner /> : 'Log in'}
    </button>
  );
}
export default function LoginPageClientComponent({
  message,
}: {
  message?: string;
}) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('login-email');
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    localStorage.setItem('login-email', e.target.value);
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden w-full max-w-[1200px] flex">
        {/* Left side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <div className="max-w-md mx-auto">
            {message ? (
              <>
                <h1 className="text-3xl font-bold mb-8">Welcome back! 👋</h1>
                <p className="text-gray-600 mb-8">{message}</p>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                  Members Only <Key />
                </h1>
                <p className="text-gray-600 mb-8">
                  Please enter your email and we&apos;ll send you a link to log
                  in.
                </p>
              </>
            )}

            <form action={signInWithMagicLink}>
              <div className="space-y-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064526]"
                  />
                </div>
                <SubmitButton />
              </div>
            </form>

            {!message && (
              <p className="text-center mt-8 text-gray-600">
                If you don&apos;t have an account, we&apos;ll create one for
                you.
              </p>
            )}
          </div>
        </div>

        {/* Right side - Illustration */}
        <div className="hidden lg:block w-1/2 relative">
          <div className="absolute inset-0">
            <Image
              src="/levenvale-lunch.webp"
              alt="Community long lunch"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
