import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = { title: 'Stay | Levenvale Farm' };

type Card = {
  id: string;
  name: string;
  image: string;
  description: string[];
  cta: string;
  href: string;
};

const bookingUrl = (roomTypeCode: string) =>
  `https://www.onlinebooking.direct/property/coffs-coast-accommodation?propertyId=coffs-coast-accommodation&roomTypeCode=${roomTypeCode}&mode=only`;

const stays: Card[] = [
  {
    id: 'bakers-hut',
    name: "Baker's Hut",
    image: '/stay/bakers-hut.jpg',
    description: [
      'Perched high on the hill overlooking the farm, Baker’s Hut is fully off-grid with no mains power. Furnished with a King and a Single, it fits up to 3 people, with breathtaking views over the farm and beyond to the Dorrigo Plateau.',
      'The hut features a simple kitchen and bathroom and a small deck out the front. Light a fire, take a bath, cook some Bello Beef and watch the mist roll in.',
    ],
    cta: 'Book',
    href: bookingUrl('BAKERS-HUT'),
  },
  {
    id: 'bickells-hut',
    name: "Bickell's Hut",
    image: '/stay/bickells-hut.jpg',
    description: [
      'Overlooking the farm, Bickell’s Hut is our family-size, off-grid hut with no mains power. Furnished for up to 4 people with a Queen and fold-out sofa, it features a simple kitchen and bathroom and a large deck with views over the farm and beyond to The Promised Land.',
      'Light a fire, watch the stars and switch off — reconnect with yourself and with nature.',
    ],
    cta: 'Book',
    href: bookingUrl('BICKELLS-HUT'),
  },
  {
    id: 'farmhouse',
    name: 'The Farmhouse',
    image: '/stay/farmhouse.jpg',
    description: [
      'Stay in our beautifully restored 1906 farmhouse, where timeless country charm meets modern comfort. With four spacious bedrooms, sweeping farm views and just 5 km from Bellingen, it’s the perfect base to slow down, reconnect and experience life on a working regenerative farm.',
    ],
    cta: 'Book',
    href: 'https://www.coffscoastaccommodation.com.au/listings/the-farmhouse-at-levenvale-farm/',
  },
  {
    id: 'tiny-nancy',
    name: 'Tiny Nancy',
    image: '/stay/tiny-nancy.jpg',
    description: [
      'Tiny Nancy is poised high on a hill of Levenvale Farm in complete privacy, surrounded by rainforest and incredible views.',
      'With the luxury of air conditioning, a fridge and warm showers, Tiny Nancy is your excuse to shake off the confinement of modern life and strip back to your most raw and natural self.',
    ],
    cta: 'Book',
    href: 'https://intothewildescapes.com/property/61bb7bcd46a1d0003a7abb97',
  },
  {
    id: 'camping',
    name: 'Campsites',
    image: '/stay/campsites.jpg',
    description: [
      'Slow down and embrace the rhythms of country life at one of our two camping areas. Choose the peaceful seclusion of Beyond the Bridge or the open space of Old Flat.',
      'Enjoy crackling campfires, star-filled skies, swimming holes, creek adventures and the chance to truly disconnect — all just minutes from Bellingen.',
    ],
    cta: 'Book',
    href: 'https://www.hipcamp.com/en-AU/land/new-south-wales-levenvale-farm-in-bellingen-ozxhnod6',
  },
  {
    id: 'bell-tents',
    name: 'Bell Tents',
    image: '/stay/bell-tents.jpg',
    description: [
      'No tent? No problem. Stay in one of our beautifully furnished glamping bell tents, available through our partner Stylish Camping and fully set up on our campsites before you arrive.',
      'Couples, families and groups of all sizes are welcome, with full access to our shared campsite amenities.',
    ],
    cta: 'Enquire',
    href: 'mailto:visit@levenvalefarm.com.au?subject=Bell%20tent%20enquiry',
  },
];

const extras: Card[] = [
  {
    id: 'hampers',
    name: 'Hampers',
    image: '/stay/hampers.jpg',
    description: [
      'Make your stay even more delicious with farm-fresh and locally sourced hampers, ready and waiting when you arrive. From a proper Farm Breakfast and Bread, Butter & Jam to an afternoon graze, sausages at sunset or Bello Beef steaks cooked over the fire.',
    ],
    cta: 'Shop',
    href: 'https://levenvalefarm.com.au/collections/hampers',
  },
  {
    id: 'farm-map',
    name: 'Explore the Farm',
    image: '/stay/explore-the-farm.jpg',
    description: [
      'Find your campsite or farm stay, the farm shop, walking tracks, creek access and shared amenities on our farm map.',
      'Every campsite is a short stroll from our facilities, including our converted horse float and outdoor ensuite — both with custom-built composting toilets, hand basins and gas hot showers.',
    ],
    cta: 'Farm Map',
    href: 'https://levenvalefarm.com.au/pages/farm-map',
  },
];

