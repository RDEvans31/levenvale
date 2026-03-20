import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { ArrowLeft, Coins } from 'lucide-react';

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Blurred Content */}
      <div className="blur-sm">
        {/* Header */}
        <div className="flex items-center gap-2 p-4 border-b">
          <ArrowLeft className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Checkout</h1>
        </div>

        <div className="max-w-4xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Details Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value="John Smith"
                      readOnly
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value="+44 7123 456789"
                      readOnly
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      value="123 Sample Street, London, SW1 2AB"
                      readOnly
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 h-24"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="border rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                        <div>
                          <p className="font-medium">Sample Product</p>
                          <p className="text-sm text-gray-600">Qty: 2</p>
                        </div>
                      </div>
                      <span className="font-medium">25.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                        <div>
                          <p className="font-medium">Another Product</p>
                          <p className="text-sm text-gray-600">Qty: 1</p>
                        </div>
                      </div>
                      <span className="font-medium">17.50</span>
                    </div>
                  </div>

                  <div className="border-t mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>42.50 tokens</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery</span>
                      <span>19.00 tokens</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service fee</span>
                      <span>0.85 tokens</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <div className="flex items-center gap-1">
                        <Coins className="w-5 h-5" />
                        <span>62.35</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-black text-white py-3 rounded-lg font-medium mt-6">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Spinner Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner />
          <p className="text-gray-600 font-medium">Loading checkout...</p>
        </div>
      </div>
    </div>
  );
}
