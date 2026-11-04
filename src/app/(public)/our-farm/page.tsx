import type { Metadata } from 'next';
import Image from 'next/image';
import { BELLO_BEEF_STORE_URL } from '@/lib/site-links';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Our Farm | Levenvale Farm' };

const sections = [
  { id: 'our-story', name: 'Our Story' },
  { id: 'regenerative-agriculture', name: 'Regenerative Agriculture' },
  { id: 'farmers-and-enterprises', name: 'Farmers & Enterprises' },
  { id: 'community-and-partnerships', name: 'Community & Partnerships' },
];

// TODO: replace with the farm's own description of each practice.
const practices = [
  {
    name: 'Regenerative Cattle Grazing',
    description:
      'Our cattle are grass-fed and grass-finished, moved across the paddocks in a way that rests the land and rebuilds the soil.',
  },
  {
    name: 'Agroforestry',
    description:
      'Bringing trees back into the farming landscape for shade, shelter, habitat and healthier pasture.',
  },
  {
    name: 'Permaculture Market Gardening',
    description:
      'Small-scale, nutrient-dense food grown with nature rather than against it.',
  },
];

type Enterprise = {
  name: string;
  logo?: { src: string; width: number; height: number };
  image?: string;
  description: string;
  cta: { label: string; href: string };
};

// TODO: confirm descriptions and add any other independent enterprises.
const enterprises: Enterprise[] = [
  {
    name: 'Bello Beef',
    logo: {
      src: '/home/levenvale-bello-beef-logo.png',
      width: 519,
      height: 80,
    },
    image: '/home/bello-beef-tbone.jpg',
    description:
      '100% grass-fed and grass-finished organic beef, grown right here in the Bellingen Valley.',
    cta: { label: 'Shop Bello Beef', href: BELLO_BEEF_STORE_URL },
  },
  {
    name: 'The Patch Organics',
    logo: {
      src: '/home/levenvale-the-patch-organics-logo.png',
      width: 360,
      height: 80,
    },
    description:
      'Organic produce grown on the farm and shared with the Bellingen community.',
    cta: { label: 'Get in Touch', href: 'mailto:thepatch.bellingen@gmail.com' },
  },
  {
    name: 'Levenvale Farm Stays',
    image: '/home/levenvale-cabin-sunset.jpg',
    description:
      'Off-grid huts, a restored 1906 farmhouse, campsites and glamping across the farm.',
    cta: { label: 'Explore Stays', href: '/stay' },
  },
];

const container = 'mx-auto max-w-[1440px] px-4 sm:px-8';
const section = 'scroll-mt-8 py-16 md:py-28';
const eyebrow = 'heading-display text-sm text-brand-black';
const h2 = 'mt-3 text-[28px] font-bold leading-[1.15] md:text-[45px]';
const body =
  'text-pretty text-base leading-normal text-neutral-700 md:text-[17.5px]';
const btnLeaf =
  'inline-flex h-9 items-center justify-center rounded-[3px] bg-brand-green px-6 text-sm font-medium uppercase text-brand-black transition hover:bg-brand-black hover:text-brand-white sm:h-8 sm:px-5 sm:text-base';
const btnOutlineDark =
  'inline-flex h-9 items-center justify-center rounded-[3px] border border-brand-black px-6 text-sm font-medium uppercase text-brand-black transition hover:bg-brand-black hover:text-brand-white sm:h-8 sm:px-5 sm:text-base';

