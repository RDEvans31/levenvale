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
    <Link
      href={`/members-v2/${userId}/orders/${order.id}`}
      className="flex-1 rounded-xl p-3 hover:bg-gray-50 transition-colors cursor-pointer flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-gray-900">
            #{orderNumber}
          </span>
          <span
            className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full ${getStatusColor(order.status)}`}
          >
            {getStatusText(order.status)}
          </span>
        </div>
        <ArrowRight className="text-forest flex-shrink-0" size={16} />
      </div>
      <p className="flex items-center text-gray-600 text-xs mb-3">
        <Coins size={10} className="mr-1" />
        {order.total.toFixed(2)} • {formatDate(order.createdAt)}
        {order.orderItems.length > 1 && ` • ${order.orderItems.length} items`}
      </p>

      {/* Product thumbnails */}
      <div className="flex items-center gap-2 mt-auto">
        {visibleItems.map(item => (
          <div key={item.id} className="w-12 h-12 relative flex-shrink-0">
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
        ))}
        {remainingCount > 0 && (
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
            <span className="text-gray-500 text-xs font-medium">
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
