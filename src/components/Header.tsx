'use client';

import React from 'react';
import ProgressStepper from './ProgressStepper';
import { useAppContext } from '@/context/AppContext';

const Header = () => {
  const { currentStep } = useAppContext();

  return (
    <header className="w-full bg-white py-4 border-b border-gray-200 sticky top-0 z-[100]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-8 lg:px-4">
        <div className="flex-none">
          <span className="text-2xl font-extrabold text-[#5D2E8E] tracking-tight lowercase">sallie mae</span>
        </div>
        
        <ProgressStepper currentStep={currentStep} />

        <div className="flex items-center gap-2 text-secondary-blue font-semibold text-sm">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <a href="tel:1-800-4-SALLIE" className="border-b-2 border-secondary-blue leading-tight hover:text-primary-blue hover:border-primary-blue transition-colors">Call us</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
