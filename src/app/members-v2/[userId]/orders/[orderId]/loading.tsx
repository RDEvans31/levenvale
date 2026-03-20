import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { ArrowLeft, Coins, Download } from 'lucide-react';
import Image from 'next/image';

export default function OrderDetailsLoading() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Blurred Content */}
      <div className="blur-sm">
        {/* Top navbar */}
        <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <ArrowLeft className="text-gray-600" size={24} />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-forest rounded-md flex items-center justify-center">
                <Image
                  src="/levenvale-logo.png"
                  alt="Levenvale Farm"
                  width={32}
                  height={32}
                />
              </div>
              <span className="font-semibold">Levenvale Farm</span>
            </div>
          </div>
          <div className="h-8 bg-gray-300 rounded w-16 animate-pulse"></div>
        </div>

        {/* Main content */}
        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Order summary
              </h1>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  Processing
                </span>
                <span className="text-gray-600 text-sm">14 Aug, 2025</span>
              </div>
            </div>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Download size={20} />
              <span>Download invoice</span>
            </button>
          </div>

          <p className="text-gray-600 mb-6">3 items in this order</p>

          {/* Order Items */}
          <div className="space-y-4 mb-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-green-50 rounded-lg p-4 flex items-center gap-4"
              >
                {/* Product Image */}
                <div className="w-16 h-16 relative flex-shrink-0 bg-gray-200 animate-pulse rounded-lg"></div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Product Name
                  </h3>
                  <div className="text-sm text-gray-600">
                    <p>1 piece (250g) x1</p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-1 text-lg font-semibold text-gray-900">
                  <Coins size={16} className="text-green-600" />
                  <span>12.50</span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Details */}
          <div className="bg-green-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order details
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items total</span>
                <div className="flex items-center gap-1">
                  <Coins size={16} className="text-green-600" />
                  <span>37.50</span>
                </div>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Processing Fee</span>
                <div className="flex items-center gap-1">
                  <Coins size={16} className="text-green-600" />
                  <span>0.08</span>
                </div>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <div className="flex items-center gap-1">
                  <Coins size={16} className="text-green-600" />
                  <span>19.00</span>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between font-semibold text-gray-900">
                <span>Order total</span>
                <div className="flex items-center gap-1">
                  <Coins size={16} className="text-green-600" />
                  <span>56.58</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">
                Delivery Address
              </h3>
              <div className="text-gray-600 text-sm">
                <p>John Smith</p>
                <p>123 Main Street</p>
                <p>London, England SW1A 1AA</p>
                <p>United Kingdom</p>
                <p>+44 7700 900123</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order ID</span>
                <span className="font-mono text-sm text-gray-900">
                  ORD12345
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Spinner Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner />
          <p className="text-gray-600 font-medium">Loading order details...</p>
        </div>
      </div>
    </div>
  );
}
