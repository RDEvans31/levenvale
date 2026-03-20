import Image from 'next/image';
import React from 'react';

interface CardFoodProps {
  image_path?: string;
  title: string;
  description: string;
}

const CardFood: React.FC<CardFoodProps> = ({
  image_path,
  title,
  description,
}) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md">
    {image_path && (
      <div className="relative h-48 w-full">
        <Image src={image_path} alt={title} fill className="object-cover" />
      </div>
    )}
    <div className="p-6">
      <h3 className="text-xl text-black font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

export default CardFood;
