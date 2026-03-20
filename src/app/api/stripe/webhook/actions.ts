import { getMembershipIdByEmail } from '@/actions/members/membership';
import {
  LF_API_KEY,
  LF_API_URL,
  ORG_ID,
} from '@/lib/little-farma/little-farma';
import { stripe } from '@/lib/stripe';
import { Result } from '@/types/result';
import { revalidateTag } from 'next/cache';
import Stripe from 'stripe';
import { LittleFarmaEvent } from './types';

async function getCustomerDetails(
  customerId: string
): Promise<Result<{ name: string | null; email: string | null }>> {
  let customerEmail: string | null;
  let customerName: string | null = null;

  try {
    if (!customerId) {
      throw new Error('Customer ID is missing from subscription');
    }

    // Retrieve the customer from Stripe
    const customer = await stripe.customers.retrieve(customerId);
    // Check if the customer exists and has an email
    if (customer && !customer.deleted && 'email' in customer) {
      customerEmail = customer.email || null;
      customerName = customer.name || null;
    } else {
      throw new Error('Customer email is missing');
    }
    return {
      success: true,
      value: { name: customerName, email: customerEmail },
    };
  } catch (error) {
    console.error('Error fetching customer from Stripe:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function notifyLittleFarmaInvoicePaid(
  invoice: Stripe.Invoice
): Promise<Result<boolean>> {
  try {
    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      return {
        success: false,
        error: 'API configuration missing',
      };
    }

    const customerId = invoice.customer as string;

    // Get customer email from Stripe
    const customerDetailsResult = await getCustomerDetails(customerId);
    if (!customerDetailsResult.success || !customerDetailsResult.value.email) {
      return {
        success: false,
        error: customerDetailsResult.success
          ? 'Customer email not found'
          : customerDetailsResult.error,
      };
    }

    // Get membership ID directly from Little Farma by email (avoids race condition)
    const membershipResult = await getMembershipIdByEmail(
      customerDetailsResult.value.email
    );
    if (!membershipResult.success) {
      return {
        success: false,
        error: membershipResult.error,
      };
    }

    const event: LittleFarmaEvent = {
      type: 'invoice_paid',
      data: {
        membershipId: membershipResult.value.membershipId,
        externalPaymentId: invoice.id,
        amount: invoice.amount_paid,
        currency: invoice.currency,
      },
    };

    const response = await fetch(`${LF_API_URL}/webhooks/stripe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LF_API_KEY}`,
      },
      body: JSON.stringify(event),
    });

    const userId = membershipResult.value.userId;
    revalidateTag(`membershipId-${userId}`);

    if (!response.ok) {
      const errorMsg = await response.text();
      return {
        success: false,
        error: `Failed to notify Little Farma: ${response.status} ${errorMsg}`,
      };
    }

    return {
      success: true,
      value: true,
    };
  } catch (error) {
    console.error('Error notifying Little Farma of invoice paid:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
