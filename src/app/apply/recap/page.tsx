'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClipboardCheck, ExternalLink } from 'lucide-react';
import Button from '@/components/Button';
import { useAppContext } from '@/context/AppContext';

export default function RecapPage() {
  const router = useRouter();
  const { formData, saveApplication, setCurrentStep, isLoading } = useAppContext();

  useEffect(() => {
    setCurrentStep(4);
  }, [setCurrentStep]);
  
  const [showSsn, setShowSsn] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);

  const handleContinue = async () => {
    setIsContinuing(true);
    const result = await saveApplication();
    setIsContinuing(false);

    if (result.success) {
      setCurrentStep(4);
      router.push('/apply/submit');
    } else {
      alert('Failed to save progress. Please try again.');
    }
  };

  const handleBack = () => {
    setCurrentStep(3);
    router.push('/apply/finalize');
  };

  const handleSaveLater = async () => {
    const result = await saveApplication();
    if (result.success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const formatCurrency = (val: string | number) => {
    if (!val) return '$0';
    const num = typeof val === 'string' ? parseInt(val.replace(/\D/g, '')) : val;
    return isNaN(num) ? '$0' : `$${num.toLocaleString()}`;
  };

  const formatSsn = (ssn: string) => {
    if (!ssn) return 'XXX-XX-XXXX';
    if (showSsn) {
      // Basic formatting for full SSN
      const cleaned = ssn.replace(/\D/g, '');
      if (cleaned.length === 9) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5)}`;
      }
      return ssn;
    }
    const last4 = ssn.replace(/\D/g, '').slice(-4);
    return `XXX-XX-${last4 || 'XXXX'}`;
  };

  const academicPeriods = [
    { label: 'Spring Only 2026: 01/12/2026 - 05/02/2026', value: 'spring_only_2026' },
    { label: 'Summer Only 2026: 05/11/2026 - 08/15/2026', value: 'summer_only_2026' },
    { label: 'Summer/Fall/Spring 2026-2027: 05/11/2026 - 05/01/2027', value: 'summer_fall_spring_2026_2027' },
    { label: 'Fall/Spring 2026-2027: 08/24/2026 - 05/01/2027', value: 'fall_spring_2026_2027' },
    { label: 'Summer/Fall 2026: 05/11/2026 - 12/12/2026', value: 'summer_fall_2026' },
    { label: 'Fall/Spring 2025-2026: 08/25/2025 - 05/02/2026', value: 'fall_spring_2025_2026' },
    { label: 'Fall Only 2026: 08/24/2026 - 12/12/2026', value: 'fall_only_2026' },
    { label: 'Fall 2025: 08/25/2025 - 12/13/2025', value: 'fall_2025' },
  ];

  const getPeriodLabel = (val: string) => {
    if (val === 'custom') return `Custom: ${formData.loanStartMonth}/${formData.loanStartYear} - ${formData.loanEndMonth}/${formData.loanEndYear}`;
    const period = academicPeriods.find(p => p.value === val);
    return period ? period.label : val;
  };

  const navigateTo = (path: string, stepIndex: number) => {
    setCurrentStep(stepIndex);
    router.push(path);
  };

  const SummaryRow = ({ label, value, onEdit, editLabel = "edit" }: { label: string; value: React.ReactNode; onEdit?: () => void; editLabel?: string }) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-bold text-primary-blue">{label}</span>
        {onEdit && (
          <button 
            onClick={onEdit}
            className="text-xs font-bold text-secondary-blue hover:underline lowercase"
          >
            {editLabel}
          </button>
        )}
      </div>
      <div className="text-base text-gray-700 font-medium">
        {value || <span className="text-gray-400 italic">Not provided</span>}
      </div>
    </div>
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <h3 className="text-2xl font-bold text-primary-blue mb-6 border-b border-gray-100 pb-2">{title}</h3>
  );

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 px-8 md:px-20 w-full max-w-5xl mx-auto">
      <div className="w-full animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-full text-secondary-blue">
            <ClipboardCheck className="w-7 h-7" />
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-primary-blue mb-4 leading-tight">
          Let’s take a moment to <span className="text-accent-blue">recap.</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 font-medium">
          Make sure everything looks correct before wrapping up.
        </p>

        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-10">
            {/* Personal Info Section */}
            <SectionTitle title="Your personal info" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <SummaryRow 
                label="Full name" 
                value={`${formData.firstName} ${formData.middleInitial ? formData.middleInitial + ' ' : ''}${formData.lastName}${formData.suffix ? ' ' + formData.suffix : ''}`} 
                onEdit={() => navigateTo('/apply/personal', 0)}
              />
              <SummaryRow 
                label="SSN, ITIN, or Sallie Mae Admin ID number" 
                value={
                  <div className="flex items-center gap-2">
                    <span>{formatSsn(formData.ssn)}</span>
                    <button 
                      onClick={() => setShowSsn(!showSsn)}
                      className="text-xs font-bold text-secondary-blue hover:underline"
                    >
                      {showSsn ? 'hide' : 'show'}
                    </button>
                  </div>
                } 
                onEdit={() => navigateTo('/apply/personal', 0)}
              />
              <SummaryRow 
                label="Email address" 
                value={formData.email} 
                onEdit={() => navigateTo('/apply/personal', 0)}
              />
              <SummaryRow 
                label="Home address" 
                value={
                  <div>
                    <p>{formData.addressStreet}{formData.addressApt ? `, ${formData.addressApt}` : ''}</p>
                    <p>{formData.addressCity}, {formData.addressState} {formData.addressZip}</p>
                  </div>
                } 
                onEdit={() => navigateTo('/apply/personal', 0)}
              />
              <SummaryRow 
                label="Phone number" 
                value={formData.phone} 
                onEdit={() => navigateTo('/apply/personal', 0)}
              />
              <SummaryRow 
                label="Employment status" 
                value={
                  <div>
                    <p>{formData.employmentStatus || 'Not specified'}</p>
                    <p>{formatCurrency(formData.annualIncome)}/year</p>
                  </div>
                } 
                onEdit={() => navigateTo('/apply/finalize', 3)}
              />
              <SummaryRow 
                label="Date of birth" 
                value={`${formData.dobMonth}/${formData.dobDay}/${formData.dobYear}`} 
                onEdit={() => navigateTo('/apply/personal', 0)}
              />
            </div>

            {/* Loan Info Section */}
            <div className="mt-10 flex flex-col md:flex-row gap-10">
              <div className="flex-[2]">
                <SectionTitle title="Your loan info" />
                <SummaryRow 
                  label="Program info" 
                  value={formData.loanProgramType === 'undergrad' ? 'Undergraduate' : formData.loanProgramType === 'grad' ? 'Graduate' : formData.loanProgramType} 
                  onEdit={() => navigateTo('/apply/loan?substep=0', 1)}
                  editLabel="make changes"
                />
                <SummaryRow 
                  label="Academic loan period" 
                  value={getPeriodLabel(formData.loanAcademicPeriod)} 
                  onEdit={() => navigateTo('/apply/loan?substep=1', 1)}
                  editLabel="make changes"
                />
                <SummaryRow 
                  label="Loan amount" 
                  value={formatCurrency(formData.loanAmountRequested)} 
                  onEdit={() => navigateTo('/apply/loan?substep=1', 1)}
                  editLabel="make changes"
                />
                <SummaryRow 
                  label="Cosigner selection" 
                  value={formData.hasCosigner === 'yes' 
                    ? "You're applying with a cosigner. Their access code will be emailed to you." 
                    : "Applying individually"} 
                  onEdit={() => navigateTo('/apply/cosigner', 2)}
                  editLabel="make changes"
                />

                <div className="mt-12">
                  <SectionTitle title="Your school info" />
                  <SummaryRow 
                    label="School info" 
                    value={
                      <div className="space-y-1">
                        <p className="uppercase">{formData.loanSchoolName}</p>
                        <p>{formData.loanMajor}</p>
                        <p>{formData.loanYearOfStudy}</p>
                      </div>
                    } 
                    onEdit={() => navigateTo('/apply/loan?substep=0', 1)}
                    editLabel="make changes"
                  />
                </div>
              </div>

              {/* Sidebar info */}
              <div className="flex-1">
                <div className="bg-[#f0f4f8] rounded-lg p-8 border border-blue-100">
                  <h4 className="text-lg font-bold text-primary-blue mb-4 leading-tight">
                    Wondering about your interest rate and monthly payments?
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    You’ll likely get an instant decision after you and your cosigner submit the application. If your application is approved, you’ll find out your interest rate and be able to choose which repayment option works best for you.
                  </p>
                </div>
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
