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
          ? 'bg-[#f0f9ff]/70 border-[#0084c9] border-2 shadow-md shadow-blue-500/5' 
          : 'bg-white border-[#cdd6e2] hover:bg-slate-50/50 hover:border-slate-400'
        }
      `}
      onClick={onClick}
    >
      {/* Icon Area */}
      <div className="flex-none w-14 h-14 flex items-center justify-center">
        {icon}
      </div>

      {/* Text Area */}
      <div className="flex-grow">
        <h3 className="text-xl font-extrabold text-[#13325b] mb-1 tracking-tight">
          {title}
        </h3>
        <p className="text-[14.5px] font-medium text-[#556b82] leading-relaxed">
          {description}
        </p>
      </div>
    </button>
  );
};

export default SelectionCard;
