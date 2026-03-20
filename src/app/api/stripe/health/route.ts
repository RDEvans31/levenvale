import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await stripe.balance.retrieve();
    return NextResponse.json(
      {
        status: 'healthy',
        message: 'Stripe connection successful',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Stripe connection failed:', error.message);
    return NextResponse.json(
      { status: 'unhealthy', error: error.message },
      { status: 500 }
    );
  }
}
