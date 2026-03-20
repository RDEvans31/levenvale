import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { ArrowLeft, Wallet } from 'lucide-react';

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-[#F5F5F5]">
      <div className="blur-sm">
        <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50 mx-4">
          <button className="p-2 bg-white rounded-full shadow">
            <div className="text-black flex">
              <ArrowLeft size={24} />
              <span className="hidden sm:inline">Back to Events</span>
            </div>
          </button>

          <div className="bg-black text-white py-4 px-6 rounded-full shadow-lg flex items-center gap-2 ml-auto">
            <Wallet size={24} />
            <span className="font-bold">--</span>
          </div>
        </div>

        <div className="pt-24 px-4 pb-20">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-black">Your Bookings</h1>
          </div>

          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-100 rounded w-1/2 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20">
        <LoadingSpinner />
      </div>
    </div>
  );
}
