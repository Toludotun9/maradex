"use client";

import React from 'react';

interface ToggleGroupProps {
  label?: string;
  name: string;
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string; icon?: React.ReactNode }[];
  className?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'program';
  error?: string;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({ 
  label, 
  name, 
  value, 
  onChange,
  options,
  className = '',
  fullWidth = true,
  variant = 'default',
  error
}) => {
  const isProgram = variant === 'program';

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className={`text-sm font-bold text-primary-blue ${isProgram ? 'mb-4' : ''}`}>
          {label}
        </label>
      )}
      <div className={`
        flex flex-col sm:flex-row rounded overflow-hidden 
        ${error ? 'border-red-600' : (isProgram ? 'border border-secondary-blue' : 'border border-secondary-blue')} 
        ${fullWidth ? 'w-full' : 'w-fit min-w-[220px]'}
        border
      `}>
        {options.map((opt, index) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`
              flex-1 transition-all
              ${isProgram 
                ? 'flex flex-row items-center justify-start py-4 px-6 gap-4 text-left sm:flex-col sm:items-center sm:justify-center sm:py-6 sm:px-4 sm:gap-3 sm:text-center' 
                : (opt.icon ? 'flex flex-col items-center justify-center py-5 px-3 gap-2 text-center' : 'flex flex-col items-center justify-center py-4 px-4 text-center')
              }
              ${value === opt.value 
                ? (isProgram ? 'bg-blue-50 border-b-[4px] sm:border-b-[6px] border-b-secondary-blue -mb-[0px]' : 'bg-secondary-blue text-white') 
                : (isProgram ? 'bg-white text-primary-blue hover:bg-slate-50' : 'bg-white text-secondary-blue hover:bg-slate-50')}
              ${index < options.length - 1 
                ? (error 
                  ? 'border-b sm:border-b-0 sm:border-r border-red-600' 
                  : (isProgram ? 'border-b sm:border-b-0 sm:border-r border-gray-300' : 'border-b sm:border-b-0 sm:border-r border-secondary-blue')
                ) 
                : ''
              }
              ${isProgram ? 'font-bold text-sm sm:text-xs md:text-sm' : 'font-bold text-sm'}
            `}
          >
            {opt.icon && (
              <div className={`flex items-center justify-center ${isProgram ? 'h-8 sm:h-10' : 'h-8'}`}>
                {opt.icon}
              </div>
            )}
            <span className={isProgram && value === opt.value ? 'text-secondary-blue font-bold text-sm sm:text-xs md:text-sm' : ''}>
              {opt.label}
            </span>
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-red-600 font-bold mt-1">{error}</p>}
    </div>
  );
};

export default ToggleGroup;
