import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="blur-sm">
        <div className="max-w-lg mx-auto px-4 py-6 pb-24">
          {/* Back button skeleton */}
          <div className="inline-flex items-center gap-2 text-gray-400 mb-6">
            <ArrowLeft size={20} />
            <span className="text-sm">Back to event</span>
          </div>

          {/* Tickets section skeleton */}
          <div className="mb-8">
            <div className="h-5 bg-gray-200 rounded w-32 mb-4" />

            {/* Product card skeletons */}
            {[1, 2].map(i => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 p-4 mb-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-40 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                  <div className="flex flex-col items-end ml-4">
                    <div className="h-4 bg-gray-200 rounded w-12 mb-2" />
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 bg-gray-200 rounded" />
                      <div className="h-5 w-4 bg-gray-200 rounded" />
                      <div className="h-5 w-5 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add-ons section skeleton */}
          <div className="mb-8">
            <div className="h-5 bg-gray-200 rounded w-24 mb-4" />

            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-32 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-48" />
                </div>
                <div className="flex flex-col items-end ml-4">
                  <div className="h-4 bg-gray-200 rounded w-12 mb-2" />
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-gray-200 rounded" />
                    <div className="h-5 w-4 bg-gray-200 rounded" />
                    <div className="h-5 w-5 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar skeleton */}
        <div className="fixed bottom-0 left-0 right-0 px-4 py-4 flex flex-col items-center">
          <div className="inline-flex items-center bg-white rounded-full shadow-lg border border-gray-100 p-1.5 pl-6">
            <div className="h-5 bg-gray-200 rounded w-12 mr-4" />
            <div className="h-12 bg-gray-200 rounded-full w-32" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20">
        <LoadingSpinner />
      </div>
    </div>
  );
}
