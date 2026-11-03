import { ChevronDown, Heart, Menu, Search, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const announcement = 'Farm stays. Real experiences. Reconnect in Bellingen.';

export const stayLinks = [
  { name: 'Farm Stays', href: '/stay' },
  { name: "Bickell's Hut", href: '/stay#bickells-hut' },
  { name: "Baker's Hut", href: '/stay#bakers-hut' },
  { name: 'Farmhouse', href: '/stay#farmhouse' },
  { name: 'Camping', href: '/stay#camping' },
];

const navLinks = [
  { name: 'Our Story', href: '/our-story' },
  { name: 'Experiences', href: '/experiences' },
  { name: 'Shop Bello Beef', href: '/shop-bello-beef' },
];

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className="block shrink-0">
      <Image
        src="/levenvale-wordmark.png"
        alt="Levenvale Farm, Bellingen"
        width={244}
        height={134}
        priority
        className={className}
      />
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <header className="bg-white">
      {/* Announcement ticker */}
      <div className="flex h-[31px] items-center overflow-hidden bg-forest text-[15px] text-white">
        <div className="flex w-max animate-marquee-slow whitespace-nowrap">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-3 px-6">
              <span className="h-1 w-1 rounded-full bg-white" />
              {announcement}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid h-[88px] max-w-[1440px] grid-cols-[1fr_auto] items-center gap-6 px-4 sm:px-8 md:h-[114px] md:grid-cols-[1fr_auto_1fr]">
        <Logo className="h-auto w-[118px] md:w-[161px]" />

        <form
          action="/"
          className="relative hidden h-7 w-[min(498px,40vw)] md:block"
        >
          <input
            type="search"
            name="q"
            placeholder="Search..."
            className="h-full w-full rounded-[3px] border border-gray-300 pl-3 pr-9 text-[13px] placeholder:text-gray-800 focus:border-leaf focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-[3px] top-[3px] flex h-[22px] w-[22px] items-center justify-center rounded-[3px] bg-leaf text-neutral-900 hover:bg-leaf-dark"
          >
            <Search className="h-3 w-3" strokeWidth={2.5} />
          </button>
        </form>

        <div className="flex items-center justify-end gap-[15px] text-neutral-900">
          <Link
            href="/shop-bello-beef"
            aria-label="Wishlist"
            className="hidden hover:text-forest sm:block"
          >
            <Heart className="h-5 w-5" strokeWidth={1.75} />
          </Link>
          <Link
            href="/shop-bello-beef"
            aria-label="Cart"
            className="relative hover:text-forest"
          >
            <ShoppingBasket className="h-5 w-5" strokeWidth={1.75} />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-leaf" />
          </Link>
          <a
            href="https://littlefarma.io/bello_beef"
            className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-[3px] bg-leaf px-3 text-xs font-medium uppercase text-neutral-900 transition hover:bg-leaf-dark sm:px-4 sm:text-sm"
          >
            Members Portal
          </a>

          {/* Mobile menu (no JS) */}
          <details className="relative md:hidden">
            <summary className="cursor-pointer list-none" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </summary>
            <nav className="absolute right-0 top-9 z-50 w-56 rounded border border-gray-200 bg-white py-2 shadow-lg">
              <Link
                href="/our-story"
                className="block px-4 py-2 text-sm hover:bg-beige"
              >
                Our Story
              </Link>
              {stayLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2 text-sm hover:bg-beige"
                >
                  {link.name === 'Farm Stays' ? 'Stay' : `— ${link.name}`}
                </Link>
              ))}
              <Link
                href="/experiences"
                className="block px-4 py-2 text-sm hover:bg-beige"
              >
                Experiences
              </Link>
              <Link
                href="/shop-bello-beef"
                className="block px-4 py-2 text-sm hover:bg-beige"
              >
                Shop Bello Beef
              </Link>
            </nav>
          </details>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:block">
        <ul className="flex h-[67px] items-center justify-center gap-14 text-base font-medium uppercase text-neutral-900">
          <li>
            <Link href={navLinks[0].href} className="hover:text-forest">
              {navLinks[0].name}
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/stay"
              className="flex items-center gap-2 hover:text-forest"
            >
              Stay{' '}
              <ChevronDown className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </Link>
            <ul className="invisible absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <li className="rounded border border-gray-200 bg-white py-2 shadow-lg">
                {stayLinks.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-base normal-case hover:bg-beige"
                  >
                    {link.name}
                  </Link>
                ))}
              </li>
            </ul>
          </li>
          {navLinks.slice(1).map(link => (
            <li key={link.name}>
              <Link href={link.href} className="hover:text-forest">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
