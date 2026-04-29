"use client";

import React from 'react';

interface ToggleGroupProps {
  label?: string;
  name: string;
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  className?: string;
  fullWidth?: boolean;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({ 
  label, 
  name, 
  value, 
  onChange,
  options,
  className = '',
  fullWidth = true
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-sm font-bold text-primary-blue">{label}</label>}
      <div className={`flex border border-secondary-blue rounded overflow-hidden ${fullWidth ? 'w-full' : 'w-fit min-w-[220px]'}`}>
        {options.map((opt, index) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`
              flex-1 py-4 px-4 text-sm font-bold transition-all text-center
              ${value === opt.value 
                ? 'bg-secondary-blue text-white' 
                : 'bg-white text-secondary-blue hover:bg-slate-50'}
              ${index < options.length - 1 ? 'border-r border-secondary-blue' : ''}
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToggleGroup;
