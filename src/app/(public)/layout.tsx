import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Levenvale Farm',
  description:
    'Levenvale Farm is a regenerative farm in Bellingen, NSW. The mission is to build food-security and community sovereignty, while restoring the land and the people in it.',
};

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-brand-black">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
