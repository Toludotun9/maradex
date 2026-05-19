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
      type="button"
      className={`
        flex items-center gap-6 p-8 rounded-xl border transition-all duration-300 w-full text-left cursor-pointer outline-none min-h-[140px]
        ${isActive 
          ? 'bg-[#104f7f] border-[#0084c9] border-2 shadow-lg shadow-blue-900/10' 
          : 'bg-white border-[#cdd6e2] hover:bg-slate-50/50 hover:border-slate-400'
        }
      `}
      onClick={onClick}
    >
      {/* Icon Area - Forcing all descendant SVG paths/circles to stroke-white when selected */}
      <div 
        className={`
          flex-none w-14 h-14 flex items-center justify-center transition-all duration-300
          ${isActive ? '[&_*]:stroke-white [&_rect]:stroke-white' : ''}
        `}
      >
        {icon}
      </div>

      {/* Text Area */}
      <div className="flex-grow">
        <h3 
          className={`
            text-lg md:text-xl font-extrabold mb-1 tracking-tight transition-colors duration-300
            ${isActive ? 'text-white' : 'text-[#13325b]'}
          `}
        >
          {title}
        </h3>
        <p 
          className={`
            text-[13px] md:text-[14.5px] font-medium leading-relaxed transition-colors duration-300
            ${isActive ? 'text-white/90' : 'text-[#556b82]'}
          `}
        >
          {description}
        </p>
      </div>
    </button>
  );
};

export default SelectionCard;
