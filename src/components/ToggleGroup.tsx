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
        ${error ? 'border-red-600' : (isProgram ? 'border border-gray-300' : 'border border-secondary-blue')} 
        ${fullWidth ? 'w-full' : 'w-fit min-w-[220px]'}
        border
      `}>
        {options.map((opt, index) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`
              flex-1 transition-all text-center flex flex-col items-center justify-center
              ${isProgram ? 'py-6 px-4 gap-3' : (opt.icon ? 'py-5 px-3 gap-2' : 'py-4 px-4')}
              ${value === opt.value 
                ? (isProgram ? 'bg-blue-50 border-b-[6px] border-b-secondary-blue -mb-[0px]' : 'bg-secondary-blue text-white') 
                : (isProgram ? 'bg-white text-primary-blue hover:bg-slate-50' : 'bg-white text-secondary-blue hover:bg-slate-50')}
              ${index < options.length - 1 ? (isProgram ? (error ? 'border-b sm:border-b-0 sm:border-r border-red-600' : 'border-b sm:border-b-0 sm:border-r border-gray-300') : (error ? 'border-b sm:border-b-0 sm:border-r border-red-600' : 'border-b sm:border-b-0 sm:border-r border-secondary-blue')) : ''}
              ${isProgram ? 'font-bold text-xs' : 'font-bold text-sm'}
            `}
          >
            {opt.icon && (
              <div className={`flex items-center justify-center ${isProgram ? 'h-10' : 'h-8'}`}>
                {opt.icon}
              </div>
            )}
            <span className={isProgram && value === opt.value ? 'text-secondary-blue' : ''}>
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
