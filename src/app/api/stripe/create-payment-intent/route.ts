import { auth } from '@/lib/auth';
import {
  LF_API_KEY,
  LF_API_URL,
  ORG_ID,
} from '@/lib/little-farma/little-farma';
import { formatAmountForStripe } from '@/lib/stripe';
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

    const res = await fetch(`${LF_API_URL}/${ORG_ID}/paymentIntent`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'gbp',
        metadata: { note: 'user top up' },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Payment intent API error:', res.status, text);
      return new NextResponse('Failed to create payment intent', {
        status: res.status,
      });
    }

    const data = await res.json();

    return NextResponse.json({
      clientSecret: data.clientSecret,
      amount,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
