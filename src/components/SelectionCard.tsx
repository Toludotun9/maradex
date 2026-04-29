'use client';

import React from 'react';

interface SelectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const SelectionCard: React.FC<SelectionCardProps> = ({ 
  title, 
  description, 
  icon, 
  isActive = false, 
  onClick 
}) => {
  return (
    <button 
      className={`
        flex items-start gap-4 p-6 rounded border transition-all duration-200 w-full h-full text-left cursor-pointer
        ${isActive ? 'bg-sallie-blue border-transparent' : 'bg-white border-sallie-blue hover:bg-slate-50'}
      `}
      onClick={onClick}
    >
      <div className={`flex-none w-10 h-10 flex items-center justify-center transition-colors duration-200 ${isActive ? 'text-white' : 'text-secondary-blue'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className={`text-2xl font-bold mb-2 leading-tight ${isActive ? 'text-white' : 'text-secondary-blue'}`}>
          {title}
        </h3>
        <p className={`text-lg font-medium leading-normal ${isActive ? 'text-white' : 'text-gray-800'}`}>
          {description}
        </p>
      </div>
    </button>
  );
};

export default SelectionCard;
