import type { NextAuthConfig } from 'next-auth';
import { Provider } from 'next-auth/providers';
import Nodemailer from 'next-auth/providers/nodemailer';
import { sendVerificationRequest } from './helper/sendVerificationEmail';

const providers: Provider[] = [
  Nodemailer({
    server: {
      pool: true,
      maxConnections: 10,
      maxMessages: 100,
      secure: true,
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || '465'),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
    sendVerificationRequest({
      identifier: email,
      url,
      provider: { server, from },
    }) {
      return sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
        theme: {
          brandColor: '#064526',
          buttonText: '#ffffff',
        },
      });
    },
  }),
];
export default {
  providers,
} satisfies NextAuthConfig;
