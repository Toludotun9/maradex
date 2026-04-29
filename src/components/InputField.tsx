"use client";

import React, { useState } from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  optional?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  error?: string;
  isSensitive?: boolean;
  formatter?: (val: string) => string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  optional, 
  className = '',
  value = '',
  onChange,
  hint,
  error,
  isSensitive,
  formatter
}) => {
  const [showSensitive, setShowSensitive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formatter && onChange) {
      const formattedValue = formatter(e.target.value);
      const fakeEvent = {
        ...e,
        target: {
          ...e.target,
          name,
          value: formattedValue
        }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(fakeEvent);
    } else if (onChange) {
      onChange(e);
    }
  };

  const getDisplayValue = () => {
    if (!value) return '';
    // Only mask when NOT focused and NOT toggled to show
    if (isSensitive && !showSensitive && !isFocused) {
      const masked = value.replace(/\d/g, 'X');
      const last3 = value.slice(-3);
      return masked.slice(0, -3) + last3;
    }
    return value;
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-sm font-bold text-primary-blue">
        {label}
        {optional && <span className="font-normal text-gray-500 ml-1">(optional)</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          value={getDisplayValue()}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-3 rounded border transition-all text-gray-700 outline-none font-mono
            ${error ? 'border-red-600 focus:ring-1 focus:ring-red-600' : 'border-gray-300 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue'}
          `}
        />
        {isSensitive && value && (
          <button
            type="button"
            onClick={() => setShowSensitive(!showSensitive)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-blue font-bold text-sm hover:text-primary-blue transition-colors"
          >
            {showSensitive ? 'hide' : 'show'}
          </button>
        )}
      </div>
      {error ? (
        <div className="flex items-center gap-2 mt-1">
          <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] flex-none">
            !
          </div>
          <span className="text-sm text-red-600 font-bold">{error}</span>
        </div>
      ) : (
        hint && <span className="text-xs text-gray-500 font-medium">{hint}</span>
      )}
    </div>
  );
};

export default InputField;
