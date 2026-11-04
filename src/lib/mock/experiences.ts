// MOCK DATA for the public Experiences page.
// TODO: replace the events with live data from the Little Farma events API
// (`/events`, filtered by category) and confirm all prices with the farm.
import type { EventDto } from '@/types/events/event';

type MockEventInput = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  image: string;
  priceInCurrency: number;
  category: string;
  bookingCount?: number;
};

function mockEvent(input: MockEventInput): EventDto {
  return {
    id: input.id,
    title: input.title,
    description: input.description,
    startsAt: input.startsAt,
    endsAt: input.endsAt,
    depositInTokens: 0,
    status: 'live',
    public: true,
    city: 'Bellingen',
    postcode: '2454',
    mapLink: null,
    closeBookingDateTime: null,
    category: { id: input.category, name: input.category, color: '#8DC63F' },
    images: [
      {
        id: `${input.id}-image`,
        url: input.image,
        altText: null,
        sortOrder: 0,
      },
    ],
    products: [
      {
        id: `${input.id}-ticket`,
        name: 'General admission',
        description: null,
        priceInTokens: 0,
        priceInCurrency: input.priceInCurrency,
        maxQuantity: null,
        sortOrder: 0,
        productType: 'ticket',
        additionalInfoQuestion: null,
      },
    ],
    bookingCount: input.bookingCount ?? 0,
  };
}

export const mockEvents: EventDto[] = [
  mockEvent({
    id: 'summer-long-lunch',
    title: 'Summer Long Lunch',
    description:
      'A seasonal feast in the paddock: a long table under the mountains, a shared menu of Bello Beef and produce grown on the farm and the neighbours.',
    startsAt: '2026-12-12T12:00:00+11:00',
    endsAt: '2026-12-12T16:00:00+11:00',
    image: '/levenvale-lunch.webp',
    priceInCurrency: 145,
    category: 'Seasonal Feasts',
    bookingCount: 38,
  }),
  mockEvent({
    id: 'levenvale-folk-festival',
    title: 'Levenvale Folk Festival',
    description:
      'Three days of folk music, campfires and farm food, with camping on Beyond the Bridge and Old Flat.',
    startsAt: '2027-03-26T15:00:00+11:00',
    endsAt: '2027-03-28T14:00:00+11:00',
    image: '/stay/bell-tents.jpg',
    priceInCurrency: 120,
    category: 'Festivals',
  }),
  mockEvent({
    id: 'autumn-harvest-feast',
    title: 'Autumn Harvest Feast',
    description:
      'Celebrate the end of the growing season with a long-table dinner cooked over fire as the sun goes down over the valley.',
    startsAt: '2027-04-17T17:00:00+10:00',
    endsAt: '2027-04-17T21:30:00+10:00',
    image: '/home/bello-beef-tbone.jpg',
    priceInCurrency: 165,
    category: 'Seasonal Feasts',
  }),
];

export const mockWorkshops: EventDto[] = [
  mockEvent({
    id: 'soil-health-walk',
    title: 'Soil Health & Regenerative Grazing Walk',
    description:
      'A half-day walk across the paddocks looking at soil, pasture and how the cattle are moved to rebuild the land.',
    startsAt: '2026-11-21T09:00:00+11:00',
    endsAt: '2026-11-21T12:30:00+11:00',
    image: '/home/sam-holding-soil.webp',
    priceInCurrency: 85,
    category: 'Short Workshops',
    bookingCount: 12,
  }),
  mockEvent({
    id: 'no-dig-market-garden',
    title: 'No-Dig Market Garden Basics',
    description:
      'Learn how to build and plant no-dig beds, plan a season of crops and keep the soil covered and alive.',
    startsAt: '2026-12-05T09:00:00+11:00',
    endsAt: '2026-12-05T13:00:00+11:00',
    image: '/stay/campsites.jpg',
    priceInCurrency: 95,
    category: 'Short Workshops',
  }),
  mockEvent({
    id: 'nose-to-tail-cooking',
    title: 'Nose-to-Tail Cooking with Bello Beef',
    description:
      'Get to know the lesser-known cuts, then cook and share them over the fire with the farmers.',
    startsAt: '2027-01-24T10:00:00+11:00',
    endsAt: '2027-01-24T15:00:00+11:00',
    image: '/stay/hampers.jpg',
    priceInCurrency: 180,
    category: 'Short Workshops',
  }),
];

