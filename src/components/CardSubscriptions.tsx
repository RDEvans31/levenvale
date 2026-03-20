'use client';
import { ArrowRight, Key } from 'lucide-react';
import { useState } from 'react';
import { SignOut } from './navbar/ButtonSignOut';

export default function CardSubscription() {
  const [constitutionChecked, setConstitutionChecked] = useState(false);
  const [handbookChecked, setHandbookChecked] = useState(false);

  const bothChecked = constitutionChecked && handbookChecked;

  return (
    <div className="relative max-w-sm w-full rounded-3xl shadow-xl overflow-hidden bg-gradient-to-br from-[#053a20] to-[#176a3c] p-8 text-white flex flex-col gap-6">
      {/* Icon */}
      <div className="flex justify-center mb-2">
        <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center">
          <Key size={36} className="text-white" />
        </div>
      </div>
      {/* Title */}
      <div className="flex justify-center">
        <span className="bg-white/20 px-6 py-2 rounded-full text-sm font-semibold tracking-widest text-white">
          MEMBERSHIP
        </span>
      </div>
      {/* Price */}
      <div className="text-center">
        <div className="text-5xl font-bold mb-2">£100 / month</div>
      </div>
      {/* Description */}
      <p className="text-center text-lg text-white/90 mb-2">
        Subscribe to gain access to members-only features.
      </p>
      {/* Features */}
      <ul className="space-y-3 mb-4">
        <li className="flex items-center gap-3">
          <span className="bg-white/20 rounded-full w-7 h-7 flex items-center justify-center">
            <ArrowRight size={16} />
          </span>
          <span className="font-semibold">
            £50 fee + £50 worth of food tokens
          </span>
        </li>
        <li className="flex items-center gap-3">
          <span className="bg-white/20 rounded-full w-7 h-7 flex items-center justify-center">
            <ArrowRight size={16} />
          </span>
          <span className="font-semibold">
            Access to Private Community Pantry
          </span>
        </li>
        <li className="flex items-center gap-3">
          <span className="bg-white/20 rounded-full w-7 h-7 flex items-center justify-center">
            <ArrowRight size={16} />
          </span>
          <span className="font-semibold">Covers your household</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="bg-white/20 rounded-full w-7 h-7 flex items-center justify-center">
            <ArrowRight size={16} />
          </span>
          <span className="font-semibold">Access to members-only events</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="bg-white/20 rounded-full w-7 h-7 flex items-center justify-center">
            <ArrowRight size={16} />
          </span>
          <span className="font-semibold">UK-wide next-day delivery</span>
        </li>
      </ul>
      {/* Confirmation checkboxes */}
      <div className="space-y-3 mb-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={constitutionChecked}
            onChange={e => setConstitutionChecked(e.target.checked)}
            className="mt-1 h-5 w-5 accent-[#3ad29f] rounded shrink-0"
          />
          <span className="text-sm text-white/90">
            I confirm that I have read and signed the Constitution
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={handbookChecked}
            onChange={e => setHandbookChecked(e.target.checked)}
            className="mt-1 h-5 w-5 accent-[#3ad29f] rounded shrink-0"
          />
          <span className="text-sm text-white/90">
            I confirm that I have read and signed the Members Handbook
          </span>
        </label>
      </div>
      <div
        className={`mt-auto block w-full bg-gradient-to-r font-semibold py-3 rounded-full text-center text-lg flex items-center justify-center gap-2 transition-colors ${
          bothChecked
            ? 'from-[#3ad29f] to-[#53e7c9] text-[#053a20] hover:from-[#53e7c9] hover:to-[#3ad29f] cursor-pointer'
            : 'from-gray-400 to-gray-500 text-gray-200 cursor-not-allowed'
        }`}
      >
        <form action="/api/stripe/create-checkout-session" method="POST">
          {/* Add a hidden field with the lookup_key of your Price */}
          <input type="hidden" name="lookup_key" value="pmc-100-monthly" />
          <button
            id="checkout-and-portal-button"
            type="submit"
            disabled={!bothChecked}
          >
            Become a member
          </button>
        </form>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-white">Not for you?</p>
        <SignOut className="text-white" />
      </div>
    </div>
  );
}
