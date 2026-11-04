import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { ArrowLeft, ArrowRight, Calendar, Coins, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="blur-sm">
        <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50">
          <button className="p-2 bg-white rounded-full shadow">
            <ArrowLeft size={20} />
          </button>
          <div className="bg-brand-black text-brand-white py-2 px-4 rounded-full shadow-lg flex items-center gap-2">
            <Coins size={20} />
            <span className="font-bold">65.23</span>
          </div>
        </div>

        <div className="relative h-48 w-full">
          <Image
            src="/home/levenvale-hero-mobile.jpg"
            alt="Levenvale Farm"
            fill
            className="object-cover"
          />

          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-white p-2">
              <Image
                src="/brand/levenvale-emblem.svg"
                alt="Levenvale Farm"
                width={80}
                height={80}
              />
            </div>
          </div>
        </div>

        <div className="pt-16 text-center px-4">
          <h1 className="text-2xl font-bold mb-2">Events</h1>
          <div className="flex items-center justify-center text-brand-black font-medium">
            <MapPin size={16} className="mr-1" />
            Bellingen, NSW • 2454
          </div>
        </div>

        <div className="mt-6 px-4 pb-20">
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Farm Tours</h2>
              <ArrowRight size={20} className="text-brand-black" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <h3 className="font-medium">Sunday Farm Tour</h3>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Calendar size={12} />
                  <span>Sat, 15 Mar</span>
                </div>
                <div className="flex items-center gap-1">
                  <Coins size={12} />
                  <span className="font-semibold">10.00</span>
                  <span className="text-xs text-gray-500">deposit</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <h3 className="font-medium">Workshop: Butchery</h3>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Calendar size={12} />
                  <span>Sun, 22 Mar</span>
                </div>
                <div className="flex items-center gap-1">
                  <Coins size={12} />
                  <span className="font-semibold">25.00</span>
                  <span className="text-xs text-gray-500">deposit</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button className="text-brand-black font-medium text-sm">
                View all 8 events
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner />
        </div>
      </div>
    </div>
  );
}
