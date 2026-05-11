'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import LoanInfoForm from '@/components/LoanInfoForm';
import { useAppContext } from '@/context/AppContext';

export default function LoanInfoPage() {
  const router = useRouter();
  const { setCurrentStep, saveApplication } = useAppContext();

  const handleContinue = async () => {
    const result = await saveApplication();
    if (result.success) {
      setCurrentStep(2); // Move to Add Cosigner step
      // router.push('/apply/cosigner');
    } else {
      alert('Failed to save your application. Please try again.');
    }
  };

  const handleBack = () => {
    setCurrentStep(0);
    router.push('/apply/personal');
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 px-8 md:px-20">
      <LoanInfoForm onBack={handleBack} onContinue={handleContinue} />
    </div>
  );
}
