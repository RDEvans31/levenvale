import { auth } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
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

    const prices = await stripe.prices.list({
      lookup_keys: [lookupKey],
      expand: ['data.product'],
    });

    if (!prices.data.length) {
      return new NextResponse('Price not found', { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/subscribed?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/not-subscribed?canceled=true`,
    });

    return NextResponse.redirect(session.url as string, 303);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
