'use server';

import { LF_API_KEY, LF_API_URL } from '@/lib/little-farma/little-farma';

interface CollectionDto {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  organisationId: string;
  count: number;
}

interface CollectionsResponse {
  collection: CollectionDto;
}

export async function getCollection(
  collectionId: string
): Promise<CollectionsResponse> {
  const res = await fetch(`${LF_API_URL}/collections/${collectionId}`, {
    headers: {
      Authorization: `Bearer ${LF_API_KEY}`,
    },
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch collection with id: ${collectionId}`);
  }

  return res.json();
}
