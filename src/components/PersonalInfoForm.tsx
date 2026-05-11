"use client";

import React, { useRef, useState, useEffect } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import ToggleGroup from './ToggleGroup';
import DisclaimerBox from './DisclaimerBox';
import Button from './Button';
import AddressAutocomplete from './AddressAutocomplete';

import { useAppContext } from '@/context/AppContext';

const PersonalInfoForm = ({
  onBack,
  onContinue
}: {
  onBack: () => void;
  onContinue: () => void;
}) => {
  const { formData, updateFormData, saveApplication, isLoading } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);

  const stateMapping: { [key: string]: string } = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
    'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
    'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
  };

  const handleAddressSelect = (selected: { street: string; city: string; state: string; zip: string }) => {
    updateFormData({
      addressStreet: selected.street,
      addressCity: selected.city,
      addressState: stateMapping[selected.state] || selected.state.slice(0, 2).toUpperCase(),
      addressZip: selected.zip
    });
  };

  // Refs for auto-focusing DOB boxes
  const dobMonthRef = useRef<HTMLInputElement>(null);
  const dobDayRef = useRef<HTMLInputElement>(null);
  const dobYearRef = useRef<HTMLInputElement>(null);

  const handleSaveLater = async () => {
    const result = await saveApplication();
    if (result.success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const handleContinue = async () => {
    setIsContinuing(true);
    await saveApplication();
    onContinue();
    setIsContinuing(false);
  };

  const formatSSN = (val: string) => {
    const nums = val.replace(/\D/g, '').slice(0, 9);
    if (nums.length <= 3) return nums;
    if (nums.length <= 5) return `${nums.slice(0, 3)}-${nums.slice(3)}`;
    return `${nums.slice(0, 3)}-${nums.slice(3, 5)}-${nums.slice(5)}`;
  };

  const formatPhone = (val: string) => {
    const nums = val.replace(/\D/g, '').slice(0, 10);
    if (nums.length <= 3) return nums;
    if (nums.length <= 6) return `(${nums.slice(0, 3)}) ${nums.slice(3)}`;
    return `(${nums.slice(0, 3)}) ${nums.slice(3, 6)}-${nums.slice(6)}`;
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isInvalidDOB = () => {
    const { dobMonth, dobDay, dobYear } = formData;
    if (!dobMonth || !dobDay || !dobYear) return false;
    if (dobMonth.length < 2 || dobDay.length < 2 || dobYear.length < 4) return false;
    
    const m = parseInt(dobMonth);
    const d = parseInt(dobDay);
    const y = parseInt(dobYear);
    
    const date = new Date(y, m - 1, d);
    const now = new Date();
    
    // Check if valid date (e.g. not Feb 31st) and in the past
    const isValid = date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
    return !isValid || date >= now;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    // Reject non-numeric input for specific fields if needed
    if (['dobMonth', 'dobDay', 'dobYear'].includes(name)) {
      if (value && !/^\d+$/.test(value)) return;
      
      // Range checks
      if (name === 'dobMonth' && parseInt(value) > 12) return;
      if (name === 'dobDay' && parseInt(value) > 31) return;
    }

    if (name === 'phone') finalValue = formatPhone(value);
    
    updateFormData({ [name]: finalValue });

    // Auto-focus logic for DOB
    if (name === 'dobMonth' && value.length === 2) dobDayRef.current?.focus();
    if (name === 'dobDay' && value.length === 2) dobYearRef.current?.focus();
  };

  return (
    <div className="w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-full text-secondary-blue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>
      </div>

      <h1 className="text-5xl md:text-4xl font-bold text-primary-blue mb-4">
        Tell us about <span className="text-accent-blue">yourself.</span>
      </h1>
      <p className="text-xl text-gray-600 mb-10">We'll need a little bit of info about you for your application.</p>

      <div className="bg-white rounded-lg p-10 shadow-xl border border-gray-200">
        <h2 className="text-xl font-bold text-primary-blue mb-8">Let's start with the basics.</h2>

        {/* Name and Email Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <InputField
            label="Your first name"
            name="firstName"
            className="md:col-span-2"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputField
            label="Middle Initial"
            name="middleInitial"
            optional
            value={formData.middleInitial}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InputField
            label="Your last name"
            name="lastName"
            className="md:col-span-2"
            value={formData.lastName}
            onChange={handleChange}
          />
          <SelectField
            label="Suffix"
            name="suffix"
            optional
            options={[
              { label: 'Jr.', value: 'jr' },
              { label: 'Sr.', value: 'sr' },
              { label: 'II', value: 'ii' },
              { label: 'III', value: 'iii' }
            ]}
            value={formData.suffix}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <InputField
            label="Your email address"
            name="email"
            type="email"
            placeholder="name@email.com"
            value={formData.email}
            onChange={handleChange}
            error={formData.email && !validateEmail(formData.email) ? 'Please enter a valid email address.' : ''}
          />
          <p className="mt-4 text-[10px] text-gray-500 leading-relaxed max-w-2xl">
            By providing your email address, you authorize Sallie Mae Bank and any affiliates with which it shares this email address to send you commercial messages at such email address.
          </p>
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-10 mt-10">
          <div>
            <InputField
              label="Your phone number"
              name="phone"
              placeholder="(XXX) XXX-XXXX"
              hint="Must be a U.S. phone number."
              value={formData.phone}
              onChange={handleChange}
              error={formData.phone && formData.phone.replace(/\D/g, '').length < 10 ? 'Please enter a valid 10-digit U.S. phone number.' : ''}
            />
          </div>
          <DisclaimerBox hasArrow className="md:mt-6">
            By providing your phone number, you authorize Sallie Mae Bank and its subsidiaries, affiliates and agents, to contact you at this number using an auto dialer or pre-recorded messages in order to provide alerts and other information regarding your current or future applications and accounts.
          </DisclaimerBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-10">
          <div>
            <ToggleGroup
              label="Can we text you updates on your application and accounts?"
              name="canText"
              value={formData.canText}
              fullWidth={false}
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
              ]}
              onChange={(val) => updateFormData({ canText: val })}
            />
          </div>
          {formData.canText && (
            <DisclaimerBox hasArrow className="md:mt-6 animate-in fade-in slide-in-from-left-2 duration-300">
              {formData.canText === 'yes' ? (
                <>
                  By selecting "Yes", you authorize Sallie Mae Bank to send automated and/or manual texts to the phone number entered above regarding instructions for returning to your application, the status of your application, and other information about your current or future applications and accounts. Message frequency depends on account status. Message and data rates may apply - reply HELP for assistance and STOP to revoke consent. Messages will be sent from 37903 or another number listed in our full SMS terms and conditions. You can also view our <a href="#" className="underline">privacy policy.</a>
                </>
              ) : (
                <>
                  By selecting "No", you will not receive text updates. You will still receive important application updates via email and/or phone calls as necessary.
                </>
              )}
            </DisclaimerBox>
          )}
        </div>
      </div>

      {/* Citizenship Section in a separate card */}
      {formData.canText && (
        <div className="mt-10 bg-white rounded-lg p-10 shadow-xl border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold text-primary-blue mb-2">What's your citizenship status?</h2>
          <p className="text-gray-600 mb-8 font-medium">This will help us make sure we get everything we need to process your application.</p>
          
          <ToggleGroup
            name="citizenshipStatus"
            value={formData.citizenshipStatus}
            options={[
              { label: 'U.S. Citizen', value: 'us-citizen' },
              { label: 'U.S. Permanent Resident Alien', value: 'permanent-resident' },
              { label: 'Non-U.S. Citizen', value: 'non-us-citizen' }
            ]}
            onChange={(val) => updateFormData({ citizenshipStatus: val })}
          />

          {formData.citizenshipStatus && (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {formData.citizenshipStatus === 'permanent-resident' && (
                <p className="text-sm text-gray-700 font-medium">
                  <span className="font-bold">U.S. permanent resident aliens:</span> You may be asked to provide documents that show you're a U.S. permanent resident (like your Permanent Resident Card).
                </p>
              )}
              {formData.citizenshipStatus === 'non-us-citizen' && (
                <p className="text-sm text-gray-700 font-medium">
                  <span className="font-bold">For Non-U.S. citizens:</span> Please note that you'll need to reside in and attend school in the U.S. and apply with a creditworthy cosigner (who must be a U.S. citizen or U.S. permanent resident).
                </p>
              )}
              <a href="#" className="inline-block mt-4 text-secondary-blue font-bold border-b-2 border-secondary-blue hover:text-primary-blue hover:border-primary-blue transition-all">
                Learn more
              </a>
            </div>
          )}
        </div>
      )}

      {/* Identity Verification Section */}
      {formData.citizenshipStatus && (
        <div className="mt-10 bg-white rounded-lg p-10 shadow-xl border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold text-primary-blue mb-4">Let's verify your identity.</h2>
          <p className="text-gray-600 mb-10 font-medium leading-relaxed">
            It's required by federal law that we obtain, verify, and record information that identifies you when you apply for a loan. This includes your name, address, and date of birth. We may also request a copy of your driver's license or other ID.
          </p>

          <div className="mb-10">
            <label className="text-sm font-bold text-primary-blue mb-2 block">Date of birth</label>
            <div className="flex items-center gap-3">
              <input
                ref={dobMonthRef}
                name="dobMonth"
                placeholder="MM"
                maxLength={2}
                value={formData.dobMonth}
                onChange={handleChange}
                className={`w-16 px-3 py-3 rounded border transition-all text-center text-gray-700 outline-none ${isInvalidDOB() ? 'border-red-600' : 'border-gray-300 focus:border-secondary-blue'}`}
              />
              <span className="text-xl text-gray-400">/</span>
              <input
                ref={dobDayRef}
                name="dobDay"
                placeholder="DD"
                maxLength={2}
                value={formData.dobDay}
                onChange={handleChange}
                className={`w-16 px-3 py-3 rounded border transition-all text-center text-gray-700 outline-none ${isInvalidDOB() ? 'border-red-600' : 'border-gray-300 focus:border-secondary-blue'}`}
              />
              <span className="text-xl text-gray-400">/</span>
              <input
                ref={dobYearRef}
                name="dobYear"
                placeholder="YYYY"
                maxLength={4}
                value={formData.dobYear}
                onChange={handleChange}
                className={`w-28 px-3 py-3 rounded border transition-all text-center text-gray-700 outline-none ${isInvalidDOB() ? 'border-red-600' : 'border-gray-300 focus:border-secondary-blue'}`}
              />
            </div>
            {isInvalidDOB() && (
              <p className="text-sm text-red-600 font-bold mt-2 animate-in fade-in slide-in-from-top-1 duration-300">Please enter a valid date of birth in the past.</p>
            )}
          </div>

          {/* Gate everything below DOB behind a complete DOB */}
          {formData.dobMonth.length === 2 && formData.dobDay.length === 2 && formData.dobYear.length === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Special question for Non-US Citizens */}
              {formData.citizenshipStatus === 'non-us-citizen' && (
                <div className="mb-10">
                  <ToggleGroup
                    label="Do you have a SSN, ITIN, or Sallie Mae Admin ID number?"
                    name="hasSsn"
                    value={formData.hasSsn}
                    fullWidth={false}
                    options={[
                      { label: 'Yes', value: 'yes' },
                      { label: 'No', value: 'no' }
                    ]}
                    onChange={(val) => updateFormData({ hasSsn: val })}
                  />
                </div>
              )}

              {/* SSN Fields conditional on Citizenship and the Yes/No toggle */}
              {((formData.citizenshipStatus !== 'non-us-citizen') || (formData.citizenshipStatus === 'non-us-citizen' && formData.hasSsn === 'yes')) && (
                <div className="animate-in fade-in duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <InputField
                      label="SSN, ITIN, or Sallie Mae Admin ID number"
                      name="ssn"
                      placeholder="XXX-XX-XXXX"
                      value={formData.ssn}
                      onChange={handleChange}
                      isSensitive
                      formatter={formatSSN}
                      error={formData.ssn && formData.ssn.replace(/\D/g, '').length < 9 ? 'Please enter a valid 9-digit SSN, ITIN or Sallie Mae Admin ID number.' : ''}
                    />
                    <InputField
                      label="Verify SSN, ITIN, or Sallie Mae Admin ID number"
                      name="ssnVerify"
                      placeholder="XXX-XX-XXXX"
                      value={formData.ssnVerify}
                      onChange={handleChange}
                      isSensitive
                      formatter={formatSSN}
                      error={formData.ssnVerify && formData.ssnVerify !== formData.ssn ? 'Numbers do not match.' : ''}
                    />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    If you have a previously assigned Sallie Mae Administrative ID number, please enter it in the Social Security number field. Your Social Security number or Administrative ID is needed to verify your identity, obtain your credit history, and for processing your loan application.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Address Card - Shows only after ITIN/SSN is complete */}
      {((formData.citizenshipStatus !== 'non-us-citizen' && formData.ssn.replace(/\D/g, '').length === 9) || 
        (formData.citizenshipStatus === 'non-us-citizen' && (formData.hasSsn === 'no' || (formData.hasSsn === 'yes' && formData.ssn.replace(/\D/g, '').length === 9)))) && (
        <div className="mt-10 bg-white rounded-lg p-10 shadow-xl border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold text-primary-blue mb-8">What's your home address?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <AddressAutocomplete
              label="Street address"
              name="addressStreet"
              placeholder="Type to search"
              hint="This must be a street address and not a P.O. box."
              value={formData.addressStreet}
              onChange={handleChange}
              onSelect={handleAddressSelect}
            />
            <InputField
              label="Apt/suite/unit/building (optional)"
              name="addressApt"
              optional
              value={formData.addressApt}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <InputField
                label="City"
                name="addressCity"
                value={formData.addressCity}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputField
                label="State"
                name="addressState"
                placeholder="XX"
                value={formData.addressState}
                onChange={handleChange}
                formatter={(val) => val.toUpperCase().slice(0, 2)}
              />
            </div>
            <div>
              <InputField
                label="ZIP code"
                name="addressZip"
                placeholder="XXXXX"
                value={formData.addressZip}
                onChange={handleChange}
                formatter={(val) => val.replace(/\D/g, '').slice(0, 5)}
                error={formData.addressZip && formData.addressZip.length < 5 ? 'Enter 5 digits.' : ''}
              />
            </div>
          </div>
        </div>
      )}

      <p className="mt-8 text-xs text-gray-500 leading-relaxed max-w-3xl">
        Selecting "Save and finish later" or "Continue" saves your progress and provides your agreement to let Sallie Mae send you emails with instructions for returning to your loan application. See link below for privacy policy.
      </p>

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
            className="flex-1 md:min-w-[140px]" 
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

export default PersonalInfoForm;
