import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Levenvale Farm styleguide: Gotham (Book body, Bold subheadings),
      // falling back to Helvetica when Gotham isn't available. LUNCHBOX is
      // the display face for headings/callouts — see `.heading-display`.
      fontFamily: {
        sans: ['Gotham', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        display: [
          'Lunchbox',
          'Gotham',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      letterSpacing: {
        // Styleguide tracking 200-300 (1/1000 em)
        display: '0.2em',
        'display-wide': '0.3em',
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
        // Styleguide palette: green, black and white only. No new colours
        // or pale tints of these.
        brand: {
          green: '#95C93D', // 149/201/61, PMS 375C
          black: '#000000',
          white: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
