import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Blurred Content */}
      <div className="blur-sm">
        <div className="mx-auto max-w-sm px-10">
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg">
              <div className="rounded-xl mx-auto py-10 w-full">
                <div className="flex items-center bg-gray-100 rounded-lg py-4 focus-within:ring-2 focus-within:ring-black focus-within:ring-inset w-full">
                  <span className="text-base text-black mx-2">£</span>
                  <input
                    type="text"
                    placeholder="0.00"
                    value="25.00"
                    readOnly
                    className="w-1/2 max-w-sm bg-gray-100 border-none outline-none text-2xl font-medium text-black placeholder:text-gray-300 focus:ring-0 p-0"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    You have 156.50 Tokens.
                  </p>
                  <p className="text-sm text-green-500">+50.00 Tokens.</p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="bg-black text-white py-3 px-6 rounded-lg text-center font-medium">
                Top Up Tokens
              </div>
              <div className="flex flex-col text-center items-center justify-between mt-8 mb-8">
                <p className="text-xs text-gray-500">
                  *Please note: Tokens cannot be exchanged back to cash because
                  that would compromise the &apos;private&apos; nature of the
                  token system.
                </p>
                <p className="text-xs text-center text-gray-500 mt-2">
                  Should you need a refund for any reason, we&apos;re happy to
                  give you one in the form of more tokens that you can use in
                  our ecosystem :)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Spinner Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner />
          <p className="text-gray-600 font-medium">Loading credits...</p>
        </div>
      </div>
    </div>
  );
}
