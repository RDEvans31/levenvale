'use client';

import { EnquiryState, EnquiryType, sendEnquiry } from '@/actions/site/enquiry';
import { CheckCircle } from 'lucide-react';
import { useActionState } from 'react';

const initialState: EnquiryState = { status: 'idle' };

const input =
  'mt-1 block w-full rounded-[3px] border border-gray-300 bg-white px-3 py-2 text-base text-brand-black placeholder:text-gray-400 focus:border-brand-black focus:outline-none focus:ring-1 focus:ring-brand-green';
const label = 'block text-sm font-medium text-neutral-800';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-red-600">{message}</p>;
}

export default function EnquiryForm({
  type,
  dateLabel = 'Preferred date',
  guestsLabel = 'Number of guests',
  messagePlaceholder = 'Tell us what you have in mind',
  submitLabel = 'Send Enquiry',
}: {
  type: EnquiryType;
  dateLabel?: string;
  guestsLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(
    sendEnquiry,
    initialState
  );
  const id = (name: string) => `${type}-${name}`;

  if (state.status === 'success') {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-md border border-brand-green bg-white p-5"
      >
        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-black" />
        <p className="text-base text-neutral-800">
          Thanks for getting in touch! We&apos;ve received your enquiry and will
          be back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="type" value={type} />
      {/* Honeypot: hidden from people, filled in by bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={id('website')}>Website</label>
        <input
          id={id('website')}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id('name')} className={label}>
            Name
          </label>
          <input
            id={id('name')}
            name="name"
            type="text"
            autoComplete="name"
            required
            className={input}
          />
          <FieldError message={state.fieldErrors?.name} />
        </div>
        <div>
          <label htmlFor={id('email')} className={label}>
            Email
          </label>
          <input
            id={id('email')}
            name="email"
            type="email"
            autoComplete="email"
            required
            className={input}
          />
          <FieldError message={state.fieldErrors?.email} />
        </div>
        <div>
          <label htmlFor={id('phone')} className={label}>
            Phone <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={input}
          />
          <FieldError message={state.fieldErrors?.phone} />
        </div>
        <div>
          <label htmlFor={id('date')} className={label}>
            {dateLabel}{' '}
            <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input id={id('date')} name="date" type="date" className={input} />
          <FieldError message={state.fieldErrors?.date} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id('guests')} className={label}>
            {guestsLabel}{' '}
            <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input
            id={id('guests')}
            name="guests"
            type="number"
            min={1}
            inputMode="numeric"
            className={input}
          />
          <FieldError message={state.fieldErrors?.guests} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id('message')} className={label}>
            Message
          </label>
          <textarea
            id={id('message')}
            name="message"
            rows={4}
            required
            placeholder={messagePlaceholder}
            className={input}
          />
          <FieldError message={state.fieldErrors?.message} />
        </div>
      </div>

      {state.status === 'error' && state.message && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-10 items-center justify-center rounded-[3px] bg-brand-green px-6 text-sm font-medium uppercase text-brand-black transition hover:bg-brand-black hover:text-brand-white disabled:opacity-60 sm:text-base"
      >
        {pending ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
}
