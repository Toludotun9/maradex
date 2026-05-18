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

const STATE_ABBREVIATIONS: { [key: string]: string } = {
  "alabama": "AL", "alaska": "AK", "arizona": "AZ", "arkansas": "AR", "california": "CA",
  "colorado": "CO", "connecticut": "CT", "delaware": "DE", "florida": "FL", "georgia": "GA",
  "hawaii": "HI", "idaho": "ID", "illinois": "IL", "indiana": "IN", "iowa": "IA",
  "kansas": "KS", "kentucky": "KY", "louisiana": "LA", "maine": "ME", "maryland": "MD",
  "massachusetts": "MA", "michigan": "MI", "minnesota": "MN", "mississippi": "MS", "missouri": "MO",
  "montana": "MT", "nebraska": "NE", "nevada": "NV", "new hampshire": "NH", "new jersey": "NJ",
  "new mexico": "NM", "new york": "NY", "north carolina": "NC", "north dakota": "ND", "ohio": "OH",
  "oklahoma": "OK", "oregon": "OR", "pennsylvania": "PA", "rhode island": "RI", "south carolina": "SC",
  "south dakota": "SD", "tennessee": "TN", "texas": "TX", "utah": "UT", "vermont": "VT",
  "virginia": "VA", "washington": "WA", "west virginia": "WV", "wisconsin": "WI", "wyoming": "WY"
};

const OHIO_SCHOOLS = [
  { name: "OHIO UNIVERSITY", city: "Athens", state: "OH", code: "00310000" },
  { name: "OHIO UNIVERSITY - HERITAGE COLLEGE OF OSTEOPATHIC MEDICINE", city: "Athens", state: "OH", code: "00310008" },
  { name: "OHIO CHRISTIAN UNIVERSITY", city: "CIRCLEVILLE", state: "OH", code: "00303000" },
  { name: "OHIO DOMINICAN UNIVERSITY", city: "COLUMBUS", state: "OH", code: "00303500" },
  { name: "OHIO NORTHERN UNIVERSITY", city: "ADA", state: "OH", code: "00308900" },
  { name: "THE OHIO STATE UNIVERSITY", city: "COLUMBUS", state: "OH", code: "00309000" },
  { name: "UNIVERSITY OF CINCINNATI", city: "CINCINNATI", state: "OH", code: "00312500" },
  { name: "UNIVERSITY OF TOLEDO", city: "TOLEDO", state: "OH", code: "00313100" },
  { name: "MIAMI UNIVERSITY", city: "OXFORD", state: "OH", code: "00307700" },
  { name: "KENT STATE UNIVERSITY", city: "KENT", state: "OH", code: "00305100" },
  { name: "BOWLING GREEN STATE UNIVERSITY", city: "BOWLING GREEN", state: "OH", code: "00301800" },
  { name: "CASE WESTERN RESERVE UNIVERSITY", city: "CLEVELAND", state: "OH", code: "00302400" },
  { name: "WRIGHT STATE UNIVERSITY", city: "DAYTON", state: "OH", code: "00307800" },
  { name: "CLEVELAND STATE UNIVERSITY", city: "CLEVELAND", state: "OH", code: "00303200" },
  { name: "UNIVERSITY OF DAYTON", city: "DAYTON", state: "OH", code: "00312700" },
  { name: "XAVIER UNIVERSITY", city: "CINCINNATI", state: "OH", code: "00314400" }
];

const OTHER_POPULAR_SCHOOLS: { [state: string]: { name: string, city: string, code: string }[] } = {
  "california": [
    { name: "STANFORD UNIVERSITY", city: "STANFORD", code: "00130500" },
    { name: "UNIVERSITY OF CALIFORNIA, BERKELEY", city: "BERKELEY", code: "00131200" },
    { name: "UNIVERSITY OF CALIFORNIA, LOS ANGELES", city: "LOS ANGELES", code: "00131500" },
    { name: "UNIVERSITY OF SOUTHERN CALIFORNIA", city: "LOS ANGELES", code: "00132800" },
    { name: "CALIFORNIA INSTITUTE OF TECHNOLOGY", city: "PASADENA", code: "00113100" }
  ],
  "new york": [
    { name: "COLUMBIA UNIVERSITY", city: "NEW YORK", code: "00270700" },
    { name: "NEW YORK UNIVERSITY", city: "NEW YORK", code: "00278500" },
    { name: "CORNELL UNIVERSITY", city: "ITHACA", code: "00271100" },
    { name: "FORDHAM UNIVERSITY", city: "BRONX", code: "00272200" },
    { name: "SYRACUSE UNIVERSITY", city: "SYRACUSE", code: "00282100" }
  ],
  "texas": [
    { name: "UNIVERSITY OF TEXAS AT AUSTIN", city: "AUSTIN", code: "00365800" },
    { name: "TEXAS A&M UNIVERSITY", city: "COLLEGE STATION", code: "00363200" },
    { name: "RICE UNIVERSITY", city: "HOUSTON", code: "00360400" },
    { name: "SOUTHERN METHODIST UNIVERSITY", city: "DALLAS", code: "00361300" }
  ]
};

