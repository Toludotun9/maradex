'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, UserPlus, UserCheck } from 'lucide-react';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { useAppContext } from '@/context/AppContext';

export default function AddCosignerPage() {
  const router = useRouter();
  const { formData, updateFormData, saveApplication, setCurrentStep, isLoading } = useAppContext();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaved, setIsSaved] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);

  // Fallback credentials strings for visual instructions
  const activeEmailDisplay = formData.email ? formData.email.trim() : 'student@example.com';
  const activePhoneDisplay = formData.phone ? formData.phone.trim() : '(777) 777-7777';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.hasCosigner) {
      newErrors.hasCosigner = 'Please select whether you want to apply with a cosigner.';
    }

    if (formData.hasCosigner === 'yes') {
      if (formData.cosignerSendEmailDirect) {
        if (!formData.cosignerEmailAddress || !formData.cosignerEmailAddress.trim()) {
          newErrors.cosignerEmailAddress = 'Please enter a valid email address for your cosigner.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.cosignerEmailAddress.trim())) {
          newErrors.cosignerEmailAddress = 'Please enter a valid email address format.';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (!validateForm()) {
      const firstError = document.querySelector('.text-red-600');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsContinuing(true);
    const result = await saveApplication();
    setIsContinuing(false);

    if (result.success) {
      // Progress forward to Finalize step layout sequence
      setCurrentStep(3);
      // router.push('/apply/finalize'); // enable once next route template completes
      alert('Cosigner step configuration saved successfully! Ready for the next Finalize stage.');
    } else {
      alert('Failed to save progress. Please try again.');
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    router.push('/apply/loan');
  };

  const handleSaveLater = async () => {
    const result = await saveApplication();
    if (result.success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 px-8 md:px-20 w-full">
      <div className="w-full animate-in fade-in slide-in-from-right-4 duration-500">
        {/* Premium Header Layout */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-full text-secondary-blue relative">
            <Users className="w-7 h-7" />
            <div className="absolute -bottom-1 -right-1 bg-accent-blue text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold border border-white">
              +
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-4xl font-bold text-primary-blue mb-4 leading-tight max-w-2xl">
          You might benefit from <span className="text-accent-blue">adding a cosigner.</span>
        </h1>
        <p className="text-base text-gray-600 mb-8 leading-relaxed font-medium max-w-2xl">
          Applying with a cosigner may increase your chances of approval and help you get a lower interest rate.
        </p>

        {/* Primary Selection Card */}
        <div className="bg-white rounded-lg p-10 shadow-xl border border-gray-200 mb-8">
          <h3 className="text-2xl font-bold text-primary-blue mb-3">
            Would you like to apply with a cosigner?
          </h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed font-medium">
            Last school year, nearly 90% of our approved undergrad borrowers had cosigners—usually a parent, relative, or other responsible adult who’s a U.S. citizen or permanent resident. Once you add a cosigner, they’ll need to complete their own part of the application and provide some employment and financial info. We’ll send them instructions to help.
          </p>

          <button
            type="button"
            className="text-xs font-bold text-secondary-blue border-b border-secondary-blue pb-0.5 mb-8 hover:text-primary-blue hover:border-primary-blue transition-colors block"
          >
            Learn more about having a creditworthy cosigner
          </button>

          {/* Premium High-Fidelity Custom Selection Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              type="button"
              onClick={() => {
                updateFormData({ hasCosigner: 'yes' });
                if (errors.hasCosigner) {
                  setErrors(prev => ({ ...prev, hasCosigner: '' }));
                }
              }}
              className={`flex items-center gap-4 p-6 rounded-lg border-2 transition-all duration-300 text-left cursor-pointer relative overflow-hidden ${formData.hasCosigner === 'yes' ? 'bg-[#003366] border-[#003366] text-white shadow-md' : 'bg-white border-gray-300 text-primary-blue hover:border-secondary-blue hover:bg-gray-50'}`}
            >
              <div className={`p-3 rounded-full flex-none transition-colors ${formData.hasCosigner === 'yes' ? 'bg-white/10 text-white' : 'bg-blue-50 text-secondary-blue'}`}>
                <UserPlus className="w-8 h-8" />
              </div>
              <div>
                <span className="block font-bold text-lg leading-tight">
                  Yes, I’ll apply with a cosigner
                </span>
              </div>
              {formData.hasCosigner === 'yes' && (
                <div className="absolute top-3 right-3 text-accent-blue">
                  <div className="w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(0,163,224,1)]" />
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                updateFormData({ hasCosigner: 'no' });
                if (errors.hasCosigner) {
                  setErrors(prev => ({ ...prev, hasCosigner: '' }));
                }
              }}
              className={`flex items-center gap-4 p-6 rounded-lg border-2 transition-all duration-300 text-left cursor-pointer relative overflow-hidden ${formData.hasCosigner === 'no' ? 'bg-[#003366] border-[#003366] text-white shadow-md' : 'bg-white border-gray-300 text-primary-blue hover:border-secondary-blue hover:bg-gray-50'}`}
            >
              <div className={`p-3 rounded-full flex-none transition-colors ${formData.hasCosigner === 'no' ? 'bg-white/10 text-white' : 'bg-blue-50 text-secondary-blue'}`}>
                <UserCheck className="w-8 h-8" />
              </div>
              <div>
                <span className="block font-bold text-lg leading-tight">
                  No, I’ll apply individually
                </span>
              </div>
              {formData.hasCosigner === 'no' && (
                <div className="absolute top-3 right-3 text-accent-blue">
                  <div className="w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(0,163,224,1)]" />
                </div>
              )}
            </button>
          </div>

          {errors.hasCosigner && (
            <div className="flex items-center gap-2 mt-4">
              <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] flex-none font-bold">
                !
              </div>
              <span className="text-sm text-red-600 font-bold">{errors.hasCosigner}</span>
            </div>
          )}
        </div>

        {/* Secondary Card: Code Delivery Options (Visible if 'yes' is selected) */}
        {formData.hasCosigner === 'yes' && (
          <div className="bg-white rounded-lg p-10 shadow-xl border border-gray-200 animate-in fade-in slide-in-from-top-4 duration-500 mb-8">
            <h3 className="text-2xl font-bold text-primary-blue mb-3">
              How would you like Maradex to provide your cosigner’s access code?
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed font-medium">
              Your cosigner will need an access code to fill out their part of the application.
            </p>

            <div className="space-y-4 max-w-xl">
              {/* Option A: Student Email (Permanent Default) */}
              <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50/50 select-none pointer-events-none">
                <input
                  type="checkbox"
                  checked={true}
                  readOnly
                  className="mt-1 w-4 h-4 text-gray-400 border-gray-300 rounded focus:ring-0 cursor-not-allowed"
                />
                <span className="text-sm text-gray-700 font-medium leading-tight">
                  Email me the code at <strong>{activeEmailDisplay}</strong> (default)
                </span>
              </div>

              {/* Option B: Student SMS */}
              <label className={`flex items-start gap-4 p-4 rounded-lg border transition-all cursor-pointer select-none ${formData.cosignerSendText ? 'bg-blue-50/30 border-secondary-blue' : 'border-gray-200 hover:bg-gray-50'}`}>
                <input
                  type="checkbox"
                  checked={!!formData.cosignerSendText}
                  onChange={(e) => updateFormData({ cosignerSendText: e.target.checked })}
                  className="mt-1 w-4 h-4 text-secondary-blue border-gray-300 rounded focus:ring-secondary-blue cursor-pointer"
                />
                <span className="text-sm text-gray-800 font-medium leading-tight">
                  Text me the code at <strong>{activePhoneDisplay}</strong>*
                </span>
              </label>

              {/* Option C: Direct Cosigner Email */}
              <div className={`rounded-lg border transition-all overflow-hidden ${formData.cosignerSendEmailDirect ? 'bg-blue-50/30 border-secondary-blue' : 'border-gray-200 hover:bg-gray-50'}`}>
                <label className="flex items-start gap-4 p-4 cursor-pointer select-none w-full">
                  <input
                    type="checkbox"
                    checked={!!formData.cosignerSendEmailDirect}
                    onChange={(e) => updateFormData({ cosignerSendEmailDirect: e.target.checked })}
                    className="mt-1 w-4 h-4 text-secondary-blue border-gray-300 rounded focus:ring-secondary-blue cursor-pointer"
                  />
                  <span className="text-sm text-gray-800 font-medium leading-tight">
                    Email my cosigner the code directly
                  </span>
                </label>

                {/* Sub-Field Slider for Direct Cosigner Email Input */}
                {formData.cosignerSendEmailDirect && (
                  <div className="px-12 pb-5 pt-1 animate-in fade-in slide-in-from-top-2 duration-300 border-t border-blue-100/50">
                    <InputField
                      label="Cosigner email address"
                      name="cosignerEmailAddress"
                      type="email"
                      value={formData.cosignerEmailAddress || ''}
                      onChange={(e) => {
                        updateFormData({ cosignerEmailAddress: e.target.value });
                        if (errors.cosignerEmailAddress) {
                          setErrors(prev => ({ ...prev, cosignerEmailAddress: '' }));
                        }
                      }}
                      placeholder="cosigner@example.com"
                      error={errors.cosignerEmailAddress}
                    />
                  </div>
                )}
              </div>
            </div>

            <p className="text-[11px] text-gray-400 mt-8 leading-relaxed max-w-xl">
              * We’ll text you from (424) 389-8794 and you can reply by texting HELP if you need assistance. Message and data rates may apply. See link below for privacy policy.
            </p>
          </div>
        )}

        {/* Footer Navigation Bar */}
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
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : isSaved ? (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : null}
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
