import { LF_API_KEY, LF_API_URL } from '@/lib/little-farma/little-farma';
import { ProductDto } from '@/types/pantry/product';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from './CardProduct';

interface CollectionDto {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  organisationId: string;
  count: number;
}

interface CollectionDisplayProps {
  collection: CollectionDto;
}

interface ProductsResponse {
  products: ProductDto[];
}

async function getCollectionProducts(
  collectionId: string
): Promise<ProductDto[]> {
  try {
    const res = await fetch(
      `${LF_API_URL}/products?collectionId=${collectionId}`,
      {
        headers: {
          Authorization: `Bearer ${LF_API_KEY}`,
        },
        cache: 'no-store', // Always fetch fresh stock data
      }
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch products for collection ${collectionId}:`,
        res.status
      );
      return [];
    }

    const data: ProductsResponse = await res.json();
    // Take the first 6 products for horizontal scroll
    return data.products.slice(0, 6);
  } catch (error) {
    console.error(
      `Error fetching products for collection ${collectionId}:`,
      error
    );
    return [];
  }
}

export async function CollectionDisplay({
  collection,
}: CollectionDisplayProps) {
  const products = await getCollectionProducts(collection.id);

  if (products.length === 0) {
    return null; // Don't show empty collections
  }

  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{collection.name}</h2>
        <Link
          href={`/members-v2/pantry/collection/${collection.id}`}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <ArrowRight size={20} />
        </Link>
      </div>

      {/* Products Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto md:scrollbar-hidden pb-2">
        {products.map(product => (
          <div key={product.id} className="flex-shrink-0 w-48">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Show more link if there are more products */}
      {collection.count > 6 && (
        <div className="mt-4 text-center">
          <Link
            href={`/members-v2/pantry/collection/${collection.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View all {collection.count} products
          </Link>
        </div>
      )}
    </div>
  );
}