const getValidState = (inputState: string): string | null => {
  if (!inputState) return null;
  const normalized = inputState.trim().toLowerCase();
  
  // 1. Check if it is a 2-letter state abbreviation
  if (normalized.length === 2) {
    const matchedStateName = Object.keys(STATE_ABBREVIATIONS).find(
      key => STATE_ABBREVIATIONS[key].toLowerCase() === normalized
    );
    if (matchedStateName) {
      const matchedState = US_STATES.find(s => s.toLowerCase() === matchedStateName);
      if (matchedState) return matchedState;
    }
  }

  // Avoid matching too early (e.g. "o" to Oregon immediately)
  if (normalized.length < 2) return null;

  // 2. Try exact match
  const exactMatch = US_STATES.find(s => s.toLowerCase() === normalized);
  if (exactMatch) return exactMatch;
  
  // 3. Try prefix match (starts with)
  const prefixMatch = US_STATES.find(s => s.toLowerCase().startsWith(normalized));
  if (prefixMatch) return prefixMatch;
  
  // 4. Try partial match (includes)
  const partialMatch = US_STATES.find(s => s.toLowerCase().includes(normalized));
  return partialMatch || null;
};

const getStateAbbreviation = (inputState: string): string => {
  if (!inputState) return "US";
  const normalized = inputState.trim().toLowerCase();
  
  // If it's already a 2-letter state code, use it!
  if (normalized.length === 2) {
    return normalized.toUpperCase();
  }
  
  // Try to find the full state match first
  const resolvedState = getValidState(inputState);
  if (resolvedState) {
    const key = resolvedState.toLowerCase();
    if (STATE_ABBREVIATIONS[key]) {
      return STATE_ABBREVIATIONS[key];
    }
  }
  
  // Check if normalized matches any state name directly in abbreviation dictionary
  if (STATE_ABBREVIATIONS[normalized]) {
    return STATE_ABBREVIATIONS[normalized];
  }
  
  return "US";
};

const getRealisticCity = (schoolName: string, stateName: string): string => {
  const upperName = schoolName.toUpperCase();
  const majorCities = [
    "BOSTON", "CHICAGO", "SEATTLE", "PORTLAND", "ATLANTA", "MIAMI", "DENVER", "PHOENIX",
    "DETROIT", "MINNEAPOLIS", "PHILADELPHIA", "PITTSBURGH", "BALTIMORE", "NASHVILLE"
  ];
  for (const city of majorCities) {
    if (upperName.includes(city)) return city;
  }
  
  if (upperName.startsWith("UNIVERSITY OF ")) {
    const potentialCity = upperName.replace("UNIVERSITY OF ", "");
    if (potentialCity.length < 20 && !potentialCity.includes(" STATE")) {
      return potentialCity;
    }
  }

  const stateDefaults: { [key: string]: string } = {
    "alabama": "BIRMINGHAM", "alaska": "ANCHORAGE", "arizona": "TEMPE", "arkansas": "FAYETTEVILLE",
    "colorado": "BOULDER", "connecticut": "NEW HAVEN", "delaware": "NEWARK", "florida": "GAINESVILLE",
    "georgia": "ATHENS", "hawaii": "HONOLULU", "idaho": "MOSCOW", "illinois": "CHICAGO",
    "indiana": "BLOOMINGTON", "iowa": "IOWA CITY", "kansas": "LAWRENCE", "kentucky": "LEXINGTON",
    "louisiana": "BATON ROUGE", "maine": "ORONO", "maryland": "COLLEGE PARK", "massachusetts": "CAMBRIDGE",
    "michigan": "ANN ARBOR", "minnesota": "MINNEAPOLIS", "mississippi": "OXFORD", "missouri": "COLUMBIA",
    "montana": "MISSOULA", "nebraska": "LINCOLN", "nevada": "RENO", "new hampshire": "DURHAM",
    "new jersey": "NEW BRUNSWICK", "new mexico": "ALBUQUERQUE", "north carolina": "CHAPEL HILL",
    "north dakota": "FARGO", "oklahoma": "NORMAN", "oregon": "EUGENE", "pennsylvania": "PHILADELPHIA",
    "rhode island": "PROVIDENCE", "south carolina": "COLUMBIA", "south dakota": "VERMILLION",
    "tennessee": "KNOXVILLE", "utah": "SALT LAKE CITY", "vermont": "BURLINGTON", "virginia": "CHARLOTTESVILLE",
    "washington": "SEATTLE", "west virginia": "MORGANTOWN", "wisconsin": "MADISON", "wyoming": "LARAMIE"
  };
  
  return stateDefaults[stateName.toLowerCase()] || "COLLEGE STATION";
};

