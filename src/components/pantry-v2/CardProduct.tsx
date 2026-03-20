'use client';

import { useCartStore } from '@/store';
import { ProductDto } from '@/types/pantry/product';
import { Check, Coins, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { ProductModal } from './ProductModal';

interface ProductCardProps {
  product: ProductDto;
}

const PLACEHOLDER_IMAGE = '/placeholder-product.svg'; // Updated to use SVG

export function ProductCard({ product }: ProductCardProps) {
  const cartStore = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const findFirstVariationInStock = () => {
    if (product.backorderAllowed) {
      return product.variations[0];
    }
    return product.variations.filter(v => v.stockQuantity > 0)[0];
  };

  const [selectedVariation, setSelectedVariation] = useState<
    ProductDto['variations'][0] | null
  >(findFirstVariationInStock());

  // Calculate discounted price if there are active discounts
  const calculateDiscountedPrice = (originalPrice: number) => {
    if (product.discounts.length === 0) return originalPrice;

    const activeDiscount = product.discounts[0]?.discount;
    if (!activeDiscount) return originalPrice;

    if (activeDiscount.discountType === 'PERCENTAGE') {
      return originalPrice * (1 - activeDiscount.value / 100);
    } else if (activeDiscount.discountType === 'FIXED') {
      return Math.max(0, originalPrice - activeDiscount.value);
    }

    return originalPrice;
  };

  const displayPrice = selectedVariation?.value || 0;

  const discountedPrice = calculateDiscountedPrice(displayPrice);

  const productOnDiscount =
    product.discounts.length > 0 && discountedPrice < displayPrice;

  const handleAddToCart = async () => {
    setIsAdding(true);
    const productImage = product.images?.[0]?.url;
    const productValue = productOnDiscount ? discountedPrice : displayPrice;
    await cartStore.addItem({
      id: selectedVariation?.id || product.id,
      parentId: selectedVariation ? product.id : undefined,
      name: product.name,
      price: productValue,
      amount: selectedVariation?.amount ?? 0,
      unitType: selectedVariation?.unitType ?? '',
      image: productImage || PLACEHOLDER_IMAGE,
      originalPrice: selectedVariation?.value || 0,
      currentStock: selectedVariation?.stockQuantity ?? null,
      stockStatus: 'instock',
      manageStock: !product.backorderAllowed,
    });

    setTimeout(() => setIsAdding(false), 500);
  };

  const checkLiveStock = (variation: ProductDto['variations'][0]): number => {
    if (variation.id === selectedVariation?.id) {
      const itemInCart = cartStore.items.find(item => item.id === variation.id);
      if (itemInCart) {
        const currentStock = variation.stockQuantity;
        const stockInCart = itemInCart.quantity;
        return currentStock - stockInCart;
      } else {
        return variation.stockQuantity;
      }
    } else {
      return variation.stockQuantity;
    }
  };

  const checkIfInStock = () => {
    if (product.backorderAllowed) {
      return true;
    }
    if (selectedVariation) {
      return checkLiveStock(selectedVariation) > 0;
    }
    return product.variations.some(v => v.stockQuantity > 0);
  };

  const stockDisplayText = (variation: ProductDto['variations'][0]): string => {
    if (product.backorderAllowed) {
      return '';
    } else {
      return `(${checkLiveStock(variation)} left)`;
    }
  };

  const isInStock = checkIfInStock();

  const displayImage = product.images?.[0]?.url || PLACEHOLDER_IMAGE;

  return (
    <>
      <div className="flex flex-col">
        <div
          className="relative h-40 w-full mb-2 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={displayImage}
            alt={product.images?.[0]?.altText || product.name}
            fill
            className="object-cover rounded-lg hover:opacity-90 transition-opacity"
          />
          {productOnDiscount && (
            <div className="absolute top-0 left-0 right-0 isolate flex items-center gap-x-6 overflow-hidden bg-green-500 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 rounded-t-lg">
              <div
                className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                aria-hidden="true"
              >
                <div className="aspect-[577/310] w-[36.0625rem] bg-green-300 opacity-30"></div>
              </div>
              <div
                className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                aria-hidden="true"
              >
                <div className="aspect-[577/310] w-[36.0625rem] bg-green-500 opacity-30"></div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-sm text-gray-900">
                  <strong className="font-semibold">Special Offer</strong>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900 text-sm">
              {product.name}
            </h3>
            {product.description && (
              <div className="flex items-center gap-1 mt-1">
                <p className="text-gray-600 text-xs">
                  {product.description.replace(/<[^>]*>/g, '').slice(0, 20)}
                  {product.description.replace(/<[^>]*>/g, '').length > 20
                    ? '...'
                    : ''}
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-blue-600 text-xs hover:underline flex-shrink-0"
                >
                  more
                </button>
              </div>
            )}
            <p className="text-gray-900 font-bold mt-1">
              {productOnDiscount && (
                <span className="inline-flex items-center gap-1 text-gray-400 line-through mr-2">
                  <Coins size={15} /> {displayPrice.toFixed(2)}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Coins size={15} />{' '}
                {productOnDiscount
                  ? discountedPrice.toFixed(2)
                  : displayPrice.toFixed(2)}
              </span>
            </p>
            {isInStock ? (
              <p className="text-green-600 text-xs font-medium">In Stock</p>
            ) : (
              <p className="text-red-600 text-xs font-medium">Out of Stock</p>
            )}

            {/* Variations Selector */}
            {product.variations && product.variations.length > 0 && (
              <select
                className="mt-2 text-sm border rounded p-1"
                value={selectedVariation?.id || ''}
                onChange={e => {
                  const variation = product.variations?.find(
                    v => v.id === e.target.value
                  );
                  setSelectedVariation(variation || null);
                }}
              >
                {product.variations?.map(variation => (
                  <option key={variation.id} value={variation.id}>
                    {`${variation.amount}${variation.unitType} ${stockDisplayText(variation)}`}
                  </option>
                ))}
              </select>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!isInStock || isAdding}
            className={`p-2 bg-white shadow rounded-full flex-shrink-0 hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              isAdding ? 'scale-90 rotate-12 bg-green-50' : ''
            }`}
            aria-label="Add to cart"
          >
            {isAdding ? (
              <Check size={20} className="text-green-600" />
            ) : (
              <Plus size={20} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
