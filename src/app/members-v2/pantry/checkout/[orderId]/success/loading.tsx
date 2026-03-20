import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Check, Coins } from 'lucide-react';

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-100 to-green-700">
      {/* Blurred Content */}
      <div className="blur-sm flex flex-col items-center justify-center p-4 space-y-6">
        {/* Green checkmark icon */}
        <div className="bg-green-400 rounded-full p-4">
          <Check className="w-12 h-12" color="#fff" />
        </div>

        {/* Order card */}
        <div className="bg-white rounded-lg p-8 shadow-sm max-w-2xl w-full">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-black">Order #</h1>
            <p className="text-lg text-gray-600 mt-2">Received 🎉</p>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">What you ordered:</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <div className="text-left">
                  <p className="font-medium">Beef Bone Broth</p>
                  <p className="text-sm text-gray-500">SKU: BB-750</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end text-sm text-gray-600">
                    <span className="mr-2">1 x </span>
                    <span>14.00 tokens</span>
                  </div>
                  <div className="flex items-center justify-end font-medium">
                    <Coins className="w-4 h-4 mr-1" />
                    <span>14.00</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center py-3 font-bold text-lg border-t-2 border-gray-200">
                <p>Total:</p>
                <div className="flex items-center">
                  <Coins className="w-5 h-5 mr-1" />
                  <span>14.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              We&apos;ll send it to:
            </h3>
            <div className="text-left space-y-1 text-gray-700">
              <p>John Smith</p>
              <p>123 Sample Street</p>
              <p>London, SW1</p>
              <p>2AB</p>
              <p>United Kingdom</p>
            </div>
          </div>
        </div>

        {/* Token Balance Card */}
        <div className="bg-white rounded-lg p-8 shadow-sm max-w-2xl w-full">
          <h3 className="text-lg font-semibold mb-3">Token Balance</h3>
          <div className="flex space-x-2">
            <Coins className="w-6 h-6" />
            <p className="text-xl font-bold">142.50 tokens left</p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex flex-col space-y-4 max-w-lg w-full">
          <div className="bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl text-lg text-center">
            Back to Members Portal
          </div>
        </div>
      </div>

      {/* Loading Spinner Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner />
        </div>
      </div>
    </div>
  );
}