const generateOPEID = (schoolName: string): string => {
  let hash = 0;
  for (let i = 0; i < schoolName.length; i++) {
    hash = (hash << 5) - hash + schoolName.charCodeAt(i);
    hash |= 0;
  }
  const numericPart = Math.abs(hash % 900000) + 100000;
  return `00${numericPart}`;
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
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchSchools = async (query: string, currentFocusState: boolean) => {
    const validState = getValidState(stateFilter);
    if (!query && !validState) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // 1. Get high-fidelity local schools for this state
      let localSchools: string[] = [];
      const normalizedState = (validState || stateFilter).trim().toLowerCase();
      
      let stateSchoolsSource: { name: string, city: string, state: string, code: string }[] = [];
      if (normalizedState === 'ohio') {
        stateSchoolsSource = OHIO_SCHOOLS;
      } else if (OTHER_POPULAR_SCHOOLS[normalizedState]) {
        const stateAbbr = STATE_ABBREVIATIONS[normalizedState] || normalizedState.toUpperCase();
        stateSchoolsSource = OTHER_POPULAR_SCHOOLS[normalizedState].map(s => ({
          ...s,
          state: stateAbbr
        }));
      }

      // Convert local source to standard display strings
      localSchools = stateSchoolsSource.map(s => 
        `${s.name.toUpperCase()}, ${s.city}, ${s.state}, ${s.code}`
      );

      // Filter local list by search query if user has started typing
      if (query) {
        const lowerQuery = query.toLowerCase();
        localSchools = localSchools.filter(s => s.toLowerCase().includes(lowerQuery));
      }

      // 2. Fetch wider coverage from hipolabs API
      let apiSchools: string[] = [];
      let url = `https://universities.hipolabs.com/search?country=United+States`;
      if (validState) {
        url += `&state-province=${encodeURIComponent(validState)}`;
      }
      if (query && query.length >= 2) {
        url += `&name=${encodeURIComponent(query)}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const stateAbbr = getStateAbbreviation(stateFilter);
        
        const formattedApi = data.map((s: any) => {
          const upperName = s.name.toUpperCase();
          
          // Deduplicate if already present in local list
          const matchedLocal = stateSchoolsSource.find(ls => ls.name.toUpperCase() === upperName);
          if (matchedLocal) {
            return `${matchedLocal.name.toUpperCase()}, ${matchedLocal.city}, ${matchedLocal.state}, ${matchedLocal.code}`;
          }

          const city = getRealisticCity(s.name, validState || "");
          const code = generateOPEID(s.name);
          return `${upperName}, ${city}, ${stateAbbr}, ${code}`;
        });
        
        apiSchools = formattedApi;
      }

      // Merge results with unique list
      const merged = Array.from(new Set([...localSchools, ...apiSchools])) as string[];
      
      setSuggestions(merged.slice(0, 20));
      
      // Only pop open dropdown if the school input is currently focused/clicked
      if (currentFocusState) {
        setShowDropdown(true);
      }
    } catch (err) {
      console.error('School search error:', err);
      // Casing fallback logic on failure
      let fallbackSchools: string[] = [];
      const normalizedState = (validState || stateFilter).trim().toLowerCase();
      if (normalizedState === 'ohio') {
        fallbackSchools = OHIO_SCHOOLS.map(s => `${s.name.toUpperCase()}, ${s.city}, ${s.state}, ${s.code}`);
      }
      if (query) {
        fallbackSchools = fallbackSchools.filter(s => s.toLowerCase().includes(query.toLowerCase()));
      }
      setSuggestions(fallbackSchools.slice(0, 20));
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search trigger
  useEffect(() => {
    const validState = getValidState(stateFilter);
    if (value.length >= 1 || (validState && value.length === 0)) {
       const timer = setTimeout(() => {
          searchSchools(value, isFocused);
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
            setIsFocused(true);
            if (stateFilter) {
              setShowDropdown(true);
              const validState = getValidState(stateFilter);
              if (validState) {
                // Instantly query or load if focused
                searchSchools(value, true);
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
