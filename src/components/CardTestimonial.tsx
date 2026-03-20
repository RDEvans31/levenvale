import { Quote } from 'lucide-react';
import Image from 'next/image';

interface CardTestimonialProps {
  name: string;
  quote: string;
  imageSrc?: string;
}

export default function CardTestimonial({
  name,
  quote,
  imageSrc,
}: CardTestimonialProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        {imageSrc && (
          <div className="relative w-16 h-16 mb-4">
            <Image
              src={imageSrc}
              alt={`${name}'s profile picture`}
              fill
              className="rounded-full object-cover"
            />
          </div>
        )}
        <h3 className="text-gray-900 font-medium mb-4">{name}</h3>
        <div className="relative">
          <Quote />
          <p className="text-gray-600 relative z-10">{quote}</p>
        </div>
      </div>
    </div>
  );
}
