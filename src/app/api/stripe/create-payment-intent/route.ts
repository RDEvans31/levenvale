import { auth } from '@/lib/auth';
import { formatAmountForStripe, stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const authSession = await auth();
    if (!authSession) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const body: { total: number } = await req.json();
    const total = body.total;

    if (!total) {
      return new NextResponse('Total is required', { status: 500 });
    }
    const amount = formatAmountForStripe(total);

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'gbp',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        note: 'user top up',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
