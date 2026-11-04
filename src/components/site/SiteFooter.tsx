import { Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';
import { BELLO_BEEF_STORE_URL } from '@/lib/site-links';
import Link from 'next/link';
import { Logo, stayLinks } from './SiteHeader';

const columns = [
  { title: 'Stay', links: stayLinks },
  {
    title: 'Experience',
    links: [
      { name: 'Events', href: '/experiences#events' },
      { name: 'Education', href: '/experiences#education' },
      { name: 'Consultancy', href: '/experiences#consultancy' },
      { name: 'Venue Hire + Celebrations', href: '/experiences#venue-hire' },
      { name: 'Group Farm Tours', href: '/experiences/group-farm-tours' },
    ],
  },
  {
    title: 'Our Story',
    links: [
      { name: 'Our Farm', href: '/our-farm' },
      { name: 'Our Practices', href: '/our-farm#regenerative-agriculture' },
      { name: 'Bello Beef', href: BELLO_BEEF_STORE_URL },
      { name: 'Farm Shop', href: '/shop-bello-beef' },
      { name: 'Community', href: '/our-farm#community-and-partnerships' },
    ],
  },
  {
    title: 'Contact',
    links: [
      {
        name: 'visit@levenvalefarm.com.au',
        href: 'mailto:visit@levenvalefarm.com.au',
      },
      {
        name: 'orders@bellobeef.com.au',
        href: 'mailto:orders@bellobeef.com.au',
      },
      {
        name: 'thepatch.bellingen@gmail.com',
        href: 'mailto:thepatch.bellingen@gmail.com',
      },
      { name: 'hello@bellobeef.com.au', href: 'mailto:hello@bellobeef.com.au' },
      {
        name: 'Get Directions',
        href: 'https://maps.google.com/?q=Levenvale+Farm+Bellingen+NSW',
      },
    ],
  },
];

const policies = [
  'Privacy Policy',
  'Shipping Policy',
  'Refund Policy',
  'Terms of Service',
];

export default function SiteFooter() {
  return (
    <footer className="bg-white px-4 pt-12 pb-8 sm:px-8 md:pt-16 lg:px-16">
      <div className="mx-auto max-w-[1312px]">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Logo className="h-auto w-[180px] md:w-[232px]" />
          <Image
            src="/payment-methods.png"
            alt="We accept PayPal, Mastercard, Visa, American Express, Apple Pay, Shop Pay, Google Pay and UnionPay"
            width={444}
            height={36}
            className="h-auto w-full max-w-[444px]"
          />
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 md:mt-[84px] md:grid-cols-4 md:gap-x-0 lg:grid-cols-[repeat(3,318px)_1fr]">
          {columns.map(column => (
            <div
              key={column.title}
              className="last:col-span-2 md:last:col-span-1"
            >
              <h3 className="text-lg font-semibold uppercase md:text-xl">
                {column.title}
              </h3>
              <ul className="mt-6 space-y-4 text-sm text-neutral-700">
                {column.links.map(link => (
                  <li key={link.name} className="break-words">
                    <Link href={link.href} className="link-hover">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-gray-200 pt-6 text-sm text-brand-black md:mt-[78px] md:flex-row md:items-center md:justify-between md:pt-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-[25px]">
            <p>
              Copyright © {new Date().getFullYear()} Levenvale Farm ·
              Bellingen, NSW. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-[25px] gap-y-2">
              {policies.map(policy => (
                <li key={policy}>
                  <Link
                    href="#"
                    className="underline underline-offset-2 link-hover"
                  >
                    {policy}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-2.5">
            <a
              href="https://www.facebook.com/"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-brand-green text-brand-black hover:bg-brand-black hover:text-brand-white"
            >
              <Facebook
                className="h-[18px] w-[18px]"
                fill="currentColor"
                strokeWidth={0}
              />
            </a>
            <a
              href="https://www.instagram.com/"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-brand-green text-brand-black hover:bg-brand-black hover:text-brand-white"
            >
              <Instagram className="h-5 w-5" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
