"use client";

import React, { useState, useEffect, useRef } from 'react';

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
  "Wisconsin", "Wyoming"
];

const getValidState = (inputState: string): string | null => {
  if (!inputState) return null;
  const normalized = inputState.trim().toLowerCase();
  const matched = US_STATES.find(s => s.toLowerCase() === normalized);
  return matched || null;
};

interface SchoolAutocompleteProps {
  label: string;
  name: string;
  value: string;
  stateFilter: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (school: string) => void;
  placeholder?: string;
  error?: string;
}

const SchoolAutocomplete: React.FC<SchoolAutocompleteProps> = ({
  label,
  name,
  value,
  stateFilter,
  onChange,
  onSelect,
  placeholder,
  error
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const searchSchools = async (query: string) => {
    const validState = getValidState(stateFilter);
    if (!query && !validState) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Use HTTPS to prevent any mixed content security blocking
      let url = `https://universities.hipolabs.com/search?country=United+States`;
      if (validState) {
        url += `&state-province=${encodeURIComponent(validState)}`;
      }
      if (query) {
        url += `&name=${encodeURIComponent(query)}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('API error');
      
      const data = await response.json();
      // Extract unique names and limit to 20 suggestions
      const names = Array.from(new Set(data.map((s: any) => s.name))) as string[];
      setSuggestions(names.slice(0, 20));
      setShowDropdown(true);
    } catch (err) {
      console.error('School search error:', err);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const validState = getValidState(stateFilter);
    if (value.length >= 1 || (validState && value.length === 0)) {
       const timer = setTimeout(() => {
          searchSchools(value);
       }, 300);
       return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [value, stateFilter]);

  const handleSelect = (school: string) => {
    onSelect(school);
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
          onChange={onChange}
          onFocus={() => {
            if (stateFilter) {
              setShowDropdown(true);
              const validState = getValidState(stateFilter);
              if (validState && suggestions.length === 0) {
                searchSchools(value);
              }
            }
          }}
          onClick={() => {
            if (stateFilter) {
              setShowDropdown(true);
            }
          }}
          autoComplete="off"
          disabled={!stateFilter}
          className={`
            w-full px-4 py-3 rounded border transition-all text-gray-700 outline-none
            ${!stateFilter ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
            ${error ? 'border-red-600 focus:ring-1 focus:ring-red-600' : 'border-gray-300 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue'}
          `}
        />
        
        {isLoading && (
          <div className="absolute right-3 top-3.5">
            <svg className="animate-spin h-5 w-5 text-secondary-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}

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
      {!stateFilter && <p className="text-[10px] text-gray-400">Select a state/territory first</p>}
      {error && <p className="text-xs text-red-600 font-bold">{error}</p>}
    </div>
  );
};

export default SchoolAutocomplete;
