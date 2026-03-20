import { getUserTokenBalance } from '@/actions/members/balance';
import { CollectionDisplay } from '@/components/pantry-v2/CollectionDisplay';
import DeliveryInfoCollapsible from '@/components/pantry-v2/DeliveryInfoCollapsible';
import { CollectionDisplaySkeleton } from '@/components/pantry-v2/skeletons/CollectionDisplaySkeleton';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { auth } from '@/lib/auth';
import { LF_API_KEY, LF_API_URL } from '@/lib/little-farma/little-farma';
import { ROLES, hasMinimumRole } from '@/lib/roles';
import { ArrowLeft, MapPinCheck, Wallet } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

interface CollectionDto {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  organisationId: string;
  count: number;
}

interface CollectionsResponse {
  collections: CollectionDto[];
}

async function getCollectionsFromLf(): Promise<CollectionDto[]> {
  const res = await fetch(`${LF_API_URL}/collections`, {
    headers: {
      Authorization: `Bearer ${LF_API_KEY}`,
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories from LF');
  }

  const data: CollectionsResponse = await res.json();
  return data.collections;
}

export default async function ShopPage() {
  const session = await auth();

  const userId = session?.user.id;

  if (!userId) {
    return (
      <ErrorDisplay errorMsg="We couldn't find you in our database. Please contact Rob @ +447482400662 on WhatsApp" />
    );
  }

  const creditBalanceResponse = await getUserTokenBalance(userId);

  if (!creditBalanceResponse.success) {
    return (
      <ErrorDisplay
        errorMsg={`Error fetching: ${creditBalanceResponse.error}`}
      />
    );
  }

  const { balance: creditBalance } = creditBalanceResponse.value;
  const productCollections = await getCollectionsFromLf();

  const collectionsToDisplay = productCollections.filter(collection => {
    if (collection.name === 'Test') {
      const userRole = session?.user.role;
      return (
        userRole && hasMinimumRole(userRole as keyof typeof ROLES, ROLES.tester)
      );
    }
    return true;
  });

  return (
    <div className="relative min-h-screen bg-[#F5F5F5]">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50 mx-4">
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors">
          <Link href="/members-v2" className="text-black flex">
            <ArrowLeft size={24} />{' '}
            <span className="hidden sm:inline">Back to Dashboard</span>
          </Link>
        </button>

        {/* <div className="flex space-x-2">
          <div className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors">
            <Link href="/members/pantry/" className="text-black">
              <Search size={24} />
            </Link>
          </div>
        </div> */}
        <div className="bg-black text-white py-4 px-6 rounded-full shadow-lg flex items-center justify-between hover:bg-gray-800 transition-colors ml-auto">
          <div className="flex items-center gap-2">
            <Wallet size={24} />
            <span className="font-bold">{creditBalance}</span>
          </div>
        </div>
      </div>

      <div>
        {/* Farm Cover Image */}
        <div className="relative h-48 md:h-64 lg:h-80 bg-green-800 w-full">
          <div className="absolute inset-0">
            <Image
              src="/home/levenvale-hero-mobile.jpg"
              alt="Levenvale Farm"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Farm Logo (Overlapping) */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
              <Image
                src="/levenvale-logo.png"
                alt="Levenvale Farm Logo"
                width={96}
                height={96}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="px-2">
          {/* Farm Information */}
          <div className="pt-16 px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-black">Levenvale Farm</h1>
              <Link
                href={'https://maps.app.goo.gl/VDQeWtp7Vo8yLVEB8'}
                className="flex items-center justify-center mt-2 text-gray-600"
              >
                <span className="flex items-center text-green-700 font-medium">
                  <MapPinCheck />
                  Somerset, UK
                </span>
                <span className="mx-1">•</span>
                <span className="flex items-center text-green-700 font-medium">
                  TA3 6FH
                </span>
              </Link>
            </div>

            {/* Delivery Info */}
            <DeliveryInfoCollapsible />
          </div>

          {/* Collections Section */}
          <div className="mt-8 px-4 pb-20">
            {collectionsToDisplay.map(collection => (
              <Suspense
                key={collection.id}
                fallback={<CollectionDisplaySkeleton />}
              >
                <CollectionDisplay collection={collection} />
              </Suspense>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
