import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = { title: 'Stay | Levenvale Farm' };

type Card = {
  id: string;
  name: string;
  images: { src: string; alt: string }[];
  description: string[];
  actions: { label: string; href: string }[];
};

const bookingUrl = (roomTypeCode: string) =>
  `https://www.onlinebooking.direct/property/coffs-coast-accommodation?propertyId=coffs-coast-accommodation&roomTypeCode=${roomTypeCode}&mode=only`;

const stays: Card[] = [
  {
    id: 'farmhouse',
    name: 'The Farm House',
    images: [{ src: '/stay/farmhouse.jpg', alt: 'The Farm House' }],
    description: [
      'Stay in our beautifully restored 1906 farmhouse, where timeless country charm meets modern comfort. With four spacious bedrooms, sweeping farm views and just 5 km from Bellingen, it’s the perfect base to slow down, reconnect and experience life on a working regenerative farm.',
    ],
    actions: [
      {
        label: 'Book',
        href: 'https://www.coffscoastaccommodation.com.au/listings/the-farmhouse-at-levenvale-farm/',
      },
    ],
  },
  {
    id: 'huts',
    name: 'The Huts',
    images: [
      { src: '/stay/bakers-hut.jpg', alt: "Baker's Hut" },
      { src: '/stay/bickells-hut.jpg', alt: "Bickell's Hut" },
    ],
    description: [
      'Two off-grid huts on the hill overlooking the farm, with no mains power. Each has a simple kitchen and bathroom and a deck with views beyond the farm. Light a fire, watch the stars and switch off.',
      'Baker’s Hut sleeps up to 3 (a King and a Single) and looks out to the Dorrigo Plateau. Bickell’s Hut is our family-size hut for up to 4 (a Queen and a fold-out sofa), with a large deck facing The Promised Land.',
    ],
    actions: [
      { label: "Baker's Hut", href: bookingUrl('BAKERS-HUT') },
      { label: "Bickell's Hut", href: bookingUrl('BICKELLS-HUT') },
    ],
  },
  {
    id: 'tiny-nancy',
    name: 'Tiny Nancy',
    images: [{ src: '/stay/tiny-nancy.jpg', alt: 'Tiny Nancy' }],
    description: [
      'Tiny Nancy is poised high on a hill of Levenvale Farm in complete privacy, surrounded by rainforest and incredible views.',
      'With the luxury of air conditioning, a fridge and warm showers, Tiny Nancy is your excuse to shake off the confinement of modern life and strip back to your most raw and natural self.',
    ],
    actions: [
      {
        label: 'Book',
        href: 'https://intothewildescapes.com/property/61bb7bcd46a1d0003a7abb97',
      },
    ],
  },
  {
    id: 'camping',
    name: 'Campsites — Beyond the Bridge & Old Flat',
    images: [
      { src: '/stay/campsites.jpg', alt: 'Campsites at Levenvale Farm' },
    ],
    description: [
      'Slow down and embrace the rhythms of country life at one of our two camping areas. Choose the peaceful seclusion of Beyond the Bridge or the open space of Old Flat.',
      'Enjoy crackling campfires, star-filled skies, swimming holes, creek adventures and the chance to truly disconnect — all just minutes from Bellingen.',
    ],
    actions: [
      {
        label: 'Book',
        href: 'https://www.hipcamp.com/en-AU/land/new-south-wales-levenvale-farm-in-bellingen-ozxhnod6',
      },
    ],
  },
  {
    id: 'bell-tents',
    name: 'Bell Tent Glamping',
    images: [{ src: '/stay/bell-tents.jpg', alt: 'Glamping bell tents' }],
    description: [
      'No tent? No problem. Stay in one of our beautifully furnished glamping bell tents, available through our partner Stylish Camping and fully set up on our campsites before you arrive.',
      'Couples, families and groups of all sizes are welcome, with full access to our shared campsite amenities.',
    ],
    actions: [
      {
        label: 'Enquire',
        href: 'mailto:visit@levenvalefarm.com.au?subject=Bell%20tent%20enquiry',
      },
    ],
  },
];

const extras: Card[] = [
  {
    id: 'farm-map',
    name: 'Explore the Farm — Map & Amenities',
    images: [{ src: '/stay/explore-the-farm.jpg', alt: 'Explore the farm' }],
    description: [
      'Find your campsite or farm stay, the farm shop, walking tracks, creek access and shared amenities on our farm map.',
      'Every campsite is a short stroll from our facilities, including our converted horse float and outdoor ensuite — both with custom-built composting toilets, hand basins and gas hot showers.',
    ],
    actions: [
      {
        label: 'Farm Map',
        href: 'https://levenvalefarm.com.au/pages/farm-map',
      },
    ],
  },
  {
    id: 'hampers',
    name: 'Farm Stay Hampers & Extras',
    images: [{ src: '/stay/hampers.jpg', alt: 'Farm stay hampers' }],
    description: [
      'Make your stay even more delicious with farm-fresh and locally sourced hampers, ready and waiting when you arrive. From a proper Farm Breakfast and Bread, Butter & Jam to an afternoon graze, sausages at sunset or Bello Beef steaks cooked over the fire.',
    ],
    actions: [
      {
        label: 'Shop',
        href: 'https://levenvalefarm.com.au/collections/hampers',
      },
    ],
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

function CardAction({ href, label }: { href: string; label: string }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      className={btnLeaf}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {label}
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
      <div
        className={`relative grid ${aspect} gap-1 overflow-hidden rounded-md ${
          card.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {card.images.map(image => (
          <div key={image.src} className="relative">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={
                card.images.length > 1
                  ? '(min-width: 1024px) 17vw, (min-width: 640px) 25vw, 50vw'
                  : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
              }
              className="object-cover"
            />
          </div>
        ))}
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
      <div className="mt-6 flex flex-wrap gap-2">
        {card.actions.map(action => (
          <CardAction key={action.href} {...action} />
        ))}
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
