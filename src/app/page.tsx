'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import SelectionCard from '@/components/SelectionCard';
import Button from '@/components/Button';
import { useAppContext } from '@/context/AppContext';

export default function Home() {
  const router = useRouter();
  const { applicantType, setApplicantType } = useAppContext();

  const handleContinue = () => {
    router.push('/apply/personal');
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 px-8 md:px-20">
      <div className="w-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-5xl md:text-4xl font-bold text-blue-900 mb-12 leading-[1.1] text-left">
          Start by telling us <span className="text-blue-500">who's applying.</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-6 bg-white rounded-lg p-10 shadow-xl shadow-black/5 border border-gray-200">
          <div className="flex-1">
            <SelectionCard
              title="Student"
              description="I'm attending school or plan to soon."
              isActive={applicantType === 'student'}
              onClick={() => setApplicantType('student')}
              icon={
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10l10-5 10 5-10 5-10-5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  <path d="M22 10v6" />
                  <circle cx="12" cy="13" r="2" />
                  <path d="M8 19a4 4 0 0 1 8 0" />
                </svg>
              }
            />
          </div>

          <div className="flex-1">
            <SelectionCard
              title="Cosigner"
              description="I'll share financial responsibility for this loan with a student."
              isActive={applicantType === 'cosigner'}
              onClick={() => setApplicantType('cosigner')}
              icon={
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <g stroke="#EF4444">
                    <path d="M14 18a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3" />
                    <circle cx="9" cy="11" r="2.5" />
                  </g>
                  <g stroke={applicantType === 'cosigner' ? 'white' : '#1e3a8a'}>
                    <path d="M20 21a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3" />
                    <circle cx="15" cy="14" r="2.5" />
                  </g>
                </svg>
              }
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 pt-6 border-t border-gray-100">
          <button
            onClick={() => router.push('/resume')}
            className="flex items-center gap-2 text-sm text-secondary-blue font-bold hover:text-primary-blue transition-colors group"
          >
            <svg className="w-4 h-4 text-accent-blue group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Continue where you left off</span>
          </button>

          <Button
            className="w-full sm:w-auto min-w-[200px]"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