export const mockCourses: EventDto[] = [
  mockEvent({
    id: 'regenerative-grazing-course',
    title: 'Regenerative Cattle Grazing — 3-Day Course',
    description:
      'Grazing planning, paddock design and pasture monitoring, taught in the field on a working beef farm.',
    startsAt: '2027-02-15T09:00:00+11:00',
    endsAt: '2027-02-17T16:00:00+11:00',
    image: '/home/levenvale-sam-georgina.webp',
    priceInCurrency: 1200,
    category: 'Multi-day Courses',
  }),
  mockEvent({
    id: 'agroforestry-intensive',
    title: 'Agroforestry Weekend Intensive',
    description:
      'Design shelterbelts, choose species and plan plantings that bring trees back into the farming landscape.',
    startsAt: '2027-03-06T09:00:00+11:00',
    endsAt: '2027-03-07T16:00:00+11:00',
    image: '/stay/tiny-nancy.jpg',
    priceInCurrency: 650,
    category: 'Multi-day Courses',
  }),
  mockEvent({
    id: 'permaculture-market-gardening-course',
    title: 'Permaculture Market Gardening — 5-Day Course',
    description:
      'From site design to harvest and sale: everything you need to start a small, profitable market garden.',
    startsAt: '2027-04-19T09:00:00+10:00',
    endsAt: '2027-04-23T16:00:00+10:00',
    image: '/home/levenvale-hero-mobile.jpg',
    priceInCurrency: 1450,
    category: 'Multi-day Courses',
  }),
];

export type ConsultancyOption = {
  id: string;
  name: string;
  description: string;
  includes: string[];
  prices: { label: string; price: string }[];
};

// TODO: add each expert's name and bio, and confirm pricing.
export const consultancyOptions: ConsultancyOption[] = [
  {
    id: 'regenerative-cattle-grazing',
    name: 'Regenerative Cattle Grazing',
    description:
      'Practical advice on moving cattle to build soil, grow more grass and improve herd health.',
    includes: [
      'Grazing plan and rotation design',
      'Paddock, water and fencing layout',
      'Pasture and soil monitoring',
    ],
    prices: [
      { label: 'Half-day farm visit', price: '$450' },
      { label: 'Full-day visit + written plan', price: '$950' },
    ],
  },
  {
    id: 'agroforestry',
    name: 'Agroforestry',
    description:
      'Bring trees back into your farm for shade, shelter, habitat and new income.',
    includes: [
      'Site assessment and species selection',
      'Shelterbelt and windbreak design',
      'Planting and establishment plan',
    ],
    prices: [
      { label: 'Half-day farm visit', price: '$450' },
      { label: 'Full-day visit + design', price: '$1,100' },
    ],
  },
  {
    id: 'permaculture-market-gardening',
    name: 'Permaculture Market Gardening',
    description:
      'Set up a productive, small-scale market garden designed with nature rather than against it.',
    includes: [
      'Garden layout and bed design',
      'Crop and succession planning',
      'Irrigation, tools and workflow',
    ],
    prices: [
      { label: 'Half-day garden visit', price: '$400' },
      { label: 'Full-day visit + crop plan', price: '$850' },
    ],
  },
];

export const groupTourAudiences = [
  {
    name: 'Seniors Groups',
    description:
      'A gentle, mostly level walk with plenty of time to sit, ask questions and enjoy morning tea.',
  },
  {
    name: 'Corporate Teams',
    description:
      'Get out of the office and onto the land. Add a long lunch or a hands-on activity for team building.',
  },
  {
    name: 'Schools',
    description:
      'Curriculum-friendly visits covering food, soil, animals and where our food comes from.',
  },
  {
    name: 'Universities',
    description:
      'In-depth field visits on regenerative agriculture, agroforestry and small-scale food production.',
  },
];

// TODO: confirm tour pricing with the farm.
export const groupTourPrices = [
  {
    name: 'Farm Walk',
    duration: '1.5 hours',
    price: '$25 per person',
    note: 'Minimum 10 people',
  },
  {
    name: 'Farm Walk & Morning Tea',
    duration: '2.5 hours',
    price: '$40 per person',
    note: 'Minimum 10 people',
  },
  {
    name: 'Farm Tour & Long Lunch',
    duration: '4 hours',
    price: '$110 per person',
    note: 'Minimum 15 people',
  },
  {
    name: 'School Excursion',
    duration: 'Half day',
    price: '$18 per student',
    note: 'Teachers free',
  },
];
