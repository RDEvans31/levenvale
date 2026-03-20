'use client';

import { OrderItem, OrderVariation } from '@/types/members/order';
import { Coins } from 'lucide-react';
import Image from 'next/image';

interface OrderItemCardProps {
  item: OrderItem;
}

const PLACEHOLDER_IMAGE = '/placeholder-product.jpg';

export default function OrderItemCard({ item }: OrderItemCardProps) {
  const formatVariationText = (variation: OrderVariation) => {
    if (variation.unitType && variation.amount) {
      return `${variation.amount}${variation.unitType}`;
    }
    return '';
  };

  const getQuantityText = () => {
    if (item.quantity > 1) {
      return `${item.quantity} pieces`;
    }
    return '1 piece';
  };

  return (
    <div className="bg-green-50 rounded-lg p-4 flex items-center gap-4">
      {/* Product Image */}
      <div className="w-16 h-16 relative flex-shrink-0">
        <Image
          src={
            item.product.images && item.product.images.length > 0
              ? item.product.images[0].url
              : PLACEHOLDER_IMAGE
          }
          alt={item.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
        <div className="text-sm text-gray-600">
          <p>
            {getQuantityText()} ({formatVariationText(item.variation)}) x
            {item.quantity}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-1 text-lg font-semibold text-gray-900">
        <Coins size={16} className="text-green-600" />
        <span>{(item.price * item.quantity).toFixed(2)}</span>
      </div>
    </div>
  );
}
