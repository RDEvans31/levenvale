import LoadingSpinner from '@/components/shared/LoadingSpinner';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'Levenvale Farm Pantry',
  description:
    'Levenvale Farm is a regenerative farm in Bellingen, NSW. The mission is to build food-security and community sovereignty, while restoring the land and the people in it. This farmshop is only available to members.',
};

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}
