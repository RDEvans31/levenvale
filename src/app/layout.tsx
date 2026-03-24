import { auth } from '@/lib/auth';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Lora } from 'next/font/google';
import './globals.css';

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
});

const requiredEnvVars = [
  'NEXT_PUBLIC_APP_URL',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'AUTH_SECRET',
  'EMAIL_SERVER_HOST',
  'EMAIL_SERVER_PORT',
  'EMAIL_SERVER_USER',
  'EMAIL_SERVER_PASSWORD',
  'EMAIL_FROM',
  'DATABASE_URL',
  'DIRECT_URL',
  'LF_API_URL',
  'LF_API_KEY',
  'ORG_ID',
] as const;

// Check environment variables
const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(', ')}`
  );
}

export const metadata: Metadata = {
  title: 'Levenvale Farm',
  description: 'Regenerative farm in Bellingen, NSW.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${lora.variable} font-serif antialiased`}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
