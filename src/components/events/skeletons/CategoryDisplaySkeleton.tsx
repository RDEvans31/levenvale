export function CategoryDisplaySkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 mb-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-gray-300 rounded w-48"></div>
        <div className="h-5 w-5 bg-gray-300 rounded"></div>
      </div>

      <div className="flex gap-4 overflow-x-auto md:scrollbar-hidden pb-2">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex-shrink-0 w-48">
            <div className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-40 w-full bg-gray-300"></div>
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-300 rounded w-24"></div>
                  <div className="h-3 bg-gray-300 rounded w-32"></div>
                  <div className="h-3 bg-gray-300 rounded w-28"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
      </div>
    </div>
  );
}
