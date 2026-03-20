import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Blurred Content */}
      <div className="blur-sm">
        {/* Top navbar */}
        <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-forest rounded-md flex items-center justify-center">
              <Image
                src="/levenvale-logo.png"
                alt="Levenvale Farm"
                width={32}
                height={32}
              />
            </div>
            <span className="font-semibold">Levenvale Farm</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm">U</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Hello Member</h1>
          <p className="text-gray-600">
            It looks like you&apos;re not a member yet!
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Mock subscription card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-4">
            <h2 className="text-xl font-semibold mb-4">
              Choose Your Membership
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-300 rounded-lg p-4">
                <h3 className="font-medium mb-2">Basic Membership</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Access to seasonal produce
                </p>
                <div className="text-2xl font-bold text-forest">$29/month</div>
              </div>
              <div className="border border-forest rounded-lg p-4 bg-forest text-white">
                <h3 className="font-medium mb-2">Premium Membership</h3>
                <p className="text-gray-200 text-sm mb-3">
                  Full access to all products
                </p>
                <div className="text-2xl font-bold">$49/month</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <div className="inline-block border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700">
              You&apos; a co-owner?
            </div>
          </div>
        </div>
      </div>

      {/* Loading Spinner Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner />
          <p className="text-gray-600 font-medium">
            Checking membership status...
          </p>
        </div>
      </div>
    </div>
  );
}
