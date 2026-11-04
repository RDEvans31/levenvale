import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Shop Bello Beef | Levenvale Farm' };

export default function ShopBelloBeefPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="heading-display text-4xl sm:text-5xl">
          Shop Bello Beef
        </h1>
        <p className="mt-6 text-gray-700">
          100% grass-fed and grass-finished organic beef, grown right here in
          the Bellingen Valley.
        </p>
        <p className="mt-4 text-gray-700">More coming soon.</p>
      </div>
    </section>
  );
}
