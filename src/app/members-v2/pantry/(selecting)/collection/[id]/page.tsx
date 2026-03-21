import { getUserTokenBalance } from '@/actions/members/balance';
import { ProductCard } from '@/components/pantry-v2/CardProduct';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { auth } from '@/lib/auth';
import { LF_API_KEY, LF_API_URL } from '@/lib/little-farma/little-farma';
import { ProductDto } from '@/types/pantry/product';
import { ArrowLeft, Wallet } from 'lucide-react';
import Link from 'next/link';
import { getCollection } from './actions/actions';

interface ProductsResponse {
  products: ProductDto[];
}

async function getProductsByCollection(
  collectionId: string
): Promise<ProductDto[]> {
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
    throw new Error('Failed to fetch products');
  }

  const data: ProductsResponse = await res.json();
  return data.products;
}

export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  const userId = session?.user.id;
  const membershipId = session?.user.membershipId;

  const id = (await params).id;

  if (!userId || !membershipId) {
    return (
      <ErrorDisplay errorMsg="We couldn't find you in our database. Please contact Rob @ +447482400662 on WhatsApp" />
    );
  }

  const balanceResult = await getUserTokenBalance(membershipId);

  if (!balanceResult.success) {
    return (
      <ErrorDisplay errorMsg="We couldn't fetch your balance. Please contact Rob @ +447482400662 on WhatsApp" />
    );
  }

  const balance = balanceResult.value.balance;

  const [productResponse, collectionResponse] = await Promise.all([
    getProductsByCollection(id),
    getCollection(id),
  ]);

  const { collection } = collectionResponse;

  return (
    <div className="min-h-screen bg-white px-4 pt-4">
      {/* Back Button and Category Name */}
      <div className="flex items-center mb-6">
        <Link
          href="/members-v2/pantry"
          className="p-2 bg-white rounded-full shadow"
        >
          <ArrowLeft className="text-gray-700" size={24} />
        </Link>
        <h1 className="ml-4 text-xl font-semibold text-gray-900">
          {collection.name}
        </h1>
        <p>{collection.count}</p>
        <div className="bg-black text-white py-4 px-6 rounded-full shadow-lg flex items-center justify-between hover:bg-gray-800 transition-colors ml-auto">
          <div className="flex items-center gap-2">
            <Wallet size={24} />
            <span className="font-bold">{balance}</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4 pb-20">
        {productResponse.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
