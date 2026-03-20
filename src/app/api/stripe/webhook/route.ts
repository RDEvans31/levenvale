import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';
import { notifyLittleFarmaInvoicePaid } from './actions';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event;

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not defined');
    throw new Error('STRIPE_WEBHOOK_SECRET is not defined');
  }

  const endpointSecret =
    process.env.STRIPE_WEBHOOK_SECRET ??
    'whsec_3e16aaabcd8c3b3be1d9375b31cd36fff364ba78ed29315f29ac0faed36d53c2';

  try {
    if (endpointSecret) {
      // Verify webhook signature and extract the event.
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } else {
      // If no endpointSecret is defined, just parse the JSON.
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.log(`⚠️ Webhook signature verification failed.`, err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
  // Handle the event
  switch (event.type) {
    case 'invoice.paid':
      const invoice = event.data.object;
      const notifyResult = await notifyLittleFarmaInvoicePaid(invoice);
      if (!notifyResult.success) {
        console.error('Failed to notify Little Farma:', notifyResult.error);
      }
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
