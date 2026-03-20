import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-white">
      <div className="blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="inline-flex items-center gap-2 text-gray-600 mb-6">
            <ArrowLeft size={20} />
            <span className="text-sm">Back to events</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Grid Skeleton */}
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-square bg-gray-200 rounded-tl-2xl" />
              <div className="aspect-square bg-gray-200 rounded-tr-2xl" />
              <div className="aspect-square bg-gray-200 rounded-bl-2xl" />
              <div className="aspect-square bg-gray-200 rounded-br-2xl" />
            </div>

            {/* Details Skeleton */}
            <div className="flex flex-col">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>

              <div className="mt-6 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-48" />
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-4 bg-gray-200 rounded w-40" />
              </div>

              <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="h-5 bg-gray-200 rounded w-48 mx-auto" />
                <div className="w-full mt-4 h-12 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20">
        <LoadingSpinner />
      </div>
    </div>
  );
}
