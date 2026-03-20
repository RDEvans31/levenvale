import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Send } from 'lucide-react';

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-blue-700 px-4 py-8">
      {/* Blurred Content Preview */}
      <div className="blur-sm">
        <div className="max-w-md mx-auto space-y-8">
          {/* Success Icon */}
          <div className="text-center pt-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Transfer complete!
            </h1>
            <p className="text-gray-700 text-lg">
              You sent 25.00 tokens to Sarah
            </p>
          </div>

          {/* Transfer Details Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mx-4">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Transfer Details
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between items-center">
                    <span>Sent to:</span>
                    <span className="font-medium text-gray-900">
                      Sarah Johnson
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Amount:</span>
                    <span className="font-medium text-gray-900">
                      25.00 tokens
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2 mt-3">
                    <span>Your new balance:</span>
                    <span className="font-bold text-green-600">
                      75.50 tokens
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Encouragement Message */}
          <div className="text-center mb-6 px-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Thank you for sharing!
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Your generosity helps build a stronger
              <br />
              community and food security for everyone
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="px-4 space-y-3">
            <div className="w-full bg-gray-900 text-white font-semibold py-4 rounded-lg text-center">
              Access the pantry now
            </div>

            <div className="w-full bg-white text-gray-900 font-semibold py-4 rounded-lg text-center border border-gray-200">
              Back to dashboard
            </div>
          </div>
        </div>
      </div>

      {/* Loading Spinner Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner />
          <p className="text-gray-700 font-medium">
            Loading transfer details...
          </p>
        </div>
      </div>
    </div>
  );
}
