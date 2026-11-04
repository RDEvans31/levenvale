'use server';

import { ENQUIRIES_EMAIL } from '@/lib/site-links';
import { createTransport } from 'nodemailer';

const ENQUIRY_TYPES = {
  wedding: 'Wedding',
  'private-event': 'Private event',
  'group-tour': 'Group farm tour',
} as const;

export type EnquiryType = keyof typeof ENQUIRY_TYPES;

type Field = 'name' | 'email' | 'phone' | 'date' | 'guests' | 'message';

export type EnquiryState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<Field, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

export async function sendEnquiry(
  _previous: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  // Bots fill in the hidden field; pretend it worked and send nothing.
  if (field(formData, 'website')) {
    return { status: 'success' };
  }

  const type = field(formData, 'type') as EnquiryType;
  const name = field(formData, 'name');
  const email = field(formData, 'email');
  const phone = field(formData, 'phone');
  const date = field(formData, 'date');
  const guests = field(formData, 'guests');
  const message = field(formData, 'message');

  if (!(type in ENQUIRY_TYPES)) {
    return { status: 'error', message: 'Unknown enquiry type.' };
  }

  const fieldErrors: EnquiryState['fieldErrors'] = {};
  if (!name || name.length > 100) fieldErrors.name = 'Please enter your name.';
  if (!EMAIL_PATTERN.test(email) || email.length > 200)
    fieldErrors.email = 'Please enter a valid email address.';
  if (phone.length > 40) fieldErrors.phone = 'Phone number is too long.';
  if (date.length > 40) fieldErrors.date = 'Please enter a valid date.';
  if (guests) {
    const count = Number(guests);
    if (!Number.isInteger(count) || count < 1 || count > 5000)
      fieldErrors.guests = 'Please enter a number of guests.';
  }
  if (message.length < 10 || message.length > 3000)
    fieldErrors.message = 'Please tell us a little more (10+ characters).';

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', fieldErrors };
  }

  const {
    EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD,
    EMAIL_FROM,
  } = process.env;

  const unavailable = `Sorry, we couldn't send your enquiry. Please email us at ${ENQUIRIES_EMAIL}.`;

  if (!EMAIL_SERVER_HOST || !EMAIL_SERVER_USER || !EMAIL_SERVER_PASSWORD) {
    console.error('Enquiry email is not configured');
    return { status: 'error', message: unavailable };
  }

  const port = parseInt(EMAIL_SERVER_PORT || '465');
  const label = ENQUIRY_TYPES[type];
  const lines = [
    `${label} enquiry`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    date && `Preferred date: ${date}`,
    guests && `Guests: ${guests}`,
    '',
    message,
  ].filter(line => line !== '');

  try {
    const transport = createTransport({
      host: EMAIL_SERVER_HOST,
      port,
      secure: port === 465,
      auth: { user: EMAIL_SERVER_USER, pass: EMAIL_SERVER_PASSWORD },
    });

    await transport.sendMail({
      from: EMAIL_FROM || EMAIL_SERVER_USER,
      to: ENQUIRIES_EMAIL,
      replyTo: email,
      subject: `${label} enquiry from ${name}`,
      text: lines.join('\n'),
    });

    return { status: 'success' };
  } catch (error) {
    console.error('Failed to send enquiry email:', error);
    return { status: 'error', message: unavailable };
  }
}
