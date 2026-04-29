"use client";

import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import ToggleGroup from './ToggleGroup';
import DisclaimerBox from './DisclaimerBox';
import Button from './Button';

import { useAppContext } from '@/context/AppContext';

const PersonalInfoForm = ({
  onBack,
  onContinue
}: {
  onBack: () => void;
  onContinue: () => void;
}) => {
  const { formData, updateFormData } = useAppContext();

  const formatSSN = (val: string) => {
    const nums = val.replace(/\D/g, '').slice(0, 9);
    if (nums.length <= 3) return nums;
    if (nums.length <= 5) return `${nums.slice(0, 3)}-${nums.slice(3)}`;
    return `${nums.slice(0, 3)}-${nums.slice(3, 5)}-${nums.slice(5)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateFormData({ [e.target.name]: e.target.value });
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
                name="dobMonth"
                placeholder="MM"
                maxLength={2}
                value={formData.dobMonth}
                onChange={handleChange}
                className="w-16 px-3 py-3 rounded border border-gray-300 focus:border-secondary-blue outline-none text-center text-gray-700"
              />
              <span className="text-xl text-gray-400">/</span>
              <input
                name="dobDay"
                placeholder="DD"
                maxLength={2}
                value={formData.dobDay}
                onChange={handleChange}
                className="w-16 px-3 py-3 rounded border border-gray-300 focus:border-secondary-blue outline-none text-center text-gray-700"
              />
              <span className="text-xl text-gray-400">/</span>
              <input
                name="dobYear"
                placeholder="YYYY"
                maxLength={4}
                value={formData.dobYear}
                onChange={handleChange}
                className="w-28 px-3 py-3 rounded border border-gray-300 focus:border-secondary-blue outline-none text-center text-gray-700"
              />
            </div>
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

      <p className="mt-8 text-xs text-gray-500 leading-relaxed max-w-3xl">
        Selecting "Save and finish later" or "Continue" saves your progress and provides your agreement to let Sallie Mae send you emails with instructions for returning to your loan application. See link below for privacy policy.
      </p>

      {/* Navigation Actions */}
      <div className="flex flex-col md:flex-row items-center justify-end gap-6 mt-12">
        <button className="text-secondary-blue font-bold border-b-2 border-secondary-blue hover:text-primary-blue hover:border-primary-blue transition-all">
          Save and finish later
        </button>
        <div className="flex items-center gap-4">
          <Button variant="secondary" className="min-w-[140px]" onClick={onBack}>
            Back
          </Button>
          <Button className="min-w-[140px]" onClick={onContinue}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
