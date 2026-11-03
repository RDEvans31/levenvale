import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Our Story | Levenvale Farm' };

export default function OurStoryPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl tracking-tight sm:text-5xl">Our Story</h1>
        <p className="mt-6 text-gray-700">
          Levenvale Farm was one of the original dairy farms of Bellingen,
          spanning the banks of Hydes Creek. In 2019 Sam and Georgina Baker
          became the stewards of the now 500 acres of Levenvale Farm, converting
          it from dairy farm to organic beef cattle and revitalising the soil
          for small-scale, nutrient dense food production.
        </p>
        <p className="mt-4 text-gray-700">More coming soon.</p>
      </div>
    </section>
  );
}
