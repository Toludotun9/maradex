'use client';

import React from 'react';
import ProgressStepper from './ProgressStepper';
import { useAppContext } from '@/context/AppContext';

const Header = () => {
  const { currentStep } = useAppContext();

  return (
    <header className="w-full bg-white py-4 border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div className="max-w-[1250px] mx-auto flex items-center justify-between px-6 lg:px-8">
        {/* Brand Logo matching Sallie Mae branding perfectly */}
        <div className="flex-none pr-6">
          <span 
            className="text-[22px] md:text-[28px] font-bold tracking-tight text-[#13325b] lowercase select-none"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            sall
            <span className="relative inline-block text-[#13325b]">
              ı
              <span className="absolute top-[2px] left-[1px] w-[5.5px] h-[5.5px] bg-[#e20074] rounded-full"></span>
            </span>
            e mae
          </span>
        </div>
        
        {/* Connected Progress Stepper */}
        <ProgressStepper currentStep={currentStep} />

        {/* Customer Support Call Us Link */}
        <div className="flex items-center gap-1.5 flex-none pl-6 select-none">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50/50 border border-blue-100/50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#004b87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M14 9.5a2.5 2.5 0 0 0-4 0" />
            </svg>
          </div>
          <a href="tel:1-800-4-SALLIE" className="text-[12px] md:text-[13.5px] font-extrabold text-[#004b87] underline hover:text-[#003360] transition-colors whitespace-nowrap">
            Call us
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
