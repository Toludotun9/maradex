"use client";

import React from 'react';

interface SelectFieldProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  optional?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ 
  label, 
  name, 
  options, 
  optional, 
  className = '',
  value,
  onChange
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-sm font-bold text-primary-blue">
        {label}
        {optional && <span className="font-normal text-gray-500 ml-1">(optional)</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 rounded border border-gray-300 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue outline-none appearance-none transition-all text-gray-700 bg-white"
        >
          <option value="">Select</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-secondary-blue">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectField;
