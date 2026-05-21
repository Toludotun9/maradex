'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import { useAppContext } from '@/context/AppContext';

export default function PersonalInfoPage() {
  const router = useRouter();
  const { setCurrentStep, saveApplication, setIsPageTransitioning } = useAppContext();

  useEffect(() => {
    setCurrentStep(0);
  }, [setCurrentStep]);

  const handleContinue = async () => {
    setIsPageTransitioning(true);
    const result = await saveApplication();
    if (result.success) {
      setCurrentStep(1); // Move to Loan Info step on the stepper
      router.push('/apply/loan');
    } else {
      setIsPageTransitioning(false);
      alert('Failed to save your application. Please try again.');
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 px-8 md:px-20">
      <PersonalInfoForm onBack={handleBack} onContinue={handleContinue} />
    </div>
  );
}
