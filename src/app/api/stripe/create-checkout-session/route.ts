import { auth } from '@/lib/auth';
import {
  LF_API_KEY,
  LF_API_URL,
  ORG_ID,
} from '@/lib/little-farma/little-farma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const authSession = await auth();
    const customerEmail = authSession?.user.email;
    if (!customerEmail) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const formData = await req.formData();
    const lookupKey = formData.get('lookup_key') as string;

    if (!lookupKey) {
      return new NextResponse('Lookup key is required', { status: 400 });
    }

    const res = await fetch(`${LF_API_URL}/${ORG_ID}/checkout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lookupKey,
        customerEmail,
        successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/subscribed?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/not-subscribed?canceled=true`,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Checkout API error:', res.status, text);
      return new NextResponse('Failed to create checkout session', {
        status: res.status,
      });
    }

    const data = await res.json();
    return NextResponse.redirect(data.checkoutUrl, 303);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
