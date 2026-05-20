"use client";

import React, { useState, useEffect, useRef } from 'react';

interface SelectFieldProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  optional?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ 
  label, 
  name, 
  options, 
  optional, 
  className = '',
  value,
  onChange,
  placeholder = 'Select',
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard events (Escape to close)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (val: string) => {
    if (onChange) {
      // Simulate standard select change event for full backward compatibility
      const event = {
        target: { name, value: val },
        currentTarget: { name, value: val }
      } as unknown as React.ChangeEvent<HTMLSelectElement>;
      onChange(event);
    }
    setIsOpen(false);
  };

  const getDisplayLabel = (val: string | undefined) => {
    if (!val) return placeholder;
    const selectedOpt = options.find(opt => opt.value === val);
    if (!selectedOpt) return placeholder;
    
    // Custom logic: if the label contains a colon (e.g. "Fall Only 2026: 08/24/2026 - ..."),
    // show only the name (the part before the colon) when the dropdown is closed.
    if (selectedOpt.label.includes(':')) {
      return selectedOpt.label.split(':')[0].trim();
    }
    return selectedOpt.label;
  };

  const displayLabel = getDisplayLabel(value);
  const hasValue = !!value;

  return (
    <div ref={containerRef} className={`flex flex-col gap-2 relative ${className}`}>
      <label htmlFor={name} className="text-sm font-bold text-primary-blue select-none">
        {label}
        {optional && <span className="font-normal text-gray-500 ml-1">(optional)</span>}
      </label>
      
      <div className="relative">
        <button
          id={name}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full pl-4 pr-12 py-3 rounded border text-left outline-none transition-all duration-200 cursor-pointer flex items-center justify-between bg-white
            ${error ? 'border-red-600 ring-1 ring-red-600' : isOpen ? 'border-secondary-blue ring-1 ring-secondary-blue' : 'border-gray-300 hover:border-gray-400'}
            ${hasValue ? 'text-gray-900 font-medium' : 'text-gray-400'}
          `}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="truncate">{displayLabel}</span>
          
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-secondary-blue">
            <svg 
              className={`w-4 h-4 fill-current transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </button>

        {/* Dropdown Options List */}
        <div 
          className={`
            absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg transition-all duration-200 ease-out origin-top
            ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
          `}
          role="listbox"
        >
          {placeholder && (
            <button
              type="button"
              onClick={() => handleSelect('')}
              className={`w-full text-left px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 transition-colors flex items-center justify-between border-b border-gray-100 cursor-pointer ${!value ? 'bg-blue-50/50 text-secondary-blue font-bold' : ''}`}
              role="option"
              aria-selected={!value}
            >
              <span>{placeholder}</span>
              {!value && (
                <svg className="w-4 h-4 text-secondary-blue flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          )}
          
          {options.map(opt => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between border-b border-gray-50 last:border-b-0 cursor-pointer ${isSelected ? 'bg-blue-50/50 text-secondary-blue font-bold' : ''}`}
                role="option"
                aria-selected={isSelected}
              >
                <span className="pr-4 leading-snug">{opt.label}</span>
                {isSelected && (
                  <svg className="w-4 h-4 text-secondary-blue flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {error && (
        <div className="flex items-center gap-2 mt-1">
          <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] flex-none font-bold">
            !
          </div>
          <span className="text-sm text-red-600 font-bold">{error}</span>
        </div>
      )}
    </div>
  );
};

export default SelectField;
