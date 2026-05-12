"use client";

import React, { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import Button from './Button';
import SelectField from './SelectField';
import { useAppContext } from '@/context/AppContext';

const fallbackPeriods = [
  { label: 'Spring Only 2026: 01/12/2026 - 05/02/2026', value: 'spring_only_2026' },
  { label: 'Summer Only 2026: 05/11/2026 - 08/15/2026', value: 'summer_only_2026' },
  { label: 'Summer/Fall/Spring 2026-2027: 05/11/2026 - 05/01/2027', value: 'summer_fall_spring_2026_2027' },
  { label: 'Fall/Spring 2026-2027: 08/24/2026 - 05/01/2027', value: 'fall_spring_2026_2027' },
  { label: 'Summer/Fall 2026: 05/11/2026 - 12/12/2026', value: 'summer_fall_2026' },
  { label: 'Fall/Spring 2025-2026: 08/25/2025 - 05/02/2026', value: 'fall_spring_2025_2026' },
  { label: 'Fall Only 2026: 08/24/2026 - 12/12/2026', value: 'fall_only_2026' },
  { label: 'Fall 2025: 08/25/2025 - 12/13/2025', value: 'fall_2025' },
  { label: 'Custom academic loan period', value: 'custom' }
];

const LoanPeriodForm = ({
  onBack,
  onContinue
}: {
  onBack: () => void;
  onContinue: () => void;
}) => {
  const { formData, updateFormData, saveApplication, isLoading } = useAppContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaved, setIsSaved] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);

  // Dynamic API states
  const [fetchedPeriods, setFetchedPeriods] = useState<{ label: string; value: string }[]>([]);
  const [costEstimate, setCostEstimate] = useState<number>(35062);
  const [costText, setCostText] = useState<string>('');
  const [isFetching, setIsFetching] = useState(false);

  // Derive display school name dynamically
  const schoolNameDisplay = formData.loanSchoolName 
    ? formData.loanSchoolName.split(',')[0].toUpperCase() 
    : 'YOUR SCHOOL';

  // Fetch school configuration from APIs dynamically
  useEffect(() => {
    if (formData.loanSchoolName) {
      setIsFetching(true);
      const params = new URLSearchParams({
        school: formData.loanSchoolName,
        program: formData.loanProgramType || 'undergrad',
        degree: formData.loanDegreeType || ''
      });
      fetch(`/api/school-details?${params.toString()}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            if (data.academicPeriods) {
              setFetchedPeriods(data.academicPeriods);
            }
            if (data.costOfAttendance) {
              setCostEstimate(data.costOfAttendance);
              // Ensure the state captures the API value directly
              updateFormData({ loanCostOfAttendance: data.costOfAttendance.toString() });
            }
            if (data.costDetails && data.costDetails.description) {
              setCostText(data.costDetails.description);
            }
          }
        })
        .catch(err => console.error('Error fetching dynamic school configuration API:', err))
        .finally(() => setIsFetching(false));
    } else {
      // populate defaults if empty
      if (!formData.loanCostOfAttendance) {
        updateFormData({ loanCostOfAttendance: '35062' });
      }
    }
  }, [formData.loanSchoolName, formData.loanProgramType]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 1. Academic period selection
    if (!formData.loanAcademicPeriod) {
      newErrors.loanAcademicPeriod = 'Please select an answer to continue.';
    }

    // 2. Custom date ranges
    if (formData.loanAcademicPeriod === 'custom') {
      // Start Date validation
      if (!formData.loanStartMonth || !formData.loanStartYear) {
        newErrors.loanStartDate = 'Please fill out this field to continue.';
      } else {
        const sm = parseInt(formData.loanStartMonth);
        const sy = parseInt(formData.loanStartYear);
        if (isNaN(sm) || sm < 1 || sm > 12) newErrors.loanStartMonth = 'Invalid month';
        if (isNaN(sy) || sy < 2000 || sy > 2050) newErrors.loanStartYear = 'Invalid year';
      }

      // End Date validation
      if (!formData.loanEndMonth || !formData.loanEndYear) {
        newErrors.loanEndDate = 'Please fill out this field to continue.';
      } else {
        const em = parseInt(formData.loanEndMonth);
        const ey = parseInt(formData.loanEndYear);
        if (isNaN(em) || em < 1 || em > 12) newErrors.loanEndMonth = 'Invalid month';
        if (isNaN(ey) || ey < 2000 || ey > 2050) newErrors.loanEndYear = 'Invalid year';
      }
    }

    // 3. Graduation Date validation (mandatory for all options)
    if (!formData.loanGradMonth || !formData.loanGradYear) {
      newErrors.loanGradDate = 'Please fill out this field to continue.';
    } else {
      const gm = parseInt(formData.loanGradMonth);
      const gy = parseInt(formData.loanGradYear);
      if (isNaN(gm) || gm < 1 || gm > 12) newErrors.loanGradMonth = 'Invalid month';
      if (isNaN(gy) || gy < 1950 || gy > 2050) newErrors.loanGradYear = 'Invalid year';
    }

    // 4. Cost of Attendance validation
    if (!formData.loanCostOfAttendance) {
      newErrors.loanCostOfAttendance = 'Please enter your cost of attendance.';
    } else {
      const costNum = parseInt(formData.loanCostOfAttendance);
      if (isNaN(costNum) || costNum <= 0) {
        newErrors.loanCostOfAttendance = 'Please enter a valid positive amount.';
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
    await saveApplication();
    onContinue();
    setIsContinuing(false);
  };

  const handleSaveLater = async () => {
    const result = await saveApplication();
    if (result.success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const handleChange = (updates: any) => {
    updateFormData(updates);
    const newErrors = { ...errors };
    Object.keys(updates).forEach(key => {
      delete newErrors[key];
      if (key.includes('Start')) delete newErrors.loanStartDate;
      if (key.includes('End')) delete newErrors.loanEndDate;
      if (key.includes('Grad')) delete newErrors.loanGradDate;
    });
    setErrors(newErrors);
  };

  const activePeriods = fetchedPeriods.length > 0 ? fetchedPeriods : fallbackPeriods;

  return (
    <div className="w-full mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Premium Circular Wallet Icon Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-full text-secondary-blue relative">
          <Wallet className="w-7 h-7" />
          <div className="absolute -bottom-1 -right-1 bg-accent-blue text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold border border-white">
            $
          </div>
        </div>
      </div>

      <h1 className="text-5xl md:text-4xl font-bold text-primary-blue mb-4 leading-tight">
        Let’s figure out <span className="text-accent-blue">how much to borrow.</span>
      </h1>

      {/* First Card: Academic Period Selection */}
      <div className="mt-8 bg-white rounded-lg p-10 shadow-xl border border-gray-200">
        <h3 className="text-2xl font-bold text-primary-blue mb-3">
          First, are you borrowing for a semester or the full academic year?
        </h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed font-medium">
          Going to school for more than one semester? You can save time and money by borrowing once for the full year. You’ll only have one loan to manage instead of two. Plus, interest won’t be charged on funds needed for the second semester until those funds are sent to {schoolNameDisplay}.
        </p>

        <button 
          type="button" 
          className="text-xs font-bold text-secondary-blue border-b border-secondary-blue pb-0.5 mb-8 hover:text-primary-blue hover:border-primary-blue transition-colors block"
        >
          Choosing the period you’re borrowing for
        </button>

        <div className="max-w-xl mb-8">
          <SelectField
            label="What part of the academic year are you borrowing for?"
            name="loanAcademicPeriod"
            value={formData.loanAcademicPeriod}
            error={errors.loanAcademicPeriod}
            options={activePeriods}
            onChange={(e) => {
              handleChange({ 
                loanAcademicPeriod: e.target.value,
                // Clear out sub-fields if non-custom selected
                ...(e.target.value !== 'custom' ? {
                  loanStartMonth: '',
                  loanStartYear: '',
                  loanEndMonth: '',
                  loanEndYear: ''
                } : {})
              });
            }}
            placeholder={isFetching ? "Loading institutional periods from API..." : "Select academic period"}
          />
        </div>

        {/* Custom Start & End Date Section */}
        {formData.loanAcademicPeriod === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 animate-in fade-in slide-in-from-top-4 duration-500 pt-2">
            <div>
              <label className={`text-sm font-bold text-primary-blue mb-3 block ${errors.loanStartDate || errors.loanStartMonth || errors.loanStartYear ? 'text-red-600' : ''}`}>
                Start date
              </label>
              <div className="flex items-center gap-3">
                <input
                  name="loanStartMonth"
                  placeholder="MM"
                  maxLength={2}
                  value={formData.loanStartMonth}
                  onChange={(e) => handleChange({ loanStartMonth: e.target.value })}
                  className={`w-16 px-3 py-3 rounded border transition-all text-center text-gray-700 outline-none font-mono ${errors.loanStartMonth || errors.loanStartDate ? 'border-red-600 focus:ring-1 focus:ring-red-600' : 'border-gray-300 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue'}`}
                />
                <span className="text-xl text-gray-400">/</span>
                <input
                  name="loanStartYear"
                  placeholder="YYYY"
                  maxLength={4}
                  value={formData.loanStartYear}
                  onChange={(e) => handleChange({ loanStartYear: e.target.value })}
                  className={`w-28 px-3 py-3 rounded border transition-all text-center text-gray-700 outline-none font-mono ${errors.loanStartYear || errors.loanStartDate ? 'border-red-600 focus:ring-1 focus:ring-red-600' : 'border-gray-300 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue'}`}
                />
              </div>
              {(errors.loanStartDate || errors.loanStartMonth || errors.loanStartYear) && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] flex-none font-bold">
                    !
                  </div>
                  <span className="text-sm text-red-600 font-bold">{errors.loanStartDate || errors.loanStartMonth || errors.loanStartYear}</span>
                </div>
              )}
            </div>

            <div>
              <label className={`text-sm font-bold text-primary-blue mb-3 block ${errors.loanEndDate || errors.loanEndMonth || errors.loanEndYear ? 'text-red-600' : ''}`}>
                End date
              </label>
              <div className="flex items-center gap-3">
                <input
                  name="loanEndMonth"
                  placeholder="MM"
                  maxLength={2}
                  value={formData.loanEndMonth}
                  onChange={(e) => handleChange({ loanEndMonth: e.target.value })}
                  className={`w-16 px-3 py-3 rounded border transition-all text-center text-gray-700 outline-none font-mono ${errors.loanEndMonth || errors.loanEndDate ? 'border-red-600 focus:ring-1 focus:ring-red-600' : 'border-gray-300 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue'}`}
                />
                <span className="text-xl text-gray-400">/</span>
                <input
                  name="loanEndYear"
                  placeholder="YYYY"
                  maxLength={4}
                  value={formData.loanEndYear}
                  onChange={(e) => handleChange({ loanEndYear: e.target.value })}
                  className={`w-28 px-3 py-3 rounded border transition-all text-center text-gray-700 outline-none font-mono ${errors.loanEndYear || errors.loanEndDate ? 'border-red-600 focus:ring-1 focus:ring-red-600' : 'border-gray-300 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue'}`}
                />
              </div>
              {(errors.loanEndDate || errors.loanEndMonth || errors.loanEndYear) && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] flex-none font-bold">
                    !
                  </div>
                  <span className="text-sm text-red-600 font-bold">{errors.loanEndDate || errors.loanEndMonth || errors.loanEndYear}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Expected Graduation Date Section */}
        <div className="pt-2">
          <label className={`text-sm font-bold text-primary-blue mb-3 block ${errors.loanGradDate || errors.loanGradMonth || errors.loanGradYear ? 'text-red-600' : ''}`}>
            When do you expect to graduate?
          </label>
          <div className="flex items-center gap-3">
            <input
              name="loanGradMonth"
              placeholder="MM"
              maxLength={2}
              value={formData.loanGradMonth}
              onChange={(e) => handleChange({ loanGradMonth: e.target.value })}
              className={`w-16 px-3 py-3 rounded border transition-all text-center text-gray-700 outline-none font-mono ${errors.loanGradMonth || errors.loanGradDate ? 'border-red-600 focus:ring-1 focus:ring-red-600' : 'border-gray-300 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue'}`}
            />
            <span className="text-xl text-gray-400">/</span>
            <input
              name="loanGradYear"
              placeholder="YYYY"
              maxLength={4}
              value={formData.loanGradYear}
              onChange={(e) => handleChange({ loanGradYear: e.target.value })}
              className={`w-28 px-3 py-3 rounded border transition-all text-center text-gray-700 outline-none font-mono ${errors.loanGradYear || errors.loanGradDate ? 'border-red-600 focus:ring-1 focus:ring-red-600' : 'border-gray-300 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue'}`}
            />
          </div>
          {(errors.loanGradDate || errors.loanGradMonth || errors.loanGradYear) && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] flex-none font-bold">
                !
              </div>
              <span className="text-sm text-red-600 font-bold">{errors.loanGradDate || errors.loanGradMonth || errors.loanGradYear}</span>
            </div>
          )}
        </div>
      </div>

      {/* Second Card: Dynamic Cost of Attendance */}
      <div className="mt-8 bg-white rounded-lg p-10 shadow-xl border border-gray-200 animate-in fade-in slide-in-from-top-4 duration-500">
        <h3 className="text-2xl font-bold text-primary-blue mb-3">
          Next, tell us your cost of attendance.
        </h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed font-medium">
          {costText || `The estimated out-of-state cost of attendance for grad students enrolled full time at ${schoolNameDisplay} is $35,062, for the whole school year, and includes tuition, fees, housing, meals, books, and supplies, but your cost may be different because you selected a period that is less than the school year. You can use this estimate to help you determine the cost of attendance for your loan period or enter your own amount.`}
        </p>

        <button 
          type="button" 
          className="text-xs font-bold text-secondary-blue border-b border-secondary-blue pb-0.5 mb-8 hover:text-primary-blue hover:border-primary-blue transition-colors block"
        >
          How we got this estimated cost of attendance
        </button>

        <div className="max-w-xs">
          <div className="relative flex items-center">
            <span className="absolute left-4 text-gray-700 font-bold text-lg pointer-events-none">$</span>
            <input
              name="loanCostOfAttendance"
              type="text"
              value={formData.loanCostOfAttendance || costEstimate.toString()}
              onChange={(e) => {
                // allow numeric digits only
                const val = e.target.value.replace(/\D/g, '');
                handleChange({ loanCostOfAttendance: val });
              }}
              placeholder={costEstimate.toString()}
              className={`w-full pl-8 pr-4 py-3 rounded border font-mono text-lg text-gray-800 outline-none transition-all ${errors.loanCostOfAttendance ? 'border-red-600 focus:ring-1 focus:ring-red-600' : 'border-secondary-blue focus:ring-2 focus:ring-secondary-blue'}`}
            />
          </div>
          {errors.loanCostOfAttendance && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] flex-none font-bold">
                !
              </div>
              <span className="text-sm text-red-600 font-bold">{errors.loanCostOfAttendance}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Actions Footer */}
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
            onClick={onBack}
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
  );
};

export default LoanPeriodForm;
