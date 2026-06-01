'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import MainWebsiteFooter from './MainWebsiteFooter';

const Footer = () => {
  const pathname = usePathname();
  const isInfoPage = pathname === '/terms-of-use' || pathname === '/privacy-policy';

  if (isInfoPage) {
    return <MainWebsiteFooter />;
  }

  return (
    <footer className="w-full bg-[#F3F4F6] py-12 mt-auto border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex items-center gap-4 mb-8 text-sm text-[#004b87] font-semibold">
          <Link 
            href="/terms-of-use"
            className="hover:underline font-semibold text-[#004b87] text-sm"
          >
            Terms of use
          </Link>
          <span className="text-gray-400 font-normal">|</span>
          <Link 
            href="/privacy-policy"
            className="hover:underline font-semibold text-[#004b87] text-sm"
          >
            Privacy policy
          </Link>
          <span className="text-gray-400 font-normal">|</span>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Website feedback</a>
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
