'use client';

import { ChevronDown } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface CollapsibleProps {
  title: string;
  children: ReactNode;
  color?: 'green' | 'blue' | 'indigo' | 'orange' | 'gray';
  defaultOpen?: boolean;
}

const colorVariants = {
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    hover: 'hover:bg-green-100',
    text: 'text-green-800',
    icon: 'text-green-600',
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100',
    text: 'text-blue-800',
    icon: 'text-blue-600',
  },
  indigo: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    hover: 'hover:bg-purple-100',
    text: 'text-purple-800',
    icon: 'text-purple-600',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    hover: 'hover:bg-orange-100',
    text: 'text-orange-800',
    icon: 'text-orange-600',
  },
  gray: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    hover: 'hover:bg-gray-100',
    text: 'text-gray-800',
    icon: 'text-gray-600',
  },
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
    <div className={`${colors.bg} rounded-lg border ${colors.border}`}>
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
