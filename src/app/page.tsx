'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SelectionCard from '@/components/SelectionCard';
import { useAppContext } from '@/context/AppContext';

export default function Home() {
  const router = useRouter();
  const { applicantType, setApplicantType, setCurrentStep } = useAppContext();

  useEffect(() => {
    setCurrentStep(0);
  }, [setCurrentStep]);

  const handleContinue = () => {
    if (applicantType) {
      router.push('/apply/personal');
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center flex-grow bg-gradient-to-br from-[#d9f2fd] via-[#f7fbfe] to-[#e4fcf5] min-h-[calc(100vh-73px)] w-full py-16 px-6 md:px-16 overflow-hidden">
      {/* High-Fidelity Swirling Background Waves/Ribbons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <svg className="absolute w-[180%] h-[180%] -top-[40%] -left-[40%] text-white/50 opacity-70" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Wave Path 1 */}
          <path 
            d="M-50,600 C150,450 300,750 550,600 C800,450 850,850 1050,600 C1150,480 1200,600 1300,500" 
            stroke="url(#wave-grad-1)" 
            strokeWidth="50" 
            strokeLinecap="round" 
          />
          {/* Wave Path 2 */}
          <path 
            d="M-100,500 C100,350 250,650 500,500 C750,350 800,750 1000,500 C1100,380 1150,500 1250,400" 
            stroke="url(#wave-grad-2)" 
            strokeWidth="35" 
            strokeLinecap="round" 
          />
          <defs>
            <linearGradient id="wave-grad-1" x1="0" y1="0" x2="1000" y2="1000" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#f0f9ff" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#e0f2fe" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="wave-grad-2" x1="0" y1="0" x2="1000" y2="1000" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#e2f9f3" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f0f9ff" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="w-full flex flex-col justify-center items-center max-w-[950px] animate-in fade-in slide-in-from-bottom-4 duration-500 z-10">
        {/* Main Header styled exactly like the screenshot */}
        <h1 className="w-full text-[40px] md:text-5xl font-extrabold text-[#13325b] mb-10 tracking-tight text-left leading-[1.15] z-10">
          Start by telling us <span className="text-[#0084c9]">who's applying.</span>
        </h1>

        {/* Unified white card box */}
        <div className="w-full bg-white rounded-2xl p-8 md:p-10 border border-gray-100/50 shadow-2xl shadow-blue-900/5 flex flex-col md:flex-row gap-6 z-10">
          {/* Student selection card */}
          <div className="flex-grow flex-1">
            <SelectionCard
              title="Student"
              description="I'm attending school or plan to soon."
              isActive={applicantType === 'student'}
              onClick={() => setApplicantType('student')}
              icon={
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Mortarboard Graduation Cap (Pink/Red outline) */}
                  <path d="M24 6L40 13L24 20L8 13L24 6Z" stroke="#e20074" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 15.6V23C14 28 18.5 31 24 31C29.5 31 34 28 34 23V15.6" stroke="#004b87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M38 13.8V23.5" stroke="#e20074" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* User Shoulder Outline (Blue) */}
                  <path d="M12 42C12 36.5 17.4 35 24 35C30.6 35 36 36.5 36 42" stroke="#004b87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* User Head Outline (Blue) */}
                  <circle cx="24" cy="25" r="5" stroke="#004b87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
          </div>

          {/* Cosigner selection card */}
          <div className="flex-grow flex-1">
            <SelectionCard
              title="Cosigner"
              description="I'll share financial responsibility for this loan with a student."
              isActive={applicantType === 'cosigner'}
              onClick={() => setApplicantType('cosigner')}
              icon={
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Left Back Avatar (Pink/Red Outline) */}
                  <circle cx="18" cy="20" r="6" stroke="#e20074" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 36C6 30 11.5 28 18 28C21 28 23.5 28.5 25 29.5" stroke="#e20074" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Right Front Avatar (Blue Outline) */}
                  <circle cx="30" cy="24" r="6" stroke="#004b87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="white" />
                  <path d="M19 40C19 34 24.5 32 30 32C35.5 32 41 34 41 40" stroke="#004b87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="white" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Bottom Navigation Row */}
        <div className="w-full flex justify-end items-center mt-8 z-10">
          <button
            onClick={handleContinue}
            disabled={!applicantType}
            className={`
              px-10 py-3.5 rounded-full text-[15.5px] font-bold transition-all duration-300 w-full sm:w-auto min-w-[160px] text-center outline-none select-none
              ${applicantType 
                ? 'bg-[#10365c] hover:bg-[#0b2744] text-white cursor-pointer shadow-lg shadow-blue-900/15' 
                : 'bg-[#d1d5db] text-[#9ca3af] cursor-not-allowed'
              }
            `}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