const reasons = [
  'Working regenerative farm',
  'Organic produce',
  'Farm shop',
  'Campfires',
  'Farm animals',
  'Walking trails',
  'Family friendly',
  '5 minutes to Bellingen',
  'Stargazing',
];

const container = 'mx-auto max-w-[1440px] px-4 sm:px-8';
const section = 'py-16 md:py-28';
const h2 =
  'text-[28px] font-medium leading-[1.15] tracking-[-0.03em] md:text-[45px]';
const body =
  'text-pretty text-base leading-normal text-neutral-700 md:text-[17.5px]';
const btnLeaf =
  'inline-flex h-9 items-center justify-center rounded-[3px] bg-leaf px-6 text-sm font-medium uppercase text-neutral-900 transition hover:bg-leaf-dark sm:h-8 sm:w-[166px] sm:px-0 sm:text-base';

function CardLink({ card }: { card: Card }) {
  const external = card.href.startsWith('http');
  return (
    <a
      href={card.href}
      className={btnLeaf}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {card.cta}
    </a>
  );
}

function StayCard({
  card,
  aspect = 'aspect-[4/3]',
}: {
  card: Card;
  aspect?: string;
}) {
  return (
    <article id={card.id} className="flex scroll-mt-8 flex-col">
      <div className={`relative ${aspect} overflow-hidden rounded-md`}>
        <Image
          src={card.image}
          alt={card.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <h3 className="mt-6 text-2xl font-medium tracking-[-0.02em]">
        {card.name}
      </h3>
      <div className="mt-3 flex-1 space-y-3">
        {card.description.map(paragraph => (
          <p key={paragraph} className={body}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-6">
        <CardLink card={card} />
      </div>
    </article>
  );
}

export default function StayPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[520px] items-end md:h-[600px]">
        <Image
          src="/stay/hero.jpg"
          alt="Tin hut on Levenvale Farm at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-black/70" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-12 text-center text-white md:pb-[60px]">
          <h1 className="text-[36px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[69px]">
            Farm Stays
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-base leading-normal text-white/90 md:text-[19px]">
            Wake to mist rolling across the paddocks, cook breakfast over the
            fire and spend the day exploring a working regenerative farm.
          </p>
        </div>
      </section>

      {/* On-farm stays */}
      <section className={section}>
        <div className={container}>
          <h2 className={h2}>Stay on the Farm</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {stays.map(card => (
              <StayCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* Extras */}
      <section className={`${section} bg-beige`}>
        <div className={container}>
          <h2 className={h2}>Make the Most of Your Stay</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 md:mt-16 md:grid-cols-2">
            {extras.map(card => (
              <StayCard key={card.id} card={card} aspect="aspect-[16/10]" />
            ))}
          </div>
        </div>
      </section>

      {/* Dorrigo */}
      <section id="dorrigo-farm-escape" className={section}>
        <div
          className={`${container} grid grid-cols-1 items-center gap-10 md:grid-cols-2`}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-md">
            <Image
              src="/stay/dorrigo-farm-escape.jpg"
              alt="Hudson's Hideaway on the Dorrigo Plateau"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:pl-12">
            <p className="text-sm font-medium uppercase tracking-wide text-forest">
              Dorrigo Farm Escape
            </p>
            <h2 className={`${h2} mt-3`}>Hudson&apos;s Hideaway</h2>
            <p className={`${body} mt-8 max-w-[660px]`}>
              Looking for a change of scenery? Hudson&apos;s Hideaway is our
              peaceful two-bedroom eco cabin on the Dorrigo Plateau, surrounded
              by rolling farmland and nature, just 10 minutes from Dorrigo
              village and the spectacular Dorrigo National Park.
            </p>
            <p className={`${body} mt-6 max-w-[660px]`}>
              With a cosy fireplace, outdoor fire pit, beautiful rural views and
              no TV or internet, it&apos;s a private little escape made for
              slowing down, switching off and exploring the plateau.
            </p>
            <a
              href="mailto:visit@levenvalefarm.com.au?subject=Hudson's%20Hideaway%20booking"
              className={`${btnLeaf} mt-8`}
            >
              Book
            </a>
          </div>
        </div>
      </section>

      {/* Why stay */}
      <section className={`${section} bg-beige`}>
        <div className={container}>
          <h2 className={h2}>Why Stay at Levenvale Farm?</h2>
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
            {reasons.map(reason => (
              <li
                key={reason}
                className="flex items-center gap-3 text-lg font-medium"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
