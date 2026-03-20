export default function PreviousOrdersSkeleton() {
  return (
    <div className="col-span-1 md:col-span-2">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Previous Orders</h2>
      <div className="space-y-4">
        {/* Skeleton for 3 order cards */}
        {Array.from({ length: 1 }).map((_, index) => (
          <div
            key={index}
            className="bg-green-100 bg-opacity-50 rounded-xl p-4 shadow-sm animate-pulse"
          >
            {/* Header skeleton */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-5 w-16 bg-gray-200 rounded"></div>
                  <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
            </div>

            {/* Product images skeleton */}
            <div className="rounded-lg p-4">
              <div className="flex items-start gap-4">
                {Array.from({ length: 3 }).map((_, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="flex-shrink-0 flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mb-2"></div>
                    <div className="h-3 w-12 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
