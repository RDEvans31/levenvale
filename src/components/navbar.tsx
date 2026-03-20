'use client';

import { Key, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    // { name: "Products", href: "/products" },
    // { name: "Farm Store", href: "/store" },
    // { name: "Visit Us", href: "/visit" },
    // { name: 'Learning Freely', href: '/learning-freely' },
    // { name: 'Biodiversity Net Gain', href: '/biodiversity-units' },
  ];

  return (
    <nav
      className={`group sticky top-0 z-50 transition-all duration-200 hover:bg-white hover:shadow-sm ${
        menuOpen ? 'bg-white/50 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          {/* Left - Home link */}
          <div className="flex-1 md:flex-none flex items-center">
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white group-hover:text-black hover:underline font-medium transition duration-150"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Center - Logo */}
          <div className="flex items-center justify-center mx-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden">
                <Image
                  src="/levenvale-logo.png"
                  alt="Levenvale"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Right - Sign In / Members */}
          <div className="flex-1 md:flex-none flex items-center justify-end">
            <div className="hidden md:flex items-center space-x-6">
              {session ? (
                <Link
                  key="members"
                  href="/members-v2"
                  className="text-white group-hover:text-black hover:underline font-medium transition duration-150 flex items-center gap-2"
                >
                  Members
                  <User className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  key="sign-in"
                  href="/login"
                  className="text-white group-hover:text-black hover:underline font-medium transition duration-150 flex items-center gap-2"
                >
                  Sign In
                  <Key className="h-4 w-4" />
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white group-hover:text-black focus:outline-none"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden shadow-lg bg-white/50 backdrop-blur-sm">
          <div className="px-4 pt-2 pb-4 space-y-2 border-t">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-green-700 font-medium hover:bg-green-100 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {session ? (
              <Link
                key="members-portal"
                href="/members-v2"
                className="block px-3 py-2 text-green-700 hover:bg-green-100 rounded-md font-medium transition duration-150 flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                Members Portal
                <Key className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                key="sign-in"
                href="/login"
                className="block px-3 py-2 text-green-700 hover:bg-green-100 rounded-md font-medium transition duration-150 flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
                <Key className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