export default function OurFarmPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[520px] items-end md:h-[600px]">
        <Image
          src="/home/levenvale-hero-mobile.jpg"
          alt="Levenvale Farm rolling hills and mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-black/70" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-12 text-center text-white md:pb-[60px]">
          <h1 className="text-[36px] heading-display leading-[1.15] md:text-[56px]">
            Our Farm
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-base leading-normal text-white/90 md:text-[19px]">
            500 acres on the banks of Hydes Creek, farmed with nature to grow
            real food and bring people back to the land.
          </p>
        </div>
      </section>

      {/* In-page navigation */}
      <nav
        aria-label="Our Farm sections"
        className="border-b border-gray-200 bg-white"
      >
        <ul
          className={`${container} flex gap-2 overflow-x-auto py-4 md:justify-center`}
        >
          {sections.map(item => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                className="inline-flex h-8 items-center rounded-full border border-gray-300 px-4 text-sm font-medium text-brand-black transition hover:border-brand-black link-hover"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Our Story */}
      <section id="our-story" className={section}>
        <div
          className={`${container} grid grid-cols-1 items-center gap-10 md:grid-cols-2`}
        >
          <div>
            <p className={eyebrow}>Our Story</p>
            <h2 className={h2}>From Dairy Farm to Regenerative Farm</h2>
            <p className={`${body} mt-8 max-w-[600px]`}>
              Levenvale Farm was one of the original dairy farms of Bellingen,
              spanning the banks of Hydes Creek.
            </p>
            <p className={`${body} mt-6 max-w-[600px]`}>
              In 2019 Sam and Georgina Baker became the stewards of the now 500
              acres of Levenvale Farm, converting it from dairy farm to organic
              beef cattle and revitalising the soil for small-scale, nutrient
              dense food production.
            </p>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-md">
            <Image
              src="/home/levenvale-sam-georgina.webp"
              alt="Sam and Georgina Baker with their cattle at Levenvale Farm"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Regenerative Agriculture & Our Practices */}
      <section
        id="regenerative-agriculture"
        className={`${section} border-t border-gray-200 bg-white`}
      >
        <div className={container}>
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div className="relative aspect-[3/2] overflow-hidden rounded-md md:order-first">
              <Image
                src="/home/sam-holding-soil.webp"
                alt="Sam holding a clump of healthy soil during a farm tour"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:pl-12">
              <p className={eyebrow}>Regenerative Agriculture</p>
              <h2 className={h2}>Our Practices</h2>
              <p className={`${body} mt-8 max-w-[600px]`}>
                Good food starts with healthy soil, happy animals and a farm
                cared for with intention. We farm with nature, restoring the
                land so it can keep feeding people for generations.
              </p>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
            {practices.map(practice => (
              <li
                key={practice.name}
                className="rounded-md border-2 border-brand-green bg-white p-6 md:p-8"
              >
                <h3 className="text-xl font-bold md:text-2xl">
                  {practice.name}
                </h3>
                <p className={`${body} mt-3`}>{practice.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Meet the Farmers & Farm Enterprises */}
      <section id="farmers-and-enterprises" className={section}>
        <div className={container}>
          <div className="max-w-[760px]">
            <p className={eyebrow}>Meet the Farmers</p>
            <h2 className={h2}>The People &amp; Enterprises of Levenvale</h2>
            <p className={`${body} mt-8`}>
              Sam and Georgina Baker care for Levenvale Farm alongside a family
              of independent enterprises that share the land, each growing
              something good for the Bellingen Valley.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {enterprises.map(enterprise => (
              <article key={enterprise.name} className="flex flex-col">
                <div
                  className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md ${
                    enterprise.image ? '' : 'border border-gray-200 bg-white'
                  }`}
                >
                  {enterprise.image ? (
                    <Image
                      src={enterprise.image}
                      alt={enterprise.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    enterprise.logo && (
                      <Image
                        src={enterprise.logo.src}
                        alt={enterprise.name}
                        width={enterprise.logo.width}
                        height={enterprise.logo.height}
                        className="h-auto w-3/4 max-w-[320px]"
                      />
                    )
                  )}
                </div>
                <h3 className="mt-6 text-2xl font-bold">{enterprise.name}</h3>
                <p className={`${body} mt-3 flex-1`}>
                  {enterprise.description}
                </p>
                <div className="mt-6">
                  {enterprise.cta.href.startsWith('/') ? (
                    <Link href={enterprise.cta.href} className={btnLeaf}>
                      {enterprise.cta.label}
                    </Link>
                  ) : (
                    <a href={enterprise.cta.href} className={btnLeaf}>
                      {enterprise.cta.label}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Community & Partnerships */}
      <section
        id="community-and-partnerships"
        className={`${section} border-t border-gray-200 bg-white`}
      >
        <div className={container}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end">
            <div>
              <p className={eyebrow}>Our Community</p>
              <h2 className={h2}>Community &amp; Partnerships</h2>
            </div>
            <p className={`${body} max-w-[600px]`}>
              From seasonal feasts and long lunches under the mountains to
              festivals, workshops and farm stays, Levenvale is a place to
              gather, share a meal grown close to home and reconnect.
            </p>
          </div>
          <div className="relative mt-10 aspect-[3/2] overflow-hidden rounded-md md:mt-14 md:aspect-[1376/700]">
            <Image
              src="/levenvale-lunch.webp"
              alt="Guests sharing a long lunch in the paddock at Levenvale Farm"
              fill
              sizes="(min-width: 1440px) 1376px, 100vw"
              className="object-cover"
            />
          </div>
          {/* TODO: add the farm's community partners once confirmed. */}
          <div className="mt-8 flex flex-wrap gap-2 md:mt-10">
            <Link href="/experiences#events" className={btnLeaf}>
              Upcoming Events
            </Link>
            <a
              href="mailto:visit@levenvalefarm.com.au?subject=Partnering%20with%20Levenvale%20Farm"
              className={btnOutlineDark}
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
