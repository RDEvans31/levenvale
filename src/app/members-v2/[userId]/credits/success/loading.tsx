import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { CheckCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-emerald-100 to-emerald-700">
      {/* Blurred Content */}
      <div className="blur-sm px-4 py-8">
        <div className="max-w-md mx-auto space-y-8">
          {/* Success Icon */}
          <div className="text-center pt-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              You&apos;re good to go!
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="px-4">
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">
                  Balance
                </span>
                <span className="text-lg font-bold text-gray-900">
                  206.50 Tokens
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your total contributions
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every contribution goes towards
              <br />
              building the food security you deserve
            </p>

            <div className="mt-6 mb-6">
              <div className="bg-slate-700 rounded-lg p-6">
                <div className="text-center mb-4">
                  <h3 className="text-white font-semibold">
                    Total Contributions
                  </h3>
                  <p className="text-slate-300 text-xs">
                    Your token purchases over time
                  </p>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-white text-xs">Tokens</p>
                    <p className="text-white text-lg font-bold">328.08</p>
                  </div>
                  <div>
                    <p className="text-slate-300 text-xs">£ Contributed</p>
                    <p className="text-white text-lg font-bold">£164.04</p>
                  </div>
                </div>
                <div className="h-20 relative">
                  <div className="absolute bottom-0 left-0 text-slate-300 text-xs">
                    0
                  </div>
                  <div className="absolute bottom-2 left-0 text-slate-300 text-xs">
                    85
                  </div>
                  <div className="absolute bottom-4 left-0 text-slate-300 text-xs">
                    170
                  </div>
                  <div className="absolute bottom-6 left-0 text-slate-300 text-xs">
                    255
                  </div>
                  <div className="absolute bottom-8 left-0 text-slate-300 text-xs">
                    340
                  </div>
                  <div className="absolute bottom-0 left-8 text-slate-300 text-xs">
                    Jun 5
                  </div>
                  <div className="absolute bottom-0 right-0 text-slate-300 text-xs">
                    Aug 14
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="px-4">
            <div className="w-full bg-gray-900 text-white font-semibold py-4 rounded-lg text-center">
              Access the pantry now
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
