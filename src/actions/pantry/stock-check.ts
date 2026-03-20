'use server';

import { LF_API_KEY, LF_API_URL } from '@/lib/little-farma/little-farma';
import { CartItem } from '@/store/types';
import { Result } from '@/types/result';

interface StockUpdate {
  id: string;
  stock: number;
  stockStatus: 'instock' | 'outofstock' | 'onbackorder';
  manageStock: boolean;
}

export const checkCartStock = async (
  items: CartItem[]
): Promise<Result<StockUpdate[]>> => {
  try {
    if (!items || items.length === 0) {
      return { success: true, value: [] };
    }

    if (!LF_API_URL || !LF_API_KEY) {
      return {
        success: false,
        error: 'Little Farma API configuration missing',
      };
    }

    // Extract variation IDs from cart items
    const variationIds = items.map(item => item.id.toString());

    // Call Little Farma stock-check API
    const response = await fetch(`${LF_API_URL}/stock-check`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ variationIds }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Stock check failed with status: ${response.status}`,
      };
    }

    const stockData = await response.json();

    if (!stockData.variations || !Array.isArray(stockData.variations)) {
      return {
        success: false,
        error: 'Invalid response format from stock check API',
      };
    }

    // Transform to cart-compatible format
    const stockUpdates: StockUpdate[] = stockData.variations.map(
      (variation: any) => ({
        id: variation.id,
        stock: variation.stockQuantity,
        stockStatus:
          variation.stockQuantity > 0 || variation.product.backorderAllowed
            ? 'instock'
            : 'outofstock',
        manageStock: !variation.product.backorderAllowed,
      })
    );

    return { success: true, value: stockUpdates };
  } catch (error) {
    console.error('Stock check error:', error);
    return {
      success: false,
      error: 'Failed to check stock availability. Please try again.',
    };
  }
};
