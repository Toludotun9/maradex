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

const POPULAR_SCHOOLS: { [state: string]: { name: string, city: string, code: string }[] } = {
  "alabama": [
    { name: "UNIVERSITY OF ALABAMA", city: "Tuscaloosa", code: "00105100" },
    { name: "AUBURN UNIVERSITY", city: "Auburn", code: "00100900" },
    { name: "UNIVERSITY OF ALABAMA AT BIRMINGHAM", city: "Birmingham", code: "00105200" }
  ],
  "alaska": [
    { name: "UNIVERSITY OF ALASKA ANCHORAGE", city: "Anchorage", code: "01146200" },
    { name: "UNIVERSITY OF ALASKA FAIRBANKS", city: "Fairbanks", code: "00106300" }
  ],
  "arizona": [
    { name: "ARIZONA STATE UNIVERSITY", city: "Tempe", code: "00108100" },
    { name: "UNIVERSITY OF ARIZONA", city: "Tucson", code: "00108300" },
    { name: "NORTHERN ARIZONA UNIVERSITY", city: "Flagstaff", code: "00108200" }
  ],
  "arkansas": [
    { name: "UNIVERSITY OF ARKANSAS", city: "Fayetteville", code: "00110800" },
    { name: "ARKANSAS STATE UNIVERSITY", city: "Jonesboro", code: "00109000" }
  ],
  "california": [
    { name: "STANFORD UNIVERSITY", city: "Stanford", code: "00130500" },
    { name: "UNIVERSITY OF CALIFORNIA, BERKELEY", city: "Berkeley", code: "00131200" },
    { name: "UNIVERSITY OF CALIFORNIA, LOS ANGELES", city: "Los Angeles", code: "00131500" },
    { name: "UNIVERSITY OF SOUTHERN CALIFORNIA", city: "Los Angeles", code: "00132800" },
    { name: "CALIFORNIA INSTITUTE OF TECHNOLOGY", city: "Pasadena", code: "00113100" }
  ],
  "colorado": [
    { name: "UNIVERSITY OF COLORADO BOULDER", city: "Boulder", code: "00137000" },
    { name: "COLORADO STATE UNIVERSITY", city: "Fort Collins", code: "00135000" },
    { name: "UNIVERSITY OF DENVER", city: "Denver", code: "00137100" }
  ],
  "connecticut": [
    { name: "YALE UNIVERSITY", city: "New Haven", code: "00142600" },
    { name: "UNIVERSITY OF CONNECTICUT", city: "Storrs", code: "00141700" },
    { name: "WESLEYAN UNIVERSITY", city: "Middletown", code: "00142400" }
  ],
  "delaware": [
    { name: "UNIVERSITY OF DELAWARE", city: "Newark", code: "00143100" },
    { name: "DELAWARE STATE UNIVERSITY", city: "Dover", code: "00142800" }
  ],
  "florida": [
    { name: "UNIVERSITY OF FLORIDA", city: "Gainesville", code: "00153500" },
    { name: "FLORIDA STATE UNIVERSITY", city: "Tallahassee", code: "00148900" },
    { name: "UNIVERSITY OF MIAMI", city: "Coral Gables", code: "00153600" },
    { name: "UNIVERSITY OF SOUTH FLORIDA", city: "Tampa", code: "00153700" }
  ],
  "georgia": [
    { name: "UNIVERSITY OF GEORGIA", city: "Athens", code: "00159800" },
    { name: "GEORGIA INSTITUTE OF TECHNOLOGY", city: "Atlanta", code: "00156900" },
    { name: "EMORY UNIVERSITY", city: "Atlanta", code: "00156400" }
  ],
  "hawaii": [
    { name: "UNIVERSITY OF HAWAII AT MANOA", city: "Honolulu", code: "00161000" }
  ],
  "idaho": [
    { name: "UNIVERSITY OF IDAHO", city: "Moscow", code: "00162600" },
    { name: "BOISE STATE UNIVERSITY", city: "Boise", code: "00161600" }
  ],
  "illinois": [
    { name: "UNIVERSITY OF ILLINOIS URBANA-CHAMPAIGN", city: "Champaign", code: "00177500" },
    { name: "NORTHWESTERN UNIVERSITY", city: "Evanston", code: "00173900" },
    { name: "UNIVERSITY OF CHICAGO", city: "Chicago", code: "00177400" }
  ],
  "indiana": [
    { name: "INDIANA UNIVERSITY BLOOMINGTON", city: "Bloomington", code: "00180900" },
    { name: "PURDUE UNIVERSITY", city: "West Lafayette", code: "00182500" },
    { name: "UNIVERSITY OF NOTRE DAME", city: "Notre Dame", code: "00184000" }
  ],
  "iowa": [
    { name: "UNIVERSITY OF IOWA", city: "Iowa City", code: "00189200" },
    { name: "IOWA STATE UNIVERSITY", city: "Ames", code: "00186900" }
  ],
  "kansas": [
    { name: "UNIVERSITY OF KANSAS", city: "Lawrence", code: "00194800" },
    { name: "KANSAS STATE UNIVERSITY", city: "Manhattan", code: "00192800" }
  ],
  "kentucky": [
    { name: "UNIVERSITY OF KENTUCKY", city: "Lexington", code: "00198900" },
    { name: "UNIVERSITY OF LOUISVILLE", city: "Louisville", code: "00199900" }
  ],
  "louisiana": [
    { name: "LOUISIANA STATE UNIVERSITY", city: "Baton Rouge", code: "00201000" },
    { name: "TULANE UNIVERSITY", city: "New Orleans", code: "00202900" }
  ],
  "maine": [
    { name: "UNIVERSITY OF MAINE", city: "Orono", code: "00205300" },
    { name: "BOWDOIN COLLEGE", city: "Brunswick", code: "00203800" }
  ],
  "maryland": [
    { name: "UNIVERSITY OF MARYLAND, COLLEGE PARK", city: "College Park", code: "00210300" },
    { name: "JOHNS HOPKINS UNIVERSITY", city: "Baltimore", code: "00207700" }
  ],
  "massachusetts": [
    { name: "HARVARD UNIVERSITY", city: "Cambridge", code: "00215500" },
    { name: "MASSACHUSETTS INSTITUTE OF TECHNOLOGY", city: "Cambridge", code: "00217800" },
    { name: "BOSTON UNIVERSITY", city: "Boston", code: "00213000" },
    { name: "AMHERST COLLEGE", city: "Amherst", code: "00211500" }
  ],
  "michigan": [
    { name: "UNIVERSITY OF MICHIGAN", city: "Ann Arbor", code: "00232500" },
    { name: "MICHIGAN STATE UNIVERSITY", city: "East Lansing", code: "00229000" },
    { name: "WAYNE STATE UNIVERSITY", city: "Detroit", code: "00232900" }
  ],
  "minnesota": [
    { name: "UNIVERSITY OF MINNESOTA", city: "Minneapolis", code: "00238800" }
  ],
  "mississippi": [
    { name: "UNIVERSITY OF MISSISSIPPI", city: "University", code: "00244000" },
    { name: "MISSISSIPPI STATE UNIVERSITY", city: "Mississippi State", code: "00242300" }
  ],
  "missouri": [
    { name: "UNIVERSITY OF MISSOURI", city: "Columbia", code: "00251600" },
    { name: "WASHINGTON UNIVERSITY IN ST. LOUIS", city: "St. Louis", code: "00252000" }
  ],
  "montana": [
    { name: "UNIVERSITY OF MONTANA", city: "Missoula", code: "00253600" },
    { name: "MONTANA STATE UNIVERSITY", city: "Bozeman", code: "00253200" }
  ],
  "nebraska": [
    { name: "UNIVERSITY OF NEBRASKA-LINCOLN", city: "Lincoln", code: "00256500" }
  ],
  "nevada": [
    { name: "UNIVERSITY OF NEVADA, RENO", city: "Reno", code: "00256800" },
    { name: "UNIVERSITY OF NEVADA, LAS VEGAS", city: "Las Vegas", code: "00256900" }
  ],
  "new hampshire": [
    { name: "DARTMOUTH COLLEGE", city: "Hanover", code: "00257300" },
    { name: "UNIVERSITY OF NEW HAMPSHIRE", city: "Durham", code: "00258900" }
  ],
  "new jersey": [
    { name: "PRINCETON UNIVERSITY", city: "Princeton", code: "00262700" },
    { name: "RUTGERS UNIVERSITY", city: "New Brunswick", code: "00262900" }
  ],
  "new mexico": [
    { name: "UNIVERSITY OF NEW MEXICO", city: "Albuquerque", code: "00266300" }
  ],
  "new york": [
    { name: "COLUMBIA UNIVERSITY", city: "New York", code: "00270700" },
    { name: "NEW YORK UNIVERSITY", city: "New York", code: "00278500" },
    { name: "CORNELL UNIVERSITY", city: "Ithaca", code: "00271100" },
    { name: "SYRACUSE UNIVERSITY", city: "Syracuse", code: "00282100" }
  ],
  "north carolina": [
    { name: "UNIVERSITY OF NORTH CAROLINA AT CHAPEL HILL", city: "Chapel Hill", code: "00297400" },
    { name: "DUKE UNIVERSITY", city: "Durham", code: "00292000" },
    { name: "WAKE FOREST UNIVERSITY", city: "Winston-Salem", code: "00297800" }
  ],
  "north dakota": [
    { name: "UNIVERSITY OF NORTH DAKOTA", city: "Grand Forks", code: "00300500" }
  ],
  "ohio": OHIO_SCHOOLS,
  "oklahoma": [
    { name: "UNIVERSITY OF OKLAHOMA", city: "Norman", code: "00318400" },
    { name: "OKLAHOMA STATE UNIVERSITY", city: "Stillwater", code: "00317000" }
  ],
  "oregon": [
    { name: "UNIVERSITY OF OREGON", city: "Eugene", code: "00322300" },
    { name: "OREGON STATE UNIVERSITY", city: "Corvallis", code: "00321000" }
  ],
  "pennsylvania": [
    { name: "UNIVERSITY OF PENNSYLVANIA", city: "Philadelphia", code: "00337800" },
    { name: "PENNSYLVANIA STATE UNIVERSITY", city: "University Park", code: "00332900" },
    { name: "CARNEGIE MELLON UNIVERSITY", city: "Pittsburgh", code: "00324200" },
    { name: "TEMPLE UNIVERSITY", city: "Philadelphia", code: "00337100" }
  ],
  "rhode island": [
    { name: "BROWN UNIVERSITY", city: "Providence", code: "00340100" },
    { name: "UNIVERSITY OF RHODE ISLAND", city: "Kingston", code: "00340700" }
  ],
  "south carolina": [
    { name: "UNIVERSITY OF SOUTH CAROLINA", city: "Columbia", code: "00344800" },
    { name: "CLEMSON UNIVERSITY", city: "Clemson", code: "00342500" }
  ],
  "south dakota": [
    { name: "UNIVERSITY OF SOUTH DAKOTA", city: "Vermillion", code: "00347400" }
  ],
  "tennessee": [
    { name: "VANDERBILT UNIVERSITY", city: "Nashville", code: "00353500" },
    { name: "UNIVERSITY OF TENNESSEE", city: "Knoxville", code: "00353000" }
  ],
  "texas": [
    { name: "UNIVERSITY OF TEXAS AT AUSTIN", city: "Austin", code: "00365800" },
    { name: "TEXAS A&M UNIVERSITY", city: "College Station", code: "00363200" },
    { name: "RICE UNIVERSITY", city: "Houston", code: "00360400" }
  ],
  "utah": [
    { name: "UNIVERSITY OF UTAH", city: "Salt Lake City", code: "00367500" },
    { name: "BRIGHAM YOUNG UNIVERSITY", city: "Provo", code: "00367000" }
  ],
  "vermont": [
    { name: "UNIVERSITY OF VERMONT", city: "Burlington", code: "00369700" }
  ],
  "virginia": [
    { name: "UNIVERSITY OF VIRGINIA", city: "Charlottesville", code: "00374500" },
    { name: "VIRGINIA TECH", city: "Blacksburg", code: "00375400" },
    { name: "COLLEGE OF WILLIAM & MARY", city: "Williamsburg", code: "00370500" }
  ],
  "washington": [
    { name: "UNIVERSITY OF WASHINGTON", city: "Seattle", code: "00379800" },
    { name: "WASHINGTON STATE UNIVERSITY", city: "Pullman", code: "00380000" }
  ],
  "west virginia": [
    { name: "WEST VIRGINIA UNIVERSITY", city: "Morgantown", code: "00382700" }
  ],
  "wisconsin": [
    { name: "UNIVERSITY OF WISCONSIN-MADISON", city: "Madison", code: "00389500" }
  ],
  "wyoming": [
    { name: "UNIVERSITY OF WYOMING", city: "Laramie", code: "00392800" }
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
      const stateAbbr = getStateAbbreviation(stateFilter);
      
      if (POPULAR_SCHOOLS[normalizedState]) {
        stateSchoolsSource = POPULAR_SCHOOLS[normalizedState].map(s => ({
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

      // 2. Fetch wider coverage from hipolabs API as fallback/enhancement
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
      
      setSuggestions(merged.slice(0, 40)); // Display up to 40 suggestions for thorough state searches!
      
      // Only pop open dropdown if the school input is currently focused/clicked
      if (currentFocusState) {
        setShowDropdown(true);
      }
    } catch (err) {
      console.error('School search error:', err);
      // Casing fallback logic on failure
      let fallbackSchools: string[] = [];
      const normalizedState = (validState || stateFilter).trim().toLowerCase();
      if (POPULAR_SCHOOLS[normalizedState]) {
        const stateAbbr = getStateAbbreviation(stateFilter);
        fallbackSchools = POPULAR_SCHOOLS[normalizedState].map(s => `${s.name.toUpperCase()}, ${s.city}, ${stateAbbr}, ${s.code}`);
      }
      if (query) {
        fallbackSchools = fallbackSchools.filter(s => s.toLowerCase().includes(query.toLowerCase()));
      }
      setSuggestions(fallbackSchools.slice(0, 40));
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
