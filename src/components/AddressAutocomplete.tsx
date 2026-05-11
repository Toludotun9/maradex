"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Suggestion {
  display_name: string;
  address: {
    road?: string;
    house_number?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    postcode?: string;
    country_code?: string;
  };
}

interface AddressAutocompleteProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  onSelect: (address: { street: string; city: string; state: string; zip: string }) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  label,
  name,
  value,
  onChange,
  onSelect,
  placeholder,
  hint,
  error
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
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

  const searchAddress = async (query: string) => {
    if (query.length < 5) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Switching to Photon (Komoot) API - Faster, better CORS support, no key required.
      const response = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lang=en`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Map Photon's GeoJSON format to our Suggestion format
      const formattedSuggestions = data.features.map((f: any) => ({
        display_name: `${f.properties.name || ''}, ${f.properties.city || ''}, ${f.properties.state || ''}, ${f.properties.postcode || ''}, USA`.replace(/, ,/g, ','),
        address: {
          road: f.properties.street || f.properties.name,
          house_number: f.properties.housenumber,
          city: f.properties.city || f.properties.town,
          state: f.properties.state,
          postcode: f.properties.postcode
        }
      }));

      setSuggestions(formattedSuggestions);
      setShowDropdown(true);
    } catch (err) {
      console.error('Address search error:', err);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value && value.length >= 5 && !isLoading && showDropdown === false) {
        // searchAddress(value); // This would trigger on initial load too, be careful
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  const handleInputBlur = () => {
    // delay to allow click on suggestion
    setTimeout(() => setShowDropdown(false), 200);
  };

  const handleSelect = (s: Suggestion) => {
    const addr = s.address;
    const street = `${addr.house_number || ''} ${addr.road || ''}`.trim();
    const city = addr.city || addr.town || addr.village || '';
    const state = addr.state || '';
    const zip = addr.postcode || '';

    onSelect({ street, city, state, zip });
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
          onChange={(e) => {
            onChange(e);
            if (e.target.value.length >= 5) {
              searchAddress(e.target.value);
            } else {
              setShowDropdown(false);
            }
          }}
          autoComplete="off"
          className={`
            w-full px-4 py-3 rounded border transition-all text-gray-700 outline-none
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
                className="w-full text-left px-4 py-3 hover:bg-bg-light-blue transition-colors border-b border-gray-50 last:border-0 text-sm"
              >
                <div className="font-bold text-primary-blue">{s.display_name.split(',')[0]}</div>
                <div className="text-gray-500 text-xs truncate">{s.display_name.split(',').slice(1).join(',').trim()}</div>
              </button>
            ))}
          </div>
        )}
      </div>
      {hint && !error && <p className="text-[10px] text-gray-500 font-medium leading-tight">{hint}</p>}
      {error && <p className="text-xs text-red-600 font-bold">{error}</p>}
    </div>
  );
};

export default AddressAutocomplete;
