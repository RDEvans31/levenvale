'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type Testimonial = { quote: string; author: string; image: string };

export default function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];
  const canCycle = testimonials.length > 1;

  const go = (step: number) =>
    setIndex(i => (i + step + testimonials.length) % testimonials.length);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[28px] font-bold leading-tight md:text-[45px]">
          Loved by Our Tribe
        </h2>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            disabled={!canCycle}
            className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-brand-black bg-white text-brand-black hover:bg-brand-black hover:text-brand-white disabled:cursor-default md:h-12 md:w-12"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            disabled={!canCycle}
            className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-brand-green text-brand-black hover:bg-brand-black hover:text-brand-white disabled:cursor-default md:h-12 md:w-12"
          >
            <ArrowRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 items-center gap-8 md:mt-16 md:grid-cols-[251px_1fr] md:gap-0">
        <div className="relative aspect-[251/320] w-40 overflow-hidden rounded-md md:w-full">
          <Image
            src={current.image}
            alt={current.author}
            fill
            sizes="251px"
            className="object-cover"
          />
        </div>
        <blockquote className="max-w-[1000px] md:pl-12 lg:pl-24">
          <p className="text-lg font-medium leading-normal md:text-[25px] md:leading-[1.45]">
            &ldquo;{current.quote}&rdquo;
          </p>
          <footer className="mt-5 text-lg font-semibold text-neutral-700 md:text-xl">
            {current.author}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
