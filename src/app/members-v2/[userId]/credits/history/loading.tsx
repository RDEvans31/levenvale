import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { ArrowDown, ArrowUp } from 'lucide-react';

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Blurred Content */}
      <div className="blur-sm">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                  John Doe
                </h1>
                <p className="text-sm text-gray-600 mt-1 truncate">
                  Transaction History
                </p>
              </div>
            </div>
          </div>

          {/* Current Balance Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-sm">
            <div className="text-sm text-blue-600 font-medium">
              Current Balance
            </div>
            <div className="text-xl md:text-2xl font-bold text-blue-900 mt-1">
              156.50 tokens
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="p-4 md:p-6">
          {/* Desktop Table */}
          <div className="hidden md:block bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cash Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance After
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.from({ length: 10 }).map((_, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date().toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date().toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`flex items-center gap-1 text-sm font-medium ${index % 2 === 0 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {index % 2 === 0 ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        )}
                        {index % 2 === 0 ? 'Credit' : 'Debit'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {index % 2 === 0 ? 'Credit added' : 'Order payment'}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Ref: REF{index + 100}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-medium ${index % 2 === 0 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {index % 2 === 0 ? '+' : '-'}
                        {(25.5 + index * 3.25).toFixed(2)} tokens
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {index % 2 === 0
                          ? `£${(12.75 + index * 1.5).toFixed(2)}`
                          : '—'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {(156.5 - index * 5.25).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1 text-sm font-medium ${index % 2 === 0 ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {index % 2 === 0 ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )}
                      {index % 2 === 0 ? 'Credit' : 'Debit'}
                    </div>
                    <div
                      className={`text-sm font-medium ${index % 2 === 0 ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {index % 2 === 0 ? '+' : '-'}
                      {(25.5 + index * 3.25).toFixed(2)} tokens
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">
                      {new Date().toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-900 mb-2">
                  {index % 2 === 0 ? 'Credit added' : 'Order payment'}
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className="space-y-1">
                    {index % 2 === 0 && (
                      <div className="text-gray-600">
                        Cash: £{(12.75 + index * 1.5).toFixed(2)}
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      Ref: REF{index + 100}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Balance after</div>
                    <div className="font-medium text-gray-900">
                      {(156.5 - index * 5.25).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-700">
            Showing 10 transactions on this page
          </div>
        </div>
      </div>

      {/* Loading Spinner Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner />
          <p className="text-gray-600 font-medium">
            Loading transaction history...
          </p>
        </div>
      </div>
    </div>
  );
}
