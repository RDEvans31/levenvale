import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { ArrowRight, Coins, Drumstick, PlusIcon } from 'lucide-react';
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
              <span className="text-sm">J</span>
            </div>
          </div>
          <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            Sign out
          </button>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Hi</h1>
          </div>

          {/* Token Balance - Updated to match new vertical layout */}
          <div>
            <div className="bg-gradient-to-br from-green-600 to-forest rounded-2xl shadow-md p-8 flex flex-col items-center text-center max-w-sm mx-auto border border-gray-100 relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center w-full">
                <p className="text-white text-sm mb-4 font-medium">
                  Your Balance
                </p>
                <div className="flex items-center justify-center mb-8">
                  <Coins size={32} className="text-white mr-3" />
                </div>
                <button className="flex flex-col items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors group">
                  <PlusIcon size={24} className="text-white" />
                </button>
                <span className="text-white text-xs font-medium mt-2">
                  Top Up
                </span>
              </div>
            </div>
          </div>

          {/* Go to Pantry Card - Updated to match new white with forest border design */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center max-w-sm mx-auto border-4 border-forest">
              <p className="text-forest text-sm mb-4 font-medium">
                <Drumstick size={20} className="text-forest" />
              </p>
              <div className="flex items-center justify-center mb-8">
                <h2 className="text-forest text-4xl font-bold">Pantry</h2>
              </div>
              <button className="flex flex-col items-center justify-center w-16 h-16 bg-forest bg-opacity-10 border-2 rounded-full hover:bg-forest hover:bg-opacity-20 transition-colors group mb-2">
                <ArrowRight size={24} className="text-forest" />
              </button>
              <span className="text-forest text-xs font-medium">
                Get some food
              </span>
            </div>
          </div>

          {/* Previous Orders Section */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Previous Orders
            </h2>
            <div className="space-y-4">
              {Array.from({ length: 1 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-green-100 bg-opacity-50 rounded-xl p-4 shadow-sm mb-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">
                          Order #{index + 1}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Delivered
                        </span>
                      </div>
                      <p className="flex text-gray-600 text-sm">
                        <Coins size={12} className="my-auto mr-2" />
                        {(23.5 + index * 15).toFixed(2)} •{' '}
                        {index === 0 ? '12 Aug, 14:30' : '08 Aug, 10:15'}
                      </p>
                    </div>
                    <ArrowRight className="text-forest" size={20} />
                  </div>
                  <div className="rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      {Array.from({ length: 3 }).map((_, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="flex-shrink-0 flex flex-col items-center"
                        >
                          <div className="w-16 h-16 bg-gray-200 rounded-lg mb-2"></div>
                          <span className="text-xs text-gray-700 text-center max-w-16 leading-tight">
                            Product {imgIndex + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other Info Section */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Other Info</h2>
            <div className="space-y-2">
              <div className="border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-t-lg">
                  <span className="font-medium text-blue-800">
                    Levenvale Farm Allocation, Shipping & Collection Policy
                  </span>
                </div>
              </div>
              <div className="border border-indigo-200 rounded-lg">
                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-t-lg">
                  <span className="font-medium text-indigo-800">
                    Contact Information
                  </span>
                </div>
              </div>
            </div>
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
