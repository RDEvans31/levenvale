export function CollectionDisplaySkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 mb-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-gray-300 rounded w-48"></div>
        <div className="h-5 w-5 bg-gray-300 rounded"></div>
      </div>

      {/* Products Horizontal Scroll Skeleton */}
      <div className="flex gap-4 overflow-x-auto md:scrollbar-hidden pb-2">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex-shrink-0 w-48">
            <div className="flex flex-col">
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
          </div>
        ))}
      </div>

      {/* "View all" link skeleton */}
      <div className="mt-4 text-center">
        <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
      </div>
    </div>
  );
}
