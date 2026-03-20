import FloatingBasket from '@/components/pantry-v2/FloatingBasket';
import type { Metadata } from 'next';
import '../../../globals.css';

export const metadata: Metadata = {
  title: 'Levenvale Farm',
  description:
    'Levenvale Farm is a regenerative farm in Bellingen, NSW. The mission is to build food-security and community sovereignty, while restoring the land and the people in it.',
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <FloatingBasket />
    </div>
  );
}
