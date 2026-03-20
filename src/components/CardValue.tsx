import React from 'react';

interface CardValueProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CardValue: React.FC<CardValueProps> = ({ icon, title, description }) => (
  <div className="p-6 flex flex-col items-center text-center max-w-[270px]">
    <div className="mb-4">{icon}</div>
    <h3 className="font-semibold text-brown-dark text-lg mb-2">{title}</h3>
    <p className="text-brown text-sm">{description}</p>
  </div>
);

export default CardValue;
