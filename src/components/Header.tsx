'use client';

import React from 'react';
import ProgressStepper from './ProgressStepper';
import { useAppContext } from '@/context/AppContext';

const Header = () => {
  const { currentStep } = useAppContext();

  return (
    <header className="w-full bg-white py-4 border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-8 lg:px-4">
        {/* Brand Logo matching Sallie Mae branding perfectly */}
        <div className="flex-none pr-8">
          <span 
            className="text-[28px] font-bold tracking-tight text-[#130c4e] lowercase select-none"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            sall
            <span className="relative inline-block text-[#130c4e]">
              ı
              <span className="absolute top-[2px] left-[1px] w-[5.5px] h-[5.5px] bg-[#e20074] rounded-full"></span>
            </span>
            e mae
          </span>
        </div>
        
        {/* Connected Progress Stepper */}
        <ProgressStepper currentStep={currentStep} />
      </div>
    </header>
  );
};

export default Header;
