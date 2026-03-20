'use client';

import { useCartStore } from '@/store';
import { ProductDto } from '@/types/pantry/product';
import { Check, Coins, Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProductModalProps {
  product: ProductDto;
  isOpen: boolean;
  onClose: () => void;
}

const PLACEHOLDER_IMAGE = '/placeholder-product.svg';

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const cartStore = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  const findFirstVariationInStock = () => {
    if (product.backorderAllowed) {
      return product.variations[0];
    }
    return product.variations.filter(v => v.stockQuantity > 0)[0];
  };

  const [selectedVariation, setSelectedVariation] = useState<
    ProductDto['variations'][0]
  >(findFirstVariationInStock());

  const [quantity, setQuantity] = useState(1);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedVariation(product.variations[0]);
      setQuantity(1);
    }
  }, [isOpen, product.variations]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const displayPrice = selectedVariation?.value || 0;

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

  const discountedPrice = calculateDiscountedPrice(displayPrice);
  const productOnDiscount =
    product.discounts.length > 0 && discountedPrice < displayPrice;

  const handleAddToCart = async () => {
    setIsAdding(true);
    const productImage = product.images?.[0]?.url;

    for (let i = 0; i < quantity; i++) {
      await cartStore.addItem({
        id: selectedVariation?.id || product.id,
        parentId: selectedVariation ? product.id : undefined,
        name: product.name,
        price: productOnDiscount ? discountedPrice : displayPrice,
        amount: selectedVariation.amount,
        unitType: selectedVariation.unitType,
        image: productImage || PLACEHOLDER_IMAGE,
        originalPrice: displayPrice,
        currentStock: selectedVariation?.stockQuantity ?? null,
        stockStatus: 'instock',
        manageStock: !product.backorderAllowed,
      });
    }

    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 1000);
  };

  const checkIfInStock = () => {
    if (product.backorderAllowed) {
      return true;
    }
    if (selectedVariation) {
      return selectedVariation.stockQuantity > 0;
    }
    return product.variations.some(v => v.stockQuantity > 0);
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

  const stockDisplayText = (variation: ProductDto['variations'][0]): string => {
    if (product.backorderAllowed) {
      return '';
    } else {
      return `(${checkLiveStock(variation)} left)`;
    }
  };

  const isInStock = checkIfInStock();
  const displayImage = product.images?.[0]?.url || PLACEHOLDER_IMAGE;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 bg-white z-50 overflow-y-auto ${isOpen ? 'animate-slide-up' : 'animate-slide-down'}`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Product Image */}
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={displayImage}
            alt={product.images?.[0]?.altText || product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="p-6 mb-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            {productOnDiscount && (
              <span className="inline-flex items-center gap-1 line-through text-gray-500">
                <Coins size={18} /> {displayPrice.toFixed(2)}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-2xl font-bold">
              <Coins size={24} />
              {productOnDiscount
                ? discountedPrice.toFixed(2)
                : displayPrice.toFixed(2)}
            </span>
          </div>
          {/* Discounts Display */}
          {product.discounts.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Special Offers</h2>
              {product.discounts.map(discount => (
                <div
                  key={discount.id}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-2"
                >
                  <p className="font-medium text-yellow-800">
                    {discount.discount.name}
                  </p>
                  {discount.discount.description && (
                    <p className="text-sm text-yellow-700">
                      {discount.discount.description}
                    </p>
                  )}
                  <p className="text-sm text-yellow-600">
                    {discount.discount.discountType === 'PERCENTAGE'
                      ? `${discount.discount.value}% off`
                      : `${discount.discount.value} tokens off`}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <div
                className="text-gray-600 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
          {/* Collections Display */}
          {product.collections.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Collections</h2>
              <div className="flex flex-wrap gap-2">
                {product.collections.map(collection => (
                  <span
                    key={collection.id}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {collection.collection.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Variations Selector */}
          {product.variations && product.variations.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options
              </label>
              <select
                className="w-full text-sm border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={selectedVariation?.id || ''}
                onChange={e => {
                  const variation = product.variations?.find(
                    v => v.id === e.target.value
                  );
                  setSelectedVariation(variation || product.variations[0]);
                }}
              >
                {product.variations?.map(variation => (
                  <option key={variation.id} value={variation.id}>
                    {variation.amount} {variation.unitType}{' '}
                    {stockDisplayText(variation)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Quantity</h2>
            <div className="flex items-center gap-4">
              {quantity > 1 && (
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus size={20} />
                </button>
              )}
              <span className="text-xl font-semibold min-w-[3ch] text-center">
                {quantity}
              </span>
              {(quantity < selectedVariation?.stockQuantity ||
                product.backorderAllowed) && (
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={
                    quantity >= selectedVariation?.stockQuantity &&
                    !product.backorderAllowed
                  }
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Plus size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mb-6">
            <button
              onClick={handleAddToCart}
              disabled={!isInStock || isAdding}
              className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-200 ${
                isInStock && !isAdding
                  ? 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white'
                  : 'bg-gray-400 cursor-not-allowed text-white'
              } ${isAdding ? 'scale-95' : ''}`}
            >
              {isAdding ? (
                <span className="flex items-center justify-center gap-2">
                  <Check size={20} className="text-white" />
                  Added to basket
                </span>
              ) : (
                `Add ${quantity} to basket`
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
