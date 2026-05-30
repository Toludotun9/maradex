'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';

const Footer = () => {
  const { setTermsOpen } = useAppContext();

  return (
    <footer className="w-full bg-[#F3F4F6] py-12 mt-auto border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex items-center gap-4 mb-8 text-sm text-secondary-blue font-semibold">
          <button 
            onClick={() => setTermsOpen(true)}
            className="hover:underline bg-transparent border-none p-0 cursor-pointer font-semibold text-secondary-blue text-sm outline-none"
          >
            Terms of use
          </button>
          <span className="text-gray-400 font-normal">|</span>
          <a href="#" className="hover:underline">Privacy policy</a>
          <span className="text-gray-400 font-normal">|</span>
          <a href="#" className="hover:underline">Website feedback</a>
        </div>
        
        <div className="text-xs text-text-muted leading-relaxed space-y-2">
          <p>Sallie Mae Bank Online Loan Application © 2026 Sallie Mae Bank. All rights reserved.</p>
          <p>SLM Corporation and its subsidiaries, including Sallie Mae Bank, are not sponsored by or agencies of the United States of America.</p>
        </div>
      </div>
      
      <button 
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-accent-blue text-white flex items-center justify-center shadow-lg shadow-accent-blue/40 hover:scale-110 hover:bg-secondary-blue transition-all duration-300 z-[1000]" 
        aria-label="Open chat"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" />
          <circle cx="8" cy="10" r="1.5" />
          <circle cx="12" cy="10" r="1.5" />
          <circle cx="16" cy="10" r="1.5" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
