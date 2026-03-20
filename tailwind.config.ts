import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-lora)', 'serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        forest: '#064526',
        forestDark: '#053a20',
        ebony: '#2A2338',
        lint: '#E5F2C9',
        cream: '#FAF6EC',
        beige: '#FAF9DF',
        brown: {
          DEFAULT: '#8B5E3C',
          dark: '#5C3A1E',
          light: '#C49A6C',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
