import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Experiences | Levenvale Farm' };

export default function ExperiencesPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl tracking-tight sm:text-5xl">Experiences</h1>
        <p className="mt-6 text-gray-700">
          Farm tours, workshops, events, weddings and venue hire on a working
          regenerative farm in the Bellingen Valley.
        </p>
        <p className="mt-4 text-gray-700">More coming soon.</p>
      </div>
    </section>
  );
}
