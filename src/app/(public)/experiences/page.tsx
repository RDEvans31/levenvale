import EnquiryForm from '@/components/site/EnquiryForm';
import { ExperienceEventCard } from '@/components/site/ExperienceEventCard';
import {
  consultancyOptions,
  groupTourAudiences,
  mockCourses,
  mockEvents,
  mockWorkshops,
} from '@/lib/mock/experiences';
import { enquiryMailto } from '@/lib/site-links';
import { EventDto } from '@/types/events/event';
import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Experiences | Levenvale Farm' };

const sections = [
  { id: 'events', name: 'Events' },
  { id: 'education', name: 'Education' },
  { id: 'consultancy', name: 'Consultancy' },
  { id: 'venue-hire', name: 'Venue Hire + Celebrations' },
  { id: 'group-farm-tours', name: 'Group Farm Tours' },
];

const venueOptions = [
  {
    id: 'weddings',
    type: 'wedding' as const,
    name: 'Weddings',
    image: '/stay/hero.jpg',
    alt: 'Tin hut beneath an old gum tree at sunset',
    description:
      'Say “I do” with the Bellingen Valley and the mountains as your backdrop. Celebrate in the paddock, feast at a long table and keep your guests close with stays on the farm.',
    dateLabel: 'Wedding date',
    messagePlaceholder:
      'Tell us about your day: ceremony, reception, catering and accommodation',
  },
  {
    id: 'private-events',
    type: 'private-event' as const,
    name: 'Private Events',
    image: '/levenvale-lunch.webp',
    alt: 'Guests sharing a long lunch in the paddock',
    description:
      'Birthdays, family reunions, retreats and long lunches. We can host your group on the farm with paddock-to-plate food and plenty of space to gather.',
    dateLabel: 'Event date',
    messagePlaceholder: 'Tell us about your event and your group',
  },
];

const container = 'mx-auto max-w-[1440px] px-4 sm:px-8';
const section = 'scroll-mt-8 py-16 md:py-28';
const eyebrow = 'text-sm font-medium uppercase tracking-wide text-forest';
const h2 =
  'mt-3 text-[28px] font-medium leading-[1.15] tracking-[-0.03em] md:text-[45px]';
const h3 = 'text-2xl font-medium tracking-[-0.02em]';
const body =
  'text-pretty text-base leading-relaxed text-neutral-700 md:text-lg';
const btnLeaf =
  'inline-flex h-9 items-center justify-center rounded-[3px] bg-leaf px-6 text-sm font-medium uppercase text-neutral-900 transition hover:bg-leaf-dark sm:text-base';
const btnOutlineDark =
  'inline-flex h-9 items-center justify-center rounded-[3px] border border-neutral-900 px-6 text-sm font-medium uppercase text-neutral-900 transition hover:bg-neutral-900 hover:text-white sm:text-base';

function SectionHeading({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="max-w-[760px]">
      <p className={eyebrow}>{label}</p>
      <h2 className={h2}>{title}</h2>
      <p className={`${body} mt-6`}>{intro}</p>
    </div>
  );
}

