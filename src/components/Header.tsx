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
        
        {/* Mobile View Progress (Hidden on Desktop) */}
        <div className="flex sm:hidden items-center justify-center flex-grow">
          <button className="flex items-center gap-2 text-[#004b87] hover:text-[#003360] transition-colors select-none">
            <span className="text-[13px] font-medium">View progress</span>
            <div className="flex items-center">
              <div className="w-[5px] h-[5px] rounded-full bg-[#004b87]"></div>
              <div className="w-1.5 h-[1.5px] bg-[#004b87]"></div>
              <div className="w-[5px] h-[5px] rounded-full bg-[#004b87]"></div>
              <div className="w-1.5 h-[1.5px] bg-[#004b87]"></div>
              <div className="w-[5px] h-[5px] rounded-full bg-[#004b87]"></div>
            </div>
          </button>
        </div>

        {/* Connected Progress Stepper (Hidden on Mobile) */}
        <div className="hidden sm:block w-full">
          <ProgressStepper currentStep={currentStep} />
        </div>

        {/* Customer Support Call Us Link */}
        <div className="flex items-center gap-1.5 flex-none pl-2 sm:pl-6 select-none">
          <a href="tel:1-800-4-SALLIE" className="flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 rounded-lg bg-transparent sm:bg-blue-50/50 sm:border sm:border-blue-100/50">
            <svg width="20" height="20" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="#004b87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M14 9.5a2.5 2.5 0 0 0-4 0" />
            </svg>
          </a>
          <a href="tel:1-800-4-SALLIE" className="hidden sm:block text-[12px] md:text-[13.5px] font-extrabold text-[#004b87] underline hover:text-[#003360] transition-colors whitespace-nowrap">
            Call us
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
