import { getMembershipId } from '@/actions/members/membership';
import NextAuth, { type DefaultSession } from 'next-auth';
import { Pool } from 'pg';
import authConfig from './auth.config';
import { CustomPrismaAdapter } from './custom-adapter';
import { getDbConfigFromUrl } from './helper/dbConfig';

const pool = new Pool(getDbConfigFromUrl());

declare module 'next-auth' {
  interface Session {
    user: {
      role?: string;
      membershipId?: string;
    } & DefaultSession['user'];
  }

  interface User {
    role?: string;
    membershipId?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: CustomPrismaAdapter(pool),
  pages: {
    signIn: '/login',
    verifyRequest: '/login/check-email',
  },
  session: {
    strategy: 'jwt',
  },
  cookies: {
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && user.id) {
        token.id = user.id;
        token.refresh_token = account?.refresh_token;
        token.name = user.name;
        token.role = 'basic';
        await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate/user/${user.id}/membership`
        );
        const membershipResult = await getMembershipId(user.id);
        if (membershipResult.success) {
          token.membershipId = membershipResult.value.membershipId;
          token.role = membershipResult.value.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string | undefined;
        session.user.name = token.name as string | undefined;
        session.user.membershipId = token.membershipId as string | undefined;
      }
      return session;
    },
  },
  ...authConfig,
});
