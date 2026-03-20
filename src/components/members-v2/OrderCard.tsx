'use client';

import { Order } from '@/types/members/order';
import { ArrowRight, Coins } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface OrderCardProps {
  order: Order;
  orderNumber: string;
  userId: string;
}

const PLACEHOLDER_IMAGE = '/placeholder-product.svg';

export default function OrderCard({
  order,
  orderNumber,
  userId,
}: OrderCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'Processing';
      case 'completed':
        return 'Order delivered';
      case 'delivered':
        return 'Order delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const visibleItems = order.orderItems.slice(0, 3);
  const remainingCount = order.orderItems.length - 3;

  return (
    <Link href={`/members-v2/${userId}/orders/${order.id}`}>
      <div className="bg-green-100 bg-opacity-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer mb-4 border-2 border-green-100">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-900">
                Order #{orderNumber}
              </span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusText(order.status)}
              </span>
            </div>
            <p className="flex -gray-600 text-sm">
              <Coins size={12} className="my-auto mr-2" />{' '}
              {order.total.toFixed(2)} • {formatDate(order.createdAt)}
            </p>
          </div>
          <ArrowRight className="text-forest" size={20} />
        </div>

        {/* Product Images */}
        <div className="rounded-lg p-4">
          <div className="flex items-start gap-4">
            {visibleItems.map(item => (
              <div
                key={item.id}
                className="flex-shrink-0 flex flex-col items-center"
              >
                <div className="w-16 h-16 relative mb-2">
                  <Image
                    src={
                      item.product?.images && item.product.images.length > 0
                        ? item.product.images[0].url
                        : PLACEHOLDER_IMAGE
                    }
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <span className="text-xs text-gray-700 text-center max-w-16 leading-tight">
                  {item.name}
                </span>
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-lg border-2 border-dashed border-gray-300 mb-2">
                  <span className="text-gray-600 font-medium">
                    +{remainingCount}
                  </span>
                </div>
                <span className="text-xs text-gray-700 text-center max-w-16 leading-tight">
                  more items
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
