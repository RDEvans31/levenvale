import { ArrowLeft, Wallet } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white px-4 pt-4">
      {/* Back Button and Category Name */}
      <div className="flex items-center mb-6">
        <div className="p-2 bg-white rounded-full shadow">
          <ArrowLeft className="text-gray-300" size={24} />
        </div>
        <div className="ml-4 h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
        <div className="ml-2 h-5 bg-gray-300 rounded w-8 animate-pulse"></div>
        <div className="bg-black text-white py-4 px-6 rounded-full shadow-lg flex items-center justify-between hover:bg-gray-800 transition-colors ml-auto">
          <div className="flex items-center gap-2">
            <Wallet size={24} />
            <div className="h-6 bg-gray-600 rounded w-12 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4 pb-20">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="flex flex-col animate-pulse">
            {/* Product Image Skeleton */}
            <div className="relative h-40 w-full mb-2 bg-gray-300 rounded-lg"></div>

            {/* Product Info Skeleton */}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {/* Product Name */}
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>

                {/* Price */}
                <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>

                {/* Stock Status */}
                <div className="h-3 bg-gray-300 rounded w-16 mb-2"></div>

                {/* Variations Selector */}
                <div className="h-8 bg-gray-300 rounded w-full"></div>
              </div>

              {/* Add to Cart Button */}
              <div className="ml-2 p-2 bg-gray-300 rounded-full w-10 h-10 flex-shrink-0"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
