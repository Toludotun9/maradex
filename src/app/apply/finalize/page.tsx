'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, ChevronRight } from 'lucide-react';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import ToggleGroup from '@/components/ToggleGroup';
import { useAppContext } from '@/context/AppContext';

export default function FinalizePage() {
  const router = useRouter();
  const { formData, updateFormData, saveApplication, setCurrentStep, isLoading, setIsPageTransitioning } = useAppContext();

  useEffect(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaved, setIsSaved] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);

  const employmentOptions = [
    { label: 'Employed', value: 'Employed' },
    { label: 'Retired', value: 'Retired' },
    { label: 'Self-Employed', value: 'Self-Employed' },
    { label: 'Not Employed', value: 'Not Employed' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.employmentStatus) {
      newErrors.employmentStatus = 'Please select your employment status.';
    }

    if (!formData.annualIncome) {
      newErrors.annualIncome = 'Please enter your total annual income.';
    } else {
      const income = parseInt(formData.annualIncome.replace(/\D/g, ''));
      if (isNaN(income) || (formData.employmentStatus !== 'Not Employed' && income <= 0)) {
         if (formData.employmentStatus !== 'Not Employed') {
            newErrors.annualIncome = 'Please enter a valid positive amount.';
         }
      }
    }

    if (formData.employmentStatus === 'Employed') {
      if (!formData.workPhone) {
        newErrors.workPhone = 'Please enter your work phone number.';
      } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.workPhone)) {
        newErrors.workPhone = 'Please enter a valid phone number.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (!validateForm()) {
      return;
    }

    setIsPageTransitioning(true);
    const result = await saveApplication();

    if (result.success) {
      setCurrentStep(4);
      router.push('/apply/recap');
    } else {
      setIsPageTransitioning(false);
      alert('Failed to save progress. Please try again.');
    }
  };

  const handleBack = () => {
    setCurrentStep(2);
    router.push('/apply/cosigner');
  };

  const handleSaveLater = async () => {
    const result = await saveApplication();
    if (result.success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    updateFormData({ annualIncome: val });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    updateFormData({ workPhone: formatted });
  };

  const renderSidebarContent = () => {
    const commonFooter = (
      <p className="mt-4 text-[13px]">
        You do not need to reveal alimony, child support, or separate maintenance income if you do not wish to have it considered as a basis for loan repayment.
      </p>
    );

    if (formData.employmentStatus === 'Employed' || formData.employmentStatus === 'Self-Employed' || !formData.employmentStatus) {
      return (
        <>
          <p className="font-bold mb-3">These are the types of income that you can include:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Earnings from your W-2 form</li>
            <li>Social Security benefits</li>
            <li>Annual Investment Income</li>
            <li>You may also include annuity, pension, interest and dividend income, rental income, workers compensation, public assistance, separate maintenance income, and tips.</li>
          </ul>
          {commonFooter}
        </>
      );
    }

    if (formData.employmentStatus === 'Retired') {
      return (
        <>
          <p className="font-bold mb-1">These are the types of income that you can include:</p>
          <p className="mb-3 italic">Add up all of your income from the past year, including...</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Social Security</li>
            <li>Annual Investment Income</li>
            <li>401k/IRA distributions</li>
            <li>You may also include annuity, pension, interest and dividend income, rental income, workers compensation, public assistance, separate maintenance income, and tips.</li>
          </ul>
          {commonFooter}
        </>
      );
    }

    if (formData.employmentStatus === 'Not Employed') {
      return (
        <>
          <p className="font-bold mb-1">These are the types of income that you can include:</p>
          <p className="mb-1 italic">You can enter 0 if you do not have any income to report.</p>
          <p className="mb-3 italic">Otherwise, add up all of your income from the past year, including...</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Social Security</li>
            <li>Disability</li>
            <li>Unemployment benefits</li>
            <li>You may also include annuity, pension, interest and dividend income, rental income, workers compensation, public assistance, separate maintenance income, and tips.</li>
          </ul>
          {commonFooter}
        </>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 px-8 md:px-20 w-full max-w-5xl mx-auto">
      <div className="w-full animate-in fade-in slide-in-from-right-4 duration-500">
        <h1 className="text-3xl md:text-5xl font-bold text-primary-blue mb-4 leading-tight">
          Tell us about <span className="text-accent-blue">your employment and income.</span>
        </h1>

        <div className="bg-white rounded-lg p-5 sm:p-10 shadow-xl border border-gray-200 mt-8">
          <h3 className="text-xl font-bold text-primary-blue mb-2">Your employment status.</h3>
          <p className="text-sm text-gray-600 mb-6 font-medium">
            Select your employment status and enter your income. You may be asked to provide documentation to verify your income.
          </p>

          <ToggleGroup
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={(val) => updateFormData({ employmentStatus: val })}
            options={employmentOptions}
            className="mb-8"
            error={errors.employmentStatus}
          />

          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-6">
              <div>
                <label className="block text-sm font-bold text-primary-blue mb-2">Total annual income</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-lg">$</span>
                  <input
                    type="text"
                    value={formData.annualIncome ? Number(formData.annualIncome).toLocaleString() : ''}
                    onChange={handleIncomeChange}
                    className={`w-full pl-8 pr-4 py-3 rounded border font-mono text-lg outline-none transition-all ${errors.annualIncome ? 'border-red-600 focus:ring-1 focus:ring-red-600' : 'border-gray-300 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue'}`}
                    placeholder=""
                  />
                </div>
                {errors.annualIncome && <p className="text-xs text-red-600 font-bold mt-1">{errors.annualIncome}</p>}
              </div>

              {formData.employmentStatus === 'Employed' && (
                <div>
                  <label className="block text-sm font-bold text-primary-blue mb-2">Work phone number</label>
                  <input
                    type="text"
                    value={formData.workPhone || ''}
                    onChange={handlePhoneChange}
                    placeholder="(XXX) XXX-XXXX"
                    className={`w-full px-4 py-3 rounded border font-mono text-lg outline-none transition-all ${errors.workPhone ? 'border-red-600 focus:ring-1 focus:ring-red-600' : 'border-gray-300 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue'}`}
                  />
                  <p className="text-[11px] text-gray-500 mt-1">Must be a U.S. phone number.</p>
                  {errors.workPhone && <p className="text-xs text-red-600 font-bold mt-1">{errors.workPhone}</p>}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="relative bg-[#f0f4f8] rounded-lg p-6 text-sm text-gray-700 leading-relaxed">
                {/* Speech bubble arrow */}
                <div className="hidden md:block absolute top-10 -left-2 w-4 h-4 bg-[#f0f4f8] rotate-45 transform"></div>
                {renderSidebarContent()}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-end gap-8 mt-12 pt-8 border-t border-gray-100">
          <button 
            onClick={handleSaveLater}
            disabled={isLoading || isSaved}
            className={`
              flex items-center gap-2 font-bold transition-all duration-300
              ${isSaved ? 'text-green-600' : 'text-secondary-blue hover:text-primary-blue'}
              disabled:opacity-70
            `}
          >
            <span className={isSaved ? '' : 'border-b-2 border-current'}>
              {isLoading ? 'Saving progress...' : isSaved ? 'Saved!' : 'Save and finish later'}
            </span>
          </button>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button 
              variant="secondary" 
              className="flex-1 md:min-w-[140px]" 
              onClick={handleBack}
              disabled={isLoading || isContinuing}
            >
              Back
            </Button>
            <Button 
              className="flex-1 md:min-w-[140px] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0" 
              onClick={handleContinue}
              loading={isContinuing}
              disabled={isLoading}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