function EventGrid({ events }: { events: EventDto[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map(event => (
        <ExperienceEventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default function ExperiencesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[520px] items-end md:h-[600px]">
        <Image
          src="/levenvale-lunch.webp"
          alt="Guests sharing a long lunch in the paddock at Levenvale Farm"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-black/70" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-12 text-center text-white md:pb-[60px]">
          <h1 className="text-[36px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[69px]">
            Experiences
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-base leading-normal text-white/90 md:text-[19px]">
            Feasts, festivals, workshops and celebrations on a working
            regenerative farm in the Bellingen Valley.
          </p>
        </div>
      </section>

      {/* In-page navigation */}
      <nav
        aria-label="Experiences sections"
        className="border-b border-gray-200 bg-white"
      >
        <ul
          className={`${container} flex gap-2 overflow-x-auto py-4 md:justify-center`}
        >
          {sections.map(item => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                className="inline-flex h-8 items-center rounded-full border border-gray-300 px-4 text-sm font-medium text-neutral-900 transition hover:border-forest hover:text-forest"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Events */}
      <section id="events" className={`${section} bg-beige`}>
        <div className={container}>
          <SectionHeading
            label="Events"
            title="Feasts, Festivals & Gatherings"
            intro="Seasonal feasts and long lunches under the mountains, music in the paddock and celebrations of the harvest."
          />
          <div className="mt-10 md:mt-14">
            <EventGrid events={mockEvents} />
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className={section}>
        <div className={container}>
          <SectionHeading
            label="Education"
            title="Learn on the Land"
            intro="Hands-on workshops and in-depth courses taught in the field by the people who farm here."
          />

          <h3 className={`${h3} mt-12 md:mt-16`}>Short Workshops</h3>
          <div className="mt-6">
            <EventGrid events={mockWorkshops} />
          </div>

          <h3 className={`${h3} mt-14 md:mt-20`}>Multi-day Courses</h3>
          <div className="mt-6">
            <EventGrid events={mockCourses} />
          </div>

          <div className="mt-14 flex flex-col gap-6 rounded-md bg-beige p-6 md:mt-20 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-[680px]">
              <h3 className={h3}>Host Education at Levenvale</h3>
              <p className={`${body} mt-3`}>
                Run a workshop, course or retreat on a working regenerative
                farm. We can provide the space, accommodation and farm-grown
                food.
              </p>
            </div>
            <a
              href={enquiryMailto('Hosting education at Levenvale')}
              className={`${btnLeaf} shrink-0 self-start md:self-auto`}
            >
              Enquire
            </a>
          </div>
        </div>
      </section>

      {/* Consultancy */}
      <section id="consultancy" className={`${section} bg-beige`}>
        <div className={container}>
          <SectionHeading
            label="Consultancy"
            title="Work With Our Experts"
            intro="Bring our experience to your own land. Our three experts are available for farm visits, planning and ongoing advice."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 lg:grid-cols-3">
            {consultancyOptions.map(option => (
              <article
                key={option.id}
                className="flex flex-col rounded-md bg-white p-6 md:p-8"
              >
                <h3 className={h3}>{option.name}</h3>
                <p className={`${body} mt-3`}>{option.description}</p>
                <ul className="mt-6 space-y-3">
                  {option.includes.map(item => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base text-neutral-800"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <dl className="mt-8 flex-1 divide-y divide-gray-200 border-y border-gray-200">
                  {option.prices.map(price => (
                    <div
                      key={price.label}
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <dt className="text-base text-neutral-700">
                        {price.label}
                      </dt>
                      <dd className="text-lg font-semibold text-neutral-900">
                        {price.price}
                      </dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={enquiryMailto(`Consultancy enquiry: ${option.name}`)}
                  className={`${btnLeaf} mt-8 self-start`}
                >
                  Enquire
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Hire + Celebrations */}
      <section id="venue-hire" className={section}>
        <div className={container}>
          <SectionHeading
            label="Venue Hire + Celebrations"
            title="Celebrate on the Farm"
            intro="From weddings to private gatherings, host your celebration on 500 acres of the Bellingen Valley."
          />
          <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 lg:grid-cols-2 lg:gap-8">
            {venueOptions.map(option => (
              <article
                key={option.id}
                id={option.id}
                className="flex scroll-mt-8 flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-md">
                  <Image
                    src={option.image}
                    alt={option.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className={`${h3} mt-6`}>{option.name}</h3>
                <p className={`${body} mt-3 flex-1`}>{option.description}</p>
                <div className="mt-8 rounded-md bg-beige p-5 md:p-8">
                  <EnquiryForm
                    type={option.type}
                    dateLabel={option.dateLabel}
                    messagePlaceholder={option.messagePlaceholder}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Group Farm Tours */}
      <section id="group-farm-tours" className={`${section} bg-beige`}>
        <div
          className={`${container} grid grid-cols-1 items-center gap-10 md:grid-cols-2`}
        >
          <div className="relative aspect-[3/2] overflow-hidden rounded-md">
            <Image
              src="/home/sam-holding-soil.webp"
              alt="A tour group gathered around Sam as he holds a clump of soil"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:pl-12">
            <p className={eyebrow}>Group Farm Tours</p>
            <h2 className={h2}>See Regenerative Farming Up Close</h2>
            <p className={`${body} mt-6`}>
              Guided tours of the farm for groups, with the farmers themselves.
              Walk the paddocks, meet the cattle and see how healthy soil makes
              healthy food.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {groupTourAudiences.map(audience => (
                <li
                  key={audience.name}
                  className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-neutral-800"
                >
                  {audience.name}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              <Link href="/experiences/group-farm-tours" className={btnLeaf}>
                Tours &amp; Pricing
              </Link>
              <Link
                href="/experiences/group-farm-tours#enquire"
                className={btnOutlineDark}
              >
                Enquire
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
