import { getOrgInfo } from '@/actions/members/org-info';
import { auth } from '@/lib/auth';
import {
  LF_API_KEY,
  LF_API_URL,
  ORG_ID,
} from '@/lib/little-farma/little-farma';
import { NextResponse } from 'next/server';

// Creates the PaymentIntent on the farm's Stripe Connect account via the
// Little Farma platform, which also applies the platform application fee.
export async function POST(req: Request) {
  try {
    const authSession = await auth();
    if (!authSession) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return new NextResponse('API configuration missing', { status: 500 });
    }

    const body: { total: number } = await req.json();
    const total = Number(body.total);

    if (!Number.isFinite(total) || total <= 0) {
      return new NextResponse('Total is required', { status: 400 });
    }

    const orgInfoResult = await getOrgInfo();
    if (!orgInfoResult.success) {
      console.error('Failed to load org info:', orgInfoResult.error);
      return new NextResponse('Failed to load organisation', { status: 502 });
    }

    // Stripe minor units (cents/pence).
    const amount = Math.round(total * 100);
    const currency = orgInfoResult.value.localCurrency.toLowerCase();
    const customerName =
      authSession.user.name?.trim() ||
      authSession.user.email?.trim() ||
      'Unknown customer';

    const res = await fetch(`${LF_API_URL}/${ORG_ID}/paymentIntent`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        description: `Top up - ${customerName}`,
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

    const data: { clientSecret: string } = await res.json();

    return NextResponse.json({
      clientSecret: data.clientSecret,
      amount,
      currency,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
