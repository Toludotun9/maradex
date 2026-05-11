"use client";

import React, { useState, useEffect, useRef } from 'react';

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
  "Wisconsin", "Wyoming"
];

interface StateAutocompleteProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (state: string) => void;
  placeholder?: string;
  error?: string;
}

const StateAutocomplete: React.FC<StateAutocompleteProps> = ({
  label,
  name,
  value,
  onChange,
  onSelect,
  placeholder,
  error
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    const query = e.target.value.toLowerCase();
    if (query) {
      const filtered = US_STATES.filter(s => s.toLowerCase().includes(query));
      setSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (state: string) => {
    onSelect(state);
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <label htmlFor={name} className="text-sm font-bold text-primary-blue">
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (value) {
               const filtered = US_STATES.filter(s => s.toLowerCase().includes(value.toLowerCase()));
               setSuggestions(filtered);
               setShowDropdown(true);
            }
          }}
          autoComplete="off"
          className={`
            w-full px-4 py-3 rounded border transition-all text-gray-700 outline-none
            ${error ? 'border-red-600 focus:ring-1 focus:ring-red-600' : 'border-gray-300 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue'}
          `}
        />
        
        {showDropdown && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(s)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 text-sm font-medium text-primary-blue"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-600 font-bold">{error}</p>}
    </div>
  );
};

export default StateAutocomplete;
