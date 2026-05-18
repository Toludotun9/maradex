'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoanInfoForm from '@/components/LoanInfoForm';
import LoanPeriodForm from '@/components/LoanPeriodForm';
import { useAppContext } from '@/context/AppContext';

function LoanInfoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setCurrentStep, saveApplication } = useAppContext();

  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);
  
  const initialSubStep = parseInt(searchParams.get('substep') || '0');
  const [subStep, setSubStep] = useState(initialSubStep);

  const handleInfoContinue = () => {
    // Scroll to top smoothly when switching sub-steps
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSubStep(1);
  };

  const handlePeriodBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSubStep(0);
  };

  const handleFinalContinue = async () => {
    const result = await saveApplication();
    if (result.success) {
      setCurrentStep(2); // Move to Add Cosigner step
      router.push('/apply/cosigner');
    } else {
      alert('Failed to save your application. Please try again.');
    }
  };

  const handleBackToPersonal = () => {
    setCurrentStep(0);
    router.push('/apply/personal');
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 px-8 md:px-20">
      {subStep === 0 ? (
        <LoanInfoForm onBack={handleBackToPersonal} onContinue={handleInfoContinue} />
      ) : (
        <LoanPeriodForm onBack={handlePeriodBack} onContinue={handleFinalContinue} />
      )}
    </div>
  );
}

export default function LoanInfoPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <LoanInfoContent />
    </Suspense>
  );
}
