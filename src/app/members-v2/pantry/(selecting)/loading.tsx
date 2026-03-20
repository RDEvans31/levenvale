import LoadingSpinner from '@/components/shared/LoadingSpinner';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Coins,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Blurred Content */}
      <div className="blur-sm">
        {/* Top Navigation */}
        <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50">
          <button className="p-2 bg-white rounded-full shadow">
            <ArrowLeft size={20} />
          </button>
          <div className="bg-black text-white py-2 px-4 rounded-full shadow-lg flex items-center gap-2">
            <Coins size={20} />
            <span className="font-bold">65.23</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-48 w-full">
          <Image
            src="/home/levenvale-hero-mobile.jpg"
            alt="Levenvale Farm"
            fill
            className="object-cover"
          />

          {/* Overlapping Logo */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-white p-2 shadow-lg">
              <Image
                src="/levenvale-logo.png"
                alt="Levenvale Farm"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Farm Info */}
        <div className="pt-16 text-center px-4">
          <h1 className="text-2xl font-bold mb-2">Levenvale Farm</h1>
          <div className="flex items-center justify-center text-green-700 font-medium">
            <MapPin size={16} className="mr-1" />
            Somerset, UK • TA3 6FH
          </div>
        </div>

        {/* How do you get your food section */}
        <div className="px-4 mt-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">How do you get your food?</span>
              <ChevronDown size={20} className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Collection Sections */}
        <div className="mt-6 px-4 pb-20">
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Beef</h2>
              <ArrowRight size={20} className="text-blue-600" />
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <h3 className="font-medium">Beef Bone Broth</h3>
                <p className="text-xs text-gray-600">
                  Slow-simmered from grass-fed bones
                </p>
                <div className="flex items-center gap-1">
                  <Coins size={12} />
                  <span className="font-semibold">14.00</span>
                </div>
                <p className="text-xs text-green-600">In Stock</p>
                <select className="w-full text-xs border rounded p-1">
                  <option>750ml (46 left)</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <h3 className="font-medium">Beef Mince</h3>
                <p className="text-xs text-gray-600">
                  Our 100% grass-fed beef mince
                </p>
                <div className="flex items-center gap-1">
                  <Coins size={12} />
                  <span className="font-semibold">14.00</span>
                </div>
                <p className="text-xs text-green-600">In Stock</p>
                <select className="w-full text-xs border rounded p-1">
                  <option>500g (26 left)</option>
                </select>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button className="text-blue-600 font-medium text-sm">
                View all 24 products
              </button>
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
