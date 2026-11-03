import Testimonials from '@/components/site/Testimonials';
import Image from 'next/image';
import Link from 'next/link';

const testimonials = [
  {
    quote:
      'What a beautiful, peaceful place to stay! The cabin is warm and cosy with plenty of space (much more than I expected). The outdoor amenities are quite close, very clean and easy to use. The views are spectacular!',
    author: 'Farm Stay Guest',
    image: '/home/guest-testimonial.jpg',
  },
];

const container = 'mx-auto max-w-[1440px] px-4 sm:px-8';
const section = 'py-16 md:py-28';
const h2 =
  'text-[28px] font-medium leading-[1.15] tracking-[-0.03em] md:text-[45px]';
const body =
  'text-pretty text-base leading-normal text-neutral-700 md:text-[17.5px]';

const btn =
  'inline-flex h-9 items-center justify-center rounded-[3px] px-3 text-sm font-medium uppercase transition sm:h-8 sm:w-[166px] sm:px-0 sm:text-base';
const btnLeaf = `${btn} bg-leaf text-neutral-900 hover:bg-leaf-dark`;
const btnOutlineLight = `${btn} border border-white text-white hover:bg-white/10`;
const btnOutlineDark = `${btn} border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white`;

function CtaButtons() {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      <Link href="/stay" className={btnLeaf}>
        Stay
      </Link>
      <Link href="/experiences" className={btnLeaf}>
        Experience
      </Link>
      <Link href="/shop-bello-beef" className={btnOutlineLight}>
        Shop Bello Beef
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[640px] items-end md:h-[748px]">
        <Image
          src="/home/levenvale-hero-mobile.jpg"
          alt="Levenvale Farm rolling hills and mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-black/70" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-12 text-center text-white md:pb-[60px]">
          <h1 className="text-[36px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[69px]">
            Reconnect the way <br className="hidden sm:block" />
            you farm, eat &amp; live.
          </h1>
          <p className="mx-auto mt-5 max-w-[700px] text-base leading-normal text-white/90 md:text-[19px]">
            Stay on a working regenerative farm, enjoy unforgettable
            paddock-to-plate experiences, learn practical skills and discover
            where real food comes from.
          </p>
          <CtaButtons />
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-[100px]">
        <div className={container}>
          <h2 className="text-2xl font-medium leading-[1.35] tracking-[-0.03em] md:text-[48px]">
            Levenvale Farm is a working regenerative farm where people can slow
            down, reconnect with nature and experience where good food comes
            from.
          </h2>
          <div className="relative mt-10 aspect-[3/2] overflow-hidden rounded-md md:aspect-[1376/800]">
            <Image
              src="/home/levenvale-sam-georgina.webp"
              alt="Sam and Georgina Baker with their cattle at Levenvale Farm"
              fill
              sizes="(min-width: 1440px) 1376px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-center md:justify-between">
            <p className={`${body} max-w-[640px]`}>
              From peaceful stays and farm experiences to celebrations and
              farm-grown produce, there&apos;s always something to discover.
            </p>
            <Link
              href="/stay"
              className={`${btnLeaf} shrink-0 self-start md:self-auto`}
            >
              Explore Stays
            </Link>
          </div>
        </div>
      </section>

      {/* Rooted in Nature */}
      <section className={`${section} bg-beige`}>
        <div
          className={`${container} grid grid-cols-1 items-center gap-10 md:grid-cols-2`}
        >
          <div>
            <h2 className={h2}>
              Rooted in Nature.
              <br />
              Made for Connection.
            </h2>
            <p className={`${body} mt-8 max-w-[600px]`}>
              From waking up to mountain views to sharing a meal grown close to
              home, Levenvale is a place to slow down and enjoy the simple
              things.
            </p>
            <p className={`${body} mt-6 max-w-[600px]`}>
              We farm with nature, create space for community and invite our
              guests to experience the land in a more meaningful way.
            </p>
            <Link href="/stay" className={`${btnLeaf} mt-10`}>
              Book Now
            </Link>
          </div>
          <div className="relative aspect-[668/699] overflow-hidden rounded-md">
            <Image
              src="/home/levenvale-cabin-sunset.jpg"
              alt="Cabin in a green paddock at sunset"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Farm to Table */}
      <section className={section}>
        <div
          className={`${container} grid grid-cols-1 items-center gap-10 md:grid-cols-2`}
        >
          <div className="relative aspect-[668/699] overflow-hidden rounded-md">
            <Image
              src="/home/bello-beef-tbone.jpg"
              alt="Sliced Bello Beef T-bone steak on a board with greens"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:pl-12">
            <h2 className={h2}>From Our Farm to Your Table</h2>
            <p className={`${body} mt-8 max-w-[660px]`}>
              Our organic, regenerative farm is home to Bello Beef — 100%
              grass-fed and grass-finished beef grown right here in the
              Bellingen Valley.
            </p>
            <p className={`${body} mt-6 max-w-[660px]`}>
              Good food starts with healthy soil, happy animals and a farm cared
              for with intention.
            </p>
            <Link href="/shop-bello-beef" className={`${btnOutlineDark} mt-8`}>
              Shop Bello Beef
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${section} bg-beige`}>
        <div className={container}>
          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      {/* Valley Views CTA */}
      <section className="relative flex h-[520px] items-end md:h-[600px]">
        <Image
          src="/home/levenvale-hero-mobile.jpg"
          alt="Cabin overlooking the Bellingen valley"
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-black/70" />
        <div className="relative z-10 mx-auto w-full max-w-2xl px-4 pb-12 text-center text-white md:pb-[60px]">
          <h2 className="text-[28px] font-medium leading-tight tracking-[-0.03em] md:text-[45px]">
            Wake Up to Valley Views
          </h2>
          <p className="mx-auto mt-4 max-w-[660px] text-base leading-normal text-white/90 md:text-[17px]">
            Switch off, slow down and settle into farm life. Stay in one of our
            unique cabins and enjoy breathtaking views, fresh country air and
            plenty of space to simply be.
          </p>
          <CtaButtons />
        </div>
      </section>
    </>
  );
}
