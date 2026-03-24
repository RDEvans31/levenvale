'use client';

import DOMPurify from 'dompurify';
import { ArrowRight, Key } from 'lucide-react';
import { useMemo } from 'react';

type CardSubscriptionProps = {
  name: string;
  description: string;
  features: string[];
  lookupKey: string;
  backgroundColor: string;
  accentColor: string;
  textColor: string;
};

export default function CardSubscription({
  name,
  description,
  features,
  lookupKey,
  backgroundColor,
  accentColor,
  textColor,
}: CardSubscriptionProps) {
  const sanitizedDescription = useMemo(() => {
    if (typeof window === 'undefined') return description;
    return DOMPurify.sanitize(description);
  }, [description]);

  return (
    <div
      className="relative max-w-sm w-full rounded-3xl shadow-xl overflow-hidden p-8 flex flex-col gap-6 border-2"
      style={{ backgroundColor, color: textColor, borderColor: accentColor }}
    >
      {/* Icon */}
      <div className="flex justify-center mb-2">
        <div
          className="rounded-full w-16 h-16 flex items-center justify-center"
          style={{ backgroundColor: `${textColor}15` }}
        >
          <Key size={36} style={{ color: textColor }} />
        </div>
      </div>
      {/* Title */}
      <div className="flex justify-center">
        <span
          className="px-6 py-2 rounded-full text-sm font-semibold tracking-widest"
          style={{ backgroundColor: `${textColor}20` }}
        >
          {name.toUpperCase()}
        </span>
      </div>
      {/* Description */}
      <div
        className="text-center text-lg mb-2 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-2"
        style={{ color: `${textColor}e6` }}
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
      {/* Features */}
      <ul className="space-y-3 mb-4">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <span
              className="rounded-full w-7 h-7 flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${textColor}20` }}
            >
              <ArrowRight size={16} />
            </span>
            <span className="font-semibold">{feature}</span>
          </li>
        ))}
      </ul>
      <div
        className="mt-auto block w-full font-semibold py-3 rounded-full text-center text-lg flex items-center justify-center gap-2 transition-opacity"
        style={{
          backgroundColor: accentColor,
          color: backgroundColor,
        }}
      >
        <form action="/api/stripe/create-checkout-session" method="POST">
          <input type="hidden" name="lookup_key" value={lookupKey} />
          <button id={`checkout-btn-${lookupKey}`} type="submit">
            Become a member
          </button>
        </form>
      </div>
    </div>
  );
}
