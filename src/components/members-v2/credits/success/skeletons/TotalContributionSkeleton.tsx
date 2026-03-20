export default function TotalContributionSkeleton() {
  return (
    <div className="rounded-lg bg-ebony/70 text-white animate-pulse">
      <div className="flex flex-col items-stretch border-b border-gray-700 sm:flex-row">
        {/* Header section */}
        <div className="flex flex-1 flex-col mx-auto justify-center gap-1 px-6 py-4 sm:py-6">
          <div className="h-6 bg-gray-600 rounded w-40 mb-2 mx-auto"></div>
          <div className="h-4 bg-gray-700 rounded w-48 mx-auto"></div>
        </div>

        {/* Tabs section */}
        <div className="flex">
          {['tokens', 'pounds'].map(key => (
            <div
              key={key}
              className="flex flex-1 flex-col justify-center gap-1 border-t border-gray-700 px-6 py-4 sm:border-t-0 sm:border-l sm:border-gray-700 sm:px-8 sm:py-6"
            >
              <div className="h-3 bg-gray-700 rounded w-12 mb-2"></div>
              <div className="h-6 bg-gray-600 rounded w-16 sm:h-8 sm:w-20"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart section with loading spinner */}
      <div className="px-2 py-4 sm:p-6">
        <div className="h-[180px] w-full flex items-center justify-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-300 border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
