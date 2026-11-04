import EnquiryForm from '@/components/site/EnquiryForm';
import { groupTourAudiences, groupTourPrices } from '@/lib/mock/experiences';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Group Farm Tours | Levenvale Farm',
};

// TODO: confirm the tour itinerary with the farm.
const itinerary = [
  {
    title: 'Welcome & the farm story',
    description:
      'Meet the farmers and hear how Levenvale went from dairy farm to regenerative beef farm.',
  },
  {
    title: 'Walk the paddocks',
    description:
      'See how the cattle are moved, dig into the soil and learn how the pasture is recovering.',
  },
  {
    title: 'Gardens & agroforestry',
    description:
      'Visit the market garden and tree plantings and see how they fit into the whole farm.',
  },
  {
    title: 'Food from the farm',
    description:
      'Finish with morning tea or a long lunch of Bello Beef and produce grown on the farm.',
  },
];

const container = 'mx-auto max-w-[1440px] px-4 sm:px-8';
const section = 'scroll-mt-8 py-16 md:py-28';
const eyebrow = 'text-sm font-medium uppercase tracking-wide text-forest';
const h2 =
  'mt-3 text-[28px] font-medium leading-[1.15] tracking-[-0.03em] md:text-[45px]';
const h3 = 'text-xl font-medium tracking-[-0.02em] md:text-2xl';
const body =
  'text-pretty text-base leading-relaxed text-neutral-700 md:text-lg';

export default function GroupFarmToursPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[520px] items-end md:h-[600px]">
        <Image
          src="/home/sam-holding-soil.webp"
          alt="A tour group gathered around Sam as he holds a clump of soil"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-black/70" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-12 text-center text-white md:pb-[60px]">
          <h1 className="text-[36px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[69px]">
            Group Farm Tours
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-base leading-normal text-white/90 md:text-[19px]">
            Guided tours of a working regenerative farm for seniors groups,
            corporate teams, schools and universities.
          </p>
        </div>
      </section>

      {/* What to expect */}
      <section className={section}>
        <div className={container}>
          <div className="max-w-[760px]">
            <p className={eyebrow}>What to Expect</p>
            <h2 className={h2}>A Morning on the Farm</h2>
            <p className={`${body} mt-6`}>
              Every tour is led by the farmers and shaped around your group.
              Tours run for groups of 10 or more and can be tailored in length,
              pace and focus.
            </p>
          </div>
          <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
            {itinerary.map((step, index) => (
              <li key={step.title} className="rounded-md bg-beige p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-leaf text-base font-semibold text-neutral-900">
                  {index + 1}
                </span>
                <h3 className={`${h3} mt-5`}>{step.title}</h3>
                <p className={`${body} mt-2`}>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it's for */}
      <section className={`${section} bg-beige`}>
        <div className={container}>
          <p className={eyebrow}>Who It&apos;s For</p>
          <h2 className={h2}>Tours for Every Group</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
            {groupTourAudiences.map(audience => (
              <article key={audience.name} className="rounded-md bg-white p-6">
                <h3 className={h3}>{audience.name}</h3>
                <p className={`${body} mt-2`}>{audience.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={section}>
        <div className={container}>
          <div className="max-w-[760px]">
            <p className={eyebrow}>Pricing</p>
            <h2 className={h2}>Price Examples</h2>
            <p className={`${body} mt-6`}>
              A guide to what group tours cost. Every group is different, so get
              in touch for a quote.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
            {groupTourPrices.map(tour => (
              <article
                key={tour.name}
                className="flex flex-col rounded-md border border-gray-200 p-6"
              >
                <h3 className={h3}>{tour.name}</h3>
                <p className="mt-1 text-base text-neutral-600">
                  {tour.duration}
                </p>
                <p className="mt-6 text-2xl font-semibold text-neutral-900">
                  {tour.price}
                </p>
                <p className="mt-1 text-sm text-neutral-600">{tour.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className={`${section} bg-beige`}>
        <div
          className={`${container} grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]`}
        >
          <div>
            <p className={eyebrow}>Enquire</p>
            <h2 className={h2}>Book a Group Tour</h2>
            <p className={`${body} mt-6 max-w-[520px]`}>
              Tell us about your group, your preferred date and anything you
              would like the tour to focus on, and we&apos;ll come back to you
              with options and a quote.
            </p>
          </div>
          <div className="rounded-md bg-white p-5 md:p-8">
            <EnquiryForm
              type="group-tour"
              guestsLabel="Group size"
              messagePlaceholder="Who is your group, and what would you like to see?"
            />
          </div>
        </div>
      </section>
    </>
  );
}
