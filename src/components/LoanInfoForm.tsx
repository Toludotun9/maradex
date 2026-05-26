"use client";

import React, { useState, useEffect } from 'react';
import { GraduationCap, Gavel, BriefcaseMedical, FileText } from 'lucide-react';
import Button from './Button';
import ToggleGroup from './ToggleGroup';
import InputField from './InputField';
import SelectField from './SelectField';
import StateAutocomplete from './StateAutocomplete';
import SchoolAutocomplete from './SchoolAutocomplete';
import { useAppContext } from '@/context/AppContext';

const LoanInfoForm = ({
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
  const [fetchedFieldsOfStudy, setFetchedFieldsOfStudy] = useState<{ label: string; value: string }[]>([]);
  const [isFetchingFields, setIsFetchingFields] = useState(false);

  // Fetch dynamic fields of study from API when school or program changes
  useEffect(() => {
    if (formData.loanSchoolName && formData.loanProgramType) {
      setIsFetchingFields(true);
      const params = new URLSearchParams({
        school: formData.loanSchoolName,
        program: formData.loanProgramType,
        degree: formData.loanDegreeType || ''
      });
      fetch(`/api/school-details?${params.toString()}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.fieldsOfStudy) {
            setFetchedFieldsOfStudy(data.fieldsOfStudy);
          }
        })
        .catch(err => console.error('Error fetching dynamic fields:', err))
        .finally(() => setIsFetchingFields(false));
    } else {
      setFetchedFieldsOfStudy([]);
    }
  }, [formData.loanSchoolName, formData.loanProgramType, formData.loanDegreeType]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 1. Program Selection
    if (!formData.loanProgramType) {
      newErrors.loanProgramType = 'Please select a program type';
    }

    // 2. Degree Type (for non-Bar programs)
    if (formData.loanProgramType && formData.loanProgramType !== 'bar' && !formData.loanDegreeType) {
      newErrors.loanDegreeType = 'Please select your degree type';
    }

    // 3. School Selection (if program is selected)
    if (formData.loanProgramType) {
      if (!formData.loanSchoolState && !formData.loanSchoolOutsideUs) {
        newErrors.loanSchoolState = 'State/territory is required';
      }
      if (!formData.loanSchoolName) {
        newErrors.loanSchoolName = 'School name is required';
      }
    }

    // 4. Undergrad/Grad/Residency Specifics
    if (['undergrad', 'grad', 'residency'].includes(formData.loanProgramType)) {
      if (!formData.loanMajor) {
        newErrors.loanMajor = 'Field of study is required';
      }
      
      if (formData.loanProgramType === 'residency') {
         if (!formData.loanAttendance) {
           newErrors.loanAttendance = 'Please select your attendance status';
         }
         // Graduation Date
         if (!formData.loanGradMonth || !formData.loanGradYear) {
           newErrors.loanGradDate = 'Full graduation date is required';
         } else {
           const month = parseInt(formData.loanGradMonth);
           const year = parseInt(formData.loanGradYear);
           if (isNaN(month) || month < 1 || month > 12) newErrors.loanGradMonth = 'Invalid month (01-12)';
           if (isNaN(year) || year < 1950 || year > 2050) newErrors.loanGradYear = 'Invalid year';
         }
      } else {
        if (!formData.loanYearOfStudy) {
          newErrors.loanYearOfStudy = 'Please select your year of study';
        }
        if (!formData.loanAttendance) {
          newErrors.loanAttendance = 'Please select your attendance plan';
        }
      }
    }

    // 5. Bar Specifics & Dates
    if (formData.loanProgramType === 'bar') {
      if (!formData.loanAttendance) {
        newErrors.loanAttendance = 'Please select your attendance status';
      }

      // Graduation Date
      if (!formData.loanGradMonth || !formData.loanGradYear) {
        newErrors.loanGradDate = 'Full graduation date is required';
      } else {
        const month = parseInt(formData.loanGradMonth);
        const year = parseInt(formData.loanGradYear);
        if (isNaN(month) || month < 1 || month > 12) newErrors.loanGradMonth = 'Invalid month (01-12)';
        if (isNaN(year) || year < 1950 || year > 2050) newErrors.loanGradYear = 'Invalid year';
      }

      // Bar Exam Date
      if (!formData.loanBarExamMonth || !formData.loanBarExamYear) {
        newErrors.loanBarExamDate = 'Full bar exam date is required';
      } else {
        const month = parseInt(formData.loanBarExamMonth);
        const year = parseInt(formData.loanBarExamYear);
        if (isNaN(month) || month < 1 || month > 12) newErrors.loanBarExamMonth = 'Invalid month (01-12)';
        if (isNaN(year) || year < 1950 || year > 2050) newErrors.loanBarExamYear = 'Invalid year';
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
      if (key.includes('Grad')) delete newErrors.loanGradDate;
      if (key.includes('BarExam')) delete newErrors.loanBarExamDate;
    });
    setErrors(newErrors);
  };

  return (
    <div className="w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl md:text-5xl font-bold text-primary-blue mb-4">
        Tell us about your <span className="text-accent-blue">studies.</span>
      </h1>
      <p className="text-xl text-gray-600 mb-10">This will help us figure out the best loan for you.</p>

      <div className="bg-white rounded-lg p-5 sm:p-10 shadow-xl border border-gray-200">
        <h2 className="text-[17px] font-bold text-black leading-snug mb-6">
          What type of program do you need a loan for?
        </h2>
        <ToggleGroup
          name="loanProgramType"
          value={formData.loanProgramType}
          variant="program"
          error={errors.loanProgramType}
          options={[
            { 
              label: 'Undergrad | Certificate', 
              value: 'undergrad',
              icon: <GraduationCap className="w-8 h-8" />
            },
            { 
              label: 'Grad | Professional', 
              value: 'grad',
              icon: <GraduationCap className="w-8 h-8" />
            },
            { 
              label: 'Bar study', 
              value: 'bar',
              icon: <Gavel className="w-8 h-8" />
            },
            { 
              label: 'Residency and relocation', 
              value: 'residency',
              icon: <BriefcaseMedical className="w-8 h-8" />
            }
          ]}
          onChange={(val) => {
            handleChange({ 
              loanProgramType: val,
              loanDegreeType: '',
              loanMajor: '',
              loanYearOfStudy: '',
              loanAttendance: '',
              loanSchoolState: '',
              loanSchoolName: '',
              loanSchoolOutsideUs: false,
              loanGradMonth: '',
              loanGradYear: '',
              loanBarExamMonth: '',
              loanBarExamYear: ''
            });
            if (val === 'bar') {
              handleChange({ loanMajor: 'Bar Study Exam' });
            }
          }}
        />

        {formData.loanProgramType === 'undergrad' && (
          <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <p className="text-sm text-gray-500 mb-8 font-medium">
              For students pursuing an associate or bachelor’s degree, trade school certification or continuing education.
            </p>
            <ToggleGroup
              label="What kind of degree are you getting?"
              name="loanDegreeType"
              value={formData.loanDegreeType}
              error={errors.loanDegreeType}
              options={[
                { label: 'Associate', value: 'associate' },
                { label: 'Bachelor', value: 'bachelor' },
                { label: 'Certificate', value: 'certificate' },
                { label: 'Other', value: 'other' }
              ]}
              onChange={(val) => handleChange({ loanDegreeType: val })}
            />
          </div>
        )}

        {formData.loanProgramType === 'grad' && (
          <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <SelectField
              label="What kind of degree are you getting?"
              name="loanDegreeType"
              value={formData.loanDegreeType}
              error={errors.loanDegreeType}
              options={[
                { label: 'Business (MBA)', value: 'mba' },
                { label: 'Dental (DMD, DDS)', value: 'dental' },
                { label: 'Doctor of Veterinary Medicine (DVM, VMD)', value: 'vet' },
                { label: 'Doctorate (PhD, PharmD, Other)', value: 'phd' },
                { label: 'Law (JD, S.J.D.)', value: 'law' },
                { label: 'Masters Program (MA, MS, Other)', value: 'masters' },
                { label: 'Medical (MD, DO, DPM)', value: 'medical' },
                { label: 'Post-Graduate Degree Certificates', value: 'post-grad-cert' }
              ]}
              onChange={(e) => handleChange({ loanDegreeType: e.target.value })}
              placeholder="Select"
            />
          </div>
        )}

        {formData.loanProgramType === 'residency' && (
          <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <ToggleGroup
              label="What kind of degree are you getting?"
              name="loanDegreeType"
              value={formData.loanDegreeType}
              error={errors.loanDegreeType}
              options={[
                { label: 'Dental', value: 'dental' },
                { label: 'Medical', value: 'medical' }
              ]}
              onChange={(val) => handleChange({ loanDegreeType: val })}
            />
          </div>
        )}
      </div>
      
      {((formData.loanProgramType === 'bar') || (formData.loanDegreeType)) && (
        <div className="mt-10 bg-white rounded-lg p-5 sm:p-10 shadow-xl border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-2xl font-bold text-primary-blue mb-8">
            {formData.loanProgramType === 'bar' 
              ? 'Where do you attend law school?' 
              : formData.loanProgramType === 'residency' 
                ? `Where do you attend ${formData.loanDegreeType} school?`
                : 'Where will you attend school?'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StateAutocomplete
              label="State/territory"
              name="loanSchoolState"
              placeholder="Type to search"
              value={formData.loanSchoolState}
              error={errors.loanSchoolState}
              onChange={(e) => handleChange({ loanSchoolState: e.target.value, loanSchoolName: '' })}
              onSelect={(val) => handleChange({ loanSchoolState: val, loanSchoolName: '' })}
            />
            <SchoolAutocomplete
              label="School name"
              name="loanSchoolName"
              placeholder="Type to search"
              stateFilter={formData.loanSchoolState}
              value={formData.loanSchoolName}
              error={errors.loanSchoolName}
              onChange={(e) => handleChange({ loanSchoolName: e.target.value })}
              onSelect={(val) => handleChange({ loanSchoolName: val })}
            />
          </div>
          
          <div className="mt-6 flex flex-col gap-4">
            {formData.loanProgramType !== 'bar' && (
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={formData.loanSchoolOutsideUs}
                    onChange={(e) => handleChange({ loanSchoolOutsideUs: e.target.checked })}
                    className="peer h-6 w-6 appearance-none rounded border-2 border-gray-300 transition-all checked:border-secondary-blue checked:bg-secondary-blue hover:border-secondary-blue"
                  />
                  <svg className="absolute h-4 w-4 text-white opacity-0 transition-opacity peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-primary-blue group-hover:text-secondary-blue transition-colors">
                  I'm attending a school outside the U.S.
                </span>
              </label>
            )}
            
            <button className="w-fit text-sm text-secondary-blue font-bold border-b-2 border-secondary-blue hover:text-primary-blue hover:border-primary-blue transition-all">
              I can’t find my school
            </button>
          </div>

          {/* Grad Specific Details */}
          {formData.loanProgramType === 'grad' && formData.loanSchoolState && formData.loanSchoolName && (
            <div className="mt-8 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="mb-8">
                <SelectField
                  label="What is your field of study?"
                  name="loanMajor"
                  value={formData.loanMajor}
                  error={errors.loanMajor}
                  options={fetchedFieldsOfStudy.length > 0 ? fetchedFieldsOfStudy : [
                    { label: 'Master of Business Administration', value: 'mba' },
                    { label: 'Master of Science', value: 'ms' },
                    { label: 'Master of Arts', value: 'ma' },
                    { label: 'Doctor of Philosophy (PhD)', value: 'phd' },
                    { label: 'Doctor of Medicine (MD)', value: 'md' },
                    { label: 'Juris Doctor (JD)', value: 'jd' },
                    { label: 'Other Professional Degree', value: 'other-prof' }
                  ]}
                  onChange={(e) => handleChange({ loanMajor: e.target.value })}
                  placeholder={isFetchingFields ? "Loading curriculum from API..." : "Select"}
                />
                <p className="mt-4 text-xs text-gray-500 leading-relaxed font-medium">
                  Your school only has one option for a field of study. Don't worry- this won't impact your application.
                </p>
              </div>

              {formData.loanMajor && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <ToggleGroup
                    label="This loan is for my..."
                    name="loanYearOfStudy"
                    value={formData.loanYearOfStudy}
                    error={errors.loanYearOfStudy}
                    options={[
                      { label: 'First Year Masters/Doctorate', value: 'grad-1' },
                      { label: 'Second Year Masters/Doctorate', value: 'grad-2' },
                      { label: 'Third Year Masters/Doctorate', value: 'grad-3' },
                      { label: 'Fourth Year Masters/Doctorate', value: 'grad-4' }
                    ]}
                    onChange={(val) => handleChange({ loanYearOfStudy: val })}
                  />
                </div>
              )}

              {formData.loanYearOfStudy && (
                <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                  <ToggleGroup
                    label="I plan to attend school..."
                    name="loanAttendance"
                    value={formData.loanAttendance}
                    error={errors.loanAttendance}
                    options={[
                      { label: 'Full Time', value: 'full-time' },
                      { label: 'Half Time', value: 'half-time' },
                      { label: 'Less Than Half Time', value: 'less-than-half' }
                    ]}
                    onChange={(val) => handleChange({ loanAttendance: val })}
                  />
                </div>
              )}
            </div>
          )}

          {/* Bar Specific Details */}
          {formData.loanProgramType === 'bar' && formData.loanSchoolState && formData.loanSchoolName && (
            <div className="mt-8 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="mb-8">
                <InputField
                  label="What is your field of study?"
                  name="loanMajor"
                  value={formData.loanMajor}
                  error={errors.loanMajor}
                  onChange={(e) => handleChange({ loanMajor: e.target.value })}
                />
                <p className="mt-4 text-xs text-gray-500 leading-relaxed font-medium">
                  Your school only has one option for a field of study. Don't worry- this won't impact your application.
                </p>
              </div>

              <div className="mb-8">
                <ToggleGroup
                  label="I'm attending law school..."
                  name="loanAttendance"
                  value={formData.loanAttendance}
                  error={errors.loanAttendance}
                  options={[
                    { label: 'Full Time', value: 'full-time' },
                    { label: 'Half Time', value: 'half-time' },
                    { label: 'Already Graduated', value: 'graduated' }
                  ]}
                  onChange={(val) => handleChange({ loanAttendance: val })}
                />
              </div>

              {formData.loanAttendance && (
                <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div>
                    <label className={`text-sm font-bold text-primary-blue mb-4 block ${errors.loanGradDate || errors.loanGradMonth || errors.loanGradYear ? 'text-red-600' : ''}`}>
                      {formData.loanAttendance === 'graduated' ? 'When did you graduate?' : 'When do you expect to graduate?'}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        name="loanGradMonth"
                        placeholder="MM"
                        maxLength={2}
                        value={formData.loanGradMonth}
                        onChange={(e) => handleChange({ loanGradMonth: e.target.value })}
                        className={`w-16 px-3 py-3 rounded border transition-all text-center text-gray-700 outline-none ${errors.loanGradMonth || errors.loanGradDate ? 'border-red-600' : 'border-gray-300 focus:border-secondary-blue'}`}
                      />
                      <span className="text-xl text-gray-400">/</span>
                      <input
                        name="loanGradYear"
                        placeholder="YYYY"
                        maxLength={4}
                        value={formData.loanGradYear}
                        onChange={(e) => handleChange({ loanGradYear: e.target.value })}
                        className={`w-28 px-3 py-3 rounded border transition-all text-center text-gray-700 outline-none ${errors.loanGradYear || errors.loanGradDate ? 'border-red-600' : 'border-gray-300 focus:border-secondary-blue'}`}
                      />
                    </div>
                    {(errors.loanGradDate || errors.loanGradMonth || errors.loanGradYear) && (
                       <p className="text-xs text-red-600 font-bold mt-2">{errors.loanGradDate || errors.loanGradMonth || errors.loanGradYear}</p>
                    )}
                  </div>

                  <div>
                    <label className={`text-sm font-bold text-primary-blue mb-4 block ${errors.loanBarExamDate || errors.loanBarExamMonth || errors.loanBarExamYear ? 'text-red-600' : ''}`}>
                      When will you be taking the bar exam?
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        name="loanBarExamMonth"
                        placeholder="MM"
                        maxLength={2}
                        value={formData.loanBarExamMonth}
                        onChange={(e) => handleChange({ loanBarExamMonth: e.target.value })}
                        className={`w-16 px-3 py-3 rounded border transition-all text-center text-gray-700 outline-none ${errors.loanBarExamMonth || errors.loanBarExamDate ? 'border-red-600' : 'border-gray-300 focus:border-secondary-blue'}`}
                      />
                      <span className="text-xl text-gray-400">/</span>
                      <input
                        name="loanBarExamYear"
                        placeholder="YYYY"
                        maxLength={4}
                        value={formData.loanBarExamYear}
                        onChange={(e) => handleChange({ loanBarExamYear: e.target.value })}
                        className={`w-28 px-3 py-3 rounded border transition-all text-center text-gray-700 outline-none ${errors.loanBarExamYear || errors.loanBarExamDate ? 'border-red-600' : 'border-gray-300 focus:border-secondary-blue'}`}
                      />
                    </div>
                    {(errors.loanBarExamDate || errors.loanBarExamMonth || errors.loanBarExamYear) && (
                       <p className="text-xs text-red-600 font-bold mt-2">{errors.loanBarExamDate || errors.loanBarExamMonth || errors.loanBarExamYear}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Residency Specific Details - Progressive Disclosure */}
          {formData.loanProgramType === 'residency' && formData.loanSchoolState && formData.loanSchoolName && (
            <div className="mt-8 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="mb-8">
                <SelectField
                  label="What is your field of study?"
                  name="loanMajor"
                  value={formData.loanMajor}
                  error={errors.loanMajor}
                  options={fetchedFieldsOfStudy.length > 0 ? fetchedFieldsOfStudy : (formData.loanDegreeType === 'medical' ? [
                    { label: 'MD - Anesthesiology', value: 'anesthesiology' },
                    { label: 'MD - Dermatology', value: 'dermatology' },
                    { label: 'MD - Dermatopathology', value: 'dermatopathology' },
                    { label: 'MD - Emergency Medicine', value: 'emergency' },
                    { label: 'MD - Family Medicine', value: 'family' },
                    { label: 'MD - Internal Medicine', value: 'internal' },
                    { label: 'MD - Neurology', value: 'neurology' },
                    { label: 'MD - Obstetrics & Gynecology', value: 'obgyn' },
                    { label: 'MD - Ophthalmology', value: 'ophthalmology' },
                    { label: 'MD - Pediatrics', value: 'pediatrics' },
                    { label: 'MD - Psychiatry', value: 'psychiatry' },
                    { label: 'MD - Radiology', value: 'radiology' },
                    { label: 'MD - Surgery (General)', value: 'surgery' },
                    { label: 'MD - Other', value: 'other-medical' }
                  ] : [
                    { label: 'DDS/DMD - Endodontics', value: 'endodontics' },
                    { label: 'DDS/DMD - Oral & Maxillofacial Surgery', value: 'oral-surgery' },
                    { label: 'DDS/DMD - Orthodontics', value: 'orthodontics' },
                    { label: 'DDS/DMD - Pediatric Dentistry', value: 'pediatric-dental' },
                    { label: 'DDS/DMD - Periodontics', value: 'periodontics' },
                    { label: 'DDS/DMD - Prosthodontics', value: 'prosthodontics' },
                    { label: 'DDS/DMD - Other', value: 'other-dental' }
                  ])}
                  onChange={(e) => handleChange({ loanMajor: e.target.value })}
                  placeholder={isFetchingFields ? "Loading curriculum from API..." : "Select"}
                />
                <p className="mt-4 text-xs text-gray-500 leading-relaxed font-medium">
                  We’re interested in learning more about your {formData.loanDegreeType} school journey. If you don’t see your field, choose whichever is closest. Your field won’t impact your loan application.
                </p>
              </div>

              {formData.loanMajor && (
                <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                  <ToggleGroup
                    label={`I'm attending ${formData.loanDegreeType} school...`}
                    name="loanAttendance"
                    value={formData.loanAttendance}
                    error={errors.loanAttendance}
                    options={[
                      { label: 'Full Time', value: 'full-time' },
                      { label: 'Half Time', value: 'half-time' },
                      { label: 'Already Graduated', value: 'graduated' }
                    ]}
                    onChange={(val) => handleChange({ loanAttendance: val })}
                  />
                </div>
              )}

              {formData.loanAttendance && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <label className={`text-sm font-bold text-primary-blue mb-4 block ${errors.loanGradDate || errors.loanGradMonth || errors.loanGradYear ? 'text-red-600' : ''}`}>
                    {formData.loanAttendance === 'graduated' ? 'When did you graduate?' : 'When do you expect to graduate?'}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      name="loanGradMonth"
                      placeholder="MM"
                      maxLength={2}
                      value={formData.loanGradMonth}
                      onChange={(e) => handleChange({ loanGradMonth: e.target.value })}
                      className={`w-16 px-3 py-3 rounded border transition-all text-center text-gray-700 outline-none ${errors.loanGradMonth || errors.loanGradDate ? 'border-red-600' : 'border-gray-300 focus:border-secondary-blue'}`}
                    />
                    <span className="text-xl text-gray-400">/</span>
                    <input
                      name="loanGradYear"
                      placeholder="YYYY"
                      maxLength={4}
                      value={formData.loanGradYear}
                      onChange={(e) => handleChange({ loanGradYear: e.target.value })}
                      className={`w-28 px-3 py-3 rounded border transition-all text-center text-gray-700 outline-none ${errors.loanGradYear || errors.loanGradDate ? 'border-red-600' : 'border-gray-300 focus:border-secondary-blue'}`}
                    />
                  </div>
                  {(errors.loanGradDate || errors.loanGradMonth || errors.loanGradYear) && (
                     <p className="text-xs text-red-600 font-bold mt-2">{errors.loanGradDate || errors.loanGradMonth || errors.loanGradYear}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Undergrad Specific Details - Progressive Disclosure */}
          {formData.loanProgramType === 'undergrad' && formData.loanSchoolState && formData.loanSchoolName && (
            <div className="mt-8 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="mb-8">
                <SelectField
                  label="What are you interested in studying?"
                  name="loanMajor"
                  value={formData.loanMajor}
                  error={errors.loanMajor}
                  options={fetchedFieldsOfStudy.length > 0 ? fetchedFieldsOfStudy : [
                    { label: 'Undeclared', value: 'undeclared' },
                    { label: 'Agriculture & Natural Resources', value: 'agriculture' },
                    { label: 'Architecture, Planning & Preservation', value: 'architecture' },
                    { label: 'Arts, Media & Film', value: 'arts' },
                    { label: 'Aviation & Airline Programs', value: 'aviation' },
                    { label: 'Behavioral & Social Sciences/Public Policy', value: 'behavioral-sciences' },
                    { label: 'Biology, Chemistry, Science', value: 'biology-chemistry-science' },
                    { label: 'Boot Camp Training/Coding', value: 'bootcamp' },
                    { label: 'Business & Financial', value: 'business-financial' },
                    { label: 'Computer & Information Sciences', value: 'computer-sciences' },
                    { label: 'Cosmetology/Barbering', value: 'cosmetology' },
                    { label: 'Criminal Justice', value: 'criminal-justice' },
                    { label: 'Culinary & Food Sciences', value: 'culinary' },
                    { label: 'Dental Studies', value: 'dental' },
                    { label: 'Education', value: 'education' },
                    { label: 'Engineering', value: 'engineering' },
                    { label: 'Intelligence & Homeland Security', value: 'intelligence-security' },
                    { label: 'Law Studies', value: 'law' },
                    { label: 'Liberal Arts, Gen Studies & Humanities', value: 'liberal-arts' },
                    { label: 'Mathematics', value: 'mathematics' }
                  ]}
                  onChange={(e) => handleChange({ loanMajor: e.target.value })}
                  placeholder={isFetchingFields ? "Loading curriculum from API..." : "Select"}
                />
                <p className="mt-4 text-xs text-gray-500 leading-relaxed font-medium">
                  We’re interested in learning more about your college journey. If you don’t see your major, choose whichever is closest. Your major won’t impact your loan application.
                </p>
              </div>

              {formData.loanMajor && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <ToggleGroup
                    label="This loan is for my..."
                    name="loanYearOfStudy"
                    value={formData.loanYearOfStudy}
                    error={errors.loanYearOfStudy}
                    options={[
                      { label: 'Freshman Undergraduate', value: 'freshman' },
                      { label: 'Sophomore Undergraduate', value: 'sophomore' },
                      { label: 'Junior Undergraduate', value: 'junior' },
                      { label: 'Senior Undergraduate (Fourth Year)', value: 'senior-4' },
                      { label: 'Senior Undergraduate (Fifth Year)', value: 'senior-5' },
                      { label: 'Certificate/Continuing Ed', value: 'certificate-ed' }
                    ]}
                    onChange={(val) => handleChange({ loanYearOfStudy: val })}
                  />
                </div>
              )}

              {formData.loanYearOfStudy && (
                <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                  <ToggleGroup
                    label="I plan to attend school..."
                    name="loanAttendance"
                    value={formData.loanAttendance}
                    error={errors.loanAttendance}
                    options={[
                      { label: 'Full Time', value: 'full-time' },
                      { label: 'Half Time', value: 'half-time' },
                      { label: 'Less Than Half Time', value: 'less-than-half' }
                    ]}
                    onChange={(val) => handleChange({ loanAttendance: val })}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Navigation Actions */}
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
            disabled={isLoading || !formData.loanProgramType}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoanInfoForm;
