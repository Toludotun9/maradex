'use client';

import React from 'react';
import ProgressStepper from './ProgressStepper';
import { useAppContext } from '@/context/AppContext';
import { usePathname } from 'next/navigation';
import MainWebsiteHeader from './MainWebsiteHeader';

const Header = () => {
  const pathname = usePathname();
  const isInfoPage = pathname === '/terms-of-use' || pathname === '/privacy-policy';
  const { currentStep } = useAppContext();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (isInfoPage) {
    return <MainWebsiteHeader />;
  }

  const steps = [
    'Personal info',
    'Loan info',
    'Add cosigner',
    'Finalize',
    'Submit',
    'Results'
  ];

  return (
    <>
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
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 text-[#004b87] hover:text-[#003360] transition-colors select-none"
            >
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

      {/* Mobile View Progress Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 pb-2">
              <h2 className="text-xl font-extrabold text-black tracking-tight">Your progress</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-[#004b87] hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            {/* Vertical Stepper List */}
            <div className="p-6 pt-4 relative">
              {/* Continuous vertical grey line */}
              <div className="absolute left-[34px] top-[26px] bottom-[34px] w-[2px] bg-gray-200 z-0"></div>
              
              <div className="flex flex-col gap-6 relative z-10">
                {steps.map((step, index) => {
                  const isCompleted = index < currentStep;
                  const isCurrent = index === currentStep;
                  const isFuture = index > currentStep;

                  return (
                    <div key={step} className="flex items-center gap-4">
                      <div 
                        className={`
                          w-5 h-5 rounded-full flex items-center justify-center bg-white z-10
                          ${isCompleted ? 'bg-[#004b87]' : ''}
                          ${isCurrent ? 'border-[3px] border-[#0084c9]' : ''}
                          ${isFuture ? 'border-[2px] border-gray-200' : ''}
                        `}
                      />
                      <span 
                        className={`
                          text-[15.5px]
                          ${isCompleted ? 'text-[#004b87] font-medium' : ''}
                          ${isCurrent ? 'text-[#0084c9] font-bold' : ''}
                          ${isFuture ? 'text-[#556b82] font-normal' : ''}
                        `}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
