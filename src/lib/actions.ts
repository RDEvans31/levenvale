'use server';

import { signIn, signOut } from '@/lib/auth';

export async function handleSignIn() {
  await signIn();
}

export async function signInWithMagicLink(formData: FormData) {
  'use server';
  try {
    await signIn('nodemailer', formData, { redirectTo: '/authorized' });
  } catch (error) {
    // Signin can fail for a number of reasons, such as the user
    // not existing, or the user not having the correct role.
    // In some cases, you may want to redirect to a custom error
    // if (error instanceof AuthError) {
    //   return redirect(
    //     `${SIGNIN_ERROR_URL}?error=${error.type}`
    //   );
    // }

    // Otherwise if a redirects happens Next.js can handle it
    // so you can just re-thrown the error and let Next.js handle it.
    // Docs:
    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
    throw error;
  }
}
export async function handleSignOut(redirectUrl: string = '/login') {
  await signOut({ redirectTo: redirectUrl });
}
