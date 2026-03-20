'use client';

import { ChevronDown, Coins, Snowflake } from 'lucide-react';
import { useState } from 'react';

export default function DeliveryInfoCollapsible() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-green-50 rounded-lg border border-green-200 mt-4">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-green-100 transition-colors rounded-lg"
      >
        <h3 className="text-lg font-medium text-green-800">
          How do you get your food?
        </h3>
        <ChevronDown
          className={`text-green-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          size={20}
        />
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="border-t border-green-200">
          <div className="flex border-b border-green-200">
            <div className="flex-1 px-4 py-4">
              <div className="flex-1 px-4 py-2">
                <p className="text-sm font-bold mb-2 text-green-800">
                  Shipping
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  • Orders placed Thursday–Sunday before 2pm → shipped on Monday
                  via 24-hour courier
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  • Orders placed Monday–Wednesday before 2pm → shipped the next
                  day via 24-hour courier
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  If ordering milk or eggs, this may on occasions affect the day
                  we can ship your order due to our maximum daily amount and
                  only sending fresh on the day.
                </p>
                <p className="font-bold text-sm">
                  For more details on shipping and delivery please check
                  &apos;Shipping schedule&apos; on the Dashboard.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-b border-green-200">
            <div className="flex-1 px-4 py-4">
              <div className="flex-1 px-4 py-2">
                <p className="text-sm font-bold mb-2 text-green-800">Pickup</p>
                <p className="text-gray-600 text-sm flex items-center">
                  You&apos;re welcome 10am-2pm, Monday-Thursday
                </p>
              </div>
            </div>
          </div>
          <div className="flex py-4">
            <div className="flex-1 border-r border-green-200 px-4 py-2">
              <p className="text-sm font-medium flex items-center gap-2 text-green-800">
                Free Delivery on orders over
              </p>
              <p className="text-sm font-medium flex items-center text-green-800">
                <Coins size={24} className="mr-2" /> 200
              </p>
            </div>
            <div className="flex-1 px-4 py-2">
              <p className="text-sm font-medium flex items-center gap-2 text-green-800">
                All meat ships frozen
              </p>
              <p className="text-sm font-medium flex items-center text-green-800">
                <Snowflake size={24} />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
