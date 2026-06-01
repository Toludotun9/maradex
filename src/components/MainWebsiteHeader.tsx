'use client';

import React from 'react';
import Link from 'next/link';

const MainWebsiteHeader = () => {
  return (
    <header className="w-full bg-white py-4 border-b border-gray-200 sticky top-0 z-[100] shadow-sm select-none">
      <div className="max-w-[1250px] mx-auto flex items-center justify-between px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex-none pr-8">
          <Link href="/" className="text-[24px] md:text-[28px] font-bold tracking-tight text-[#13325b] lowercase" style={{ fontFamily: 'Georgia, serif' }}>
            sall
            <span className="relative inline-block text-[#13325b]">
              ı
              <span className="absolute top-[2.5px] left-[1.5px] w-[5.5px] h-[5.5px] bg-[#e20074] rounded-full"></span>
            </span>
            e
          </Link>
        </div>

        {/* Navigation Links (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-8 text-[14.5px] font-bold text-[#13325b]">
          <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors">
            Student Loans
          </Link>
          <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors">
            Savings
          </Link>
          <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors">
            Resources and Tools
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="hidden sm:flex items-center gap-1 text-[14.5px] font-bold text-[#13325b] hover:text-[#0084c9] transition-colors cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-blue">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Log in</span>
          </div>

          <button className="text-gray-600 hover:text-gray-900 transition-colors p-1.5 focus:outline-none" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-blue">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <Link 
            href="/"
            className="px-6 py-2.5 rounded-full bg-[#005cc8] hover:bg-[#004b87] text-white text-xs md:text-sm font-bold shadow-sm transition-all duration-300 whitespace-nowrap"
          >
            Apply for a loan
          </Link>
        </div>

      </div>
    </header>
  );
};

export default MainWebsiteHeader;
