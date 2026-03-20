import LoadingSpinner from '@/components/shared/LoadingSpinner';
import {
  ArrowRight,
  CalendarHeart,
  Coins,
  Drumstick,
  PlusIcon,
  ScrollText,
  Send,
} from 'lucide-react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Blurred Content */}
      <div className="blur-sm">
        {/* Top navbar */}
        <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm">U</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center">
              <Image
                src="/levenvale-logo.png"
                alt="Levenvale Farm"
                width={32}
                height={32}
              />
            </div>
            <span className="font-semibold">Levenvale Farm</span>
          </div>
          <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm">
            Sign out
          </button>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Hi</h1>
          </div>

          <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Token Balance */}
            <div className="h-full">
              <div className="bg-gradient-to-br from-green-200 to-beige rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center border border-gray-100 relative overflow-hidden h-full">
                <div className="relative z-10 flex flex-col items-center w-full">
                  <p className="text-forest text-sm mb-4 font-medium">
                    Your Balance
                  </p>
                  <div className="flex items-center justify-center mb-8">
                    <Coins size={32} className="text-forest mr-3" />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="flex flex-col items-center justify-center w-16 h-16 bg-forest bg-opacity-10 rounded-full">
                        <PlusIcon size={24} className="text-forest" />
                      </div>
                      <span className="text-forest text-xs font-medium mt-2">
                        Top Up
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex flex-col items-center justify-center w-16 h-16 bg-forest bg-opacity-10 rounded-full">
                        <Send size={24} className="text-forest" />
                      </div>
                      <span className="text-forest text-xs font-medium mt-2">
                        Send
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex flex-col items-center justify-center w-16 h-16 bg-forest bg-opacity-10 rounded-full">
                        <ScrollText size={24} className="text-forest" />
                      </div>
                      <span className="text-forest text-xs font-medium mt-2">
                        History
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side 2x2 grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Pantry card */}
              <div className="aspect-square bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 p-4 text-forest">
                <Drumstick className="h-8 w-8" />
                <span className="text-lg font-semibold">Pantry</span>
                <div className="flex items-center justify-center w-10 h-10 bg-forest bg-opacity-10 rounded-full">
                  <ArrowRight size={20} className="text-forest" />
                </div>
              </div>

              {/* Events card */}
              <div className="aspect-square bg-beige rounded-2xl shadow-xl text-forest flex flex-col items-center justify-center gap-3 p-4">
                <CalendarHeart className="h-8 w-8" />
                <span className="text-lg font-semibold">Events</span>
                <div className="flex items-center justify-center w-10 h-10 bg-forest bg-opacity-10 rounded-full">
                  <ArrowRight size={20} className="text-forest" />
                </div>
              </div>

              {/* Previous Orders */}
              <div className="col-span-2 aspect-[2/1]">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-sm font-bold text-gray-900">
                      Previous Orders
                    </h2>
                    <div className="flex items-center justify-center px-2 bg-forest bg-opacity-10 rounded-full">
                      See more{' '}
                      <ArrowRight size={16} className="text-forest" />
                    </div>
                  </div>
                  <div className="flex-1 rounded-xl p-3 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-gray-900">
                          #0001
                        </span>
                        <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-green-100 text-green-800">
                          Order delivered
                        </span>
                      </div>
                    </div>
                    <p className="flex items-center text-gray-600 text-xs mb-3">
                      <Coins size={10} className="mr-1" />
                      23.50 • 12 Aug, 14:30
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                      <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                      <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                    </div>
                  </div>
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
