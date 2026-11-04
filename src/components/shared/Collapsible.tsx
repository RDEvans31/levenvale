'use client';

import { ChevronDown } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface CollapsibleProps {
  title: string;
  children: ReactNode;
  color?: 'green' | 'blue' | 'indigo' | 'orange' | 'gray';
  defaultOpen?: boolean;
}

// Styleguide palette only (green, black, white). `color` is kept for API
// compatibility: green = brand accent, gray = neutral, others = black outline.
const accent = {
  bg: 'bg-brand-white',
  border: 'border-brand-green',
  hover: 'hover:bg-brand-green',
  text: 'text-brand-black',
  icon: 'text-brand-black',
};
const outline = { ...accent, border: 'border-brand-black' };
const colorVariants = {
  green: accent,
  blue: outline,
  indigo: outline,
  orange: outline,
  gray: { ...accent, border: 'border-gray-200', hover: 'hover:bg-gray-50' },
};

export default function Collapsible({
  title,
  children,
  color = 'green',
  defaultOpen = false,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const colors = colorVariants[color];

  return (
    <div className={`${colors.bg} rounded-lg border-2 ${colors.border}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 text-left ${colors.hover} transition-colors rounded-lg`}
      >
        <h3 className={`text-lg font-medium ${colors.text}`}>{title}</h3>
        <ChevronDown
          className={`${colors.icon} transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          size={20}
        />
      </button>

      {isOpen && <div className={`border-t ${colors.border}`}>{children}</div>}
    </div>
  );
}
