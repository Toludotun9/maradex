'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Using sessionStorage so it re-appears on new tabs/sessions for easy testing,
    // but remains dismissed while browsing within the same session.
    const consent = sessionStorage.getItem('sallie-mae-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('sallie-mae-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000] p-5 md:p-6 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.08)] border-t border-gray-200 transition-all duration-500 transform translate-y-0 animate-in slide-in-from-bottom duration-500 select-none">
      <div className="max-w-[900px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-5 md:gap-8">
        
        {/* Copy Disclaimer */}
        <p className="text-[13.5px] md:text-[14.5px] text-gray-700 leading-relaxed font-sans text-left flex-grow">
          By using our site, you agree we may use session replay and other tracking technologies, like cookies, to improve site navigation, analyze usage, personalize content, and support relevant advertising. To opt-out of the use of certain technologies, click Manage Preferences at any time. For more information, see our{' '}
          <Link href="/privacy-policy" className="text-[#005cc8] hover:underline font-bold whitespace-nowrap">
            Privacy Policy
          </Link>
          .
        </p>

        {/* Action Buttons stacked on mobile, row on desktop */}
        <div className="flex flex-col gap-2.5 w-full md:w-auto md:min-w-[220px] shrink-0">
          <button
            onClick={handleDismiss}
            className="w-full px-6 py-2.5 rounded-full border-2 border-[#005cc8] hover:bg-blue-50 text-[#005cc8] text-[13.5px] font-bold transition-all duration-200 select-none cursor-pointer text-center outline-none"
          >
            Manage Preferences
          </button>
          
          <button
            onClick={handleDismiss}
            className="w-full px-6 py-2.5 rounded-full bg-[#005cc8] hover:bg-[#004b87] text-white text-[13.5px] font-bold transition-all duration-200 select-none cursor-pointer text-center outline-none shadow-sm"
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  );
};

export default CookieConsentBanner;
