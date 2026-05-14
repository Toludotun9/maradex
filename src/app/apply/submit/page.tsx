"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MousePointerClick, ExternalLink, ChevronDown, ChevronUp, FileText, ShieldCheck } from 'lucide-react';
import Button from '@/components/Button';
import SolicitationDisclosure from '@/components/SolicitationDisclosure';
import PrivacyNotice from '@/components/PrivacyNotice';
import { useAppContext } from '@/context/AppContext';

export default function SubmitDisclosurePage() {
  const router = useRouter();
  const { saveApplication, setCurrentStep, isLoading } = useAppContext();
  
  const [subStep, setSubStep] = useState(0); // 0: Consent, 1: Solicitation, 2: Privacy
  const [isReadMore, setIsReadMore] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);

  const handleAgreeAndSubmit = async () => {
    if (subStep < 2) {
      setSubStep(subStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsContinuing(true);
    const result = await saveApplication();
    setIsContinuing(false);

    if (result.success) {
      setCurrentStep(5);
      router.push('/apply/results');
    } else {
      alert('Failed to submit application. Please try again.');
    }
  };

  const handleBack = () => {
    if (subStep > 0) {
      setSubStep(subStep - 1);
      return;
    }
    setCurrentStep(4);
    router.push('/apply/recap');
  };

  const renderContent = () => {
    if (subStep === 0) {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Electronic Delivery Consent</h3>
          <p className="text-[15px] text-gray-600 mb-8">
            By clicking the “Agree and Submit” button below, you agree to the terms in our <span className="text-secondary-blue font-medium cursor-pointer hover:underline">Electronic Delivery Consent</span>.
          </p>

          <div className={`
            relative border border-slate-200 rounded-lg bg-white transition-all duration-500 overflow-hidden
            ${isReadMore ? 'max-h-[3000px]' : 'max-h-[500px]'}
          `}>
            <div className="p-10 text-[14px] text-gray-800 leading-[1.6] overflow-y-auto max-h-[1000px] font-sans">
              <div className="flex justify-end mb-8">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Revision 09/2025</span>
              </div>
              
              <h4 className="text-lg font-bold text-gray-900 mb-8">Electronic Delivery Consent</h4>
              
              <p className="mb-6">
                This Electronic Delivery Consent discloses to you the terms and conditions for receiving Communications (as defined below) electronically. By clicking or tapping the <strong>button below, you are: (I) providing your consent to have Communications (as defined below) provided or made available to you electronically, (II) providing your consent to receive those Communications electronically, and (III) confirming you are able to view, have read, understand, agree, and consent to the language and authorizations outlined in this Electronic Delivery Consent.</strong>
              </p>

              <p className="mb-8">
                For purposes of this Electronic Delivery Consent, <strong>“We”, “Us,” and “Our” are used to refer to Sallie Mae Bank, its subsidiaries, affiliates, agents, successors, and/or assigns.</strong>
              </p>

              <h5 className="font-bold text-base mb-4 text-gray-900">Scope of Consent</h5>
              <p className="mb-6">
                Your consent will apply to all information We provide or make available to you relating to your current and future loan(s) owned or serviced by Us, provided that the information is required by statute, regulation, or other rule of law to be provided or made available to you in writing (“Communications”). Communications include, but are not limited to, those We provide or make available to you:
              </p>
              <ul className="space-y-4 mb-8 pl-4">
                <li className="flex gap-3">
                  <span className="text-gray-400 mt-1.5">•</span>
                  <span>during the loan application process (if you choose not to consent during an online application session, the online processing of your application will be terminated);</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-400 mt-1.5">•</span>
                  <span>as a result of the approval or denial of your loan application; and</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-400 mt-1.5">•</span>
                  <span>in connection with the servicing of your loan(s) (e.g., certain letters or other messages, applicable regulatory documents/disclosures, applicable tax documents (including, but not limited to, IRS Form 1098-E and IRS Form 1099-INT, for loans eligible to receive those forms), annual privacy disclosures, and other necessary information).</span>
                </li>
              </ul>

              <h5 className="font-bold text-base mb-4 text-gray-900">Electronic Consent and Delivery Methods</h5>
              <p className="mb-6">
                You consent and agree to receive Communications electronically and to the electronic delivery of Communications to you in a manner determined by Us, which may include, but is not limited to:
              </p>
              <ul className="space-y-4 mb-8 pl-4">
                <li className="flex gap-3">
                  <span className="text-gray-400 mt-1.5">•</span>
                  <span>posting Communications to your online account (you must set up or have an online account with Us to access these Communications);</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-400 mt-1.5">•</span>
                  <span>making Communications available on Our website or at a different website that We may, from time to time, communicate to you;</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-400 mt-1.5">•</span>
                  <span>sending Communications to your designated email address (which may include attachments or embedded links); or</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-400 mt-1.5">•</span>
                  <span>making Communications available to you during your online session.</span>
                </li>
              </ul>
              <p className="mb-8">
                We reserve the right to provide some or all Communications to you at any time in paper form at your designated U.S. Postal address.
              </p>

              <h5 className="font-bold text-base mb-4 text-gray-900">Hardware/Software Requirements to Access and Retain Electronic Communications</h5>
              <p className="mb-8">
                You must have a computer or mobile device equipped with a recent-generation, widely-used web browser that supports access to Portable Document Format (PDF) files and has JavaScript enabled. You must also have hardware and software (and internet service) as necessary to support this software. You must have a valid email address. Additionally, you must have a printer, hard drive, or other storage space to retain these Communications. You represent to Us that you have the necessary hardware and software, as stated.
              </p>

              <h5 className="font-bold text-base mb-4 text-gray-900">Updating Contact Information</h5>
              <p className="mb-6">
                You agree to notify Us whenever you change your email address. If you change your email address or if email is undeliverable to your email address, you must sign into your online account or call Us at <strong>1-800-4-SALLIE</strong> or at a different phone number that We may, from time to time, communicate to you and update your email address associated to your loan(s).
              </p>
              <p className="mb-8">
                If We receive an electronic notice that an email sent to your designated email address is undeliverable due to an incorrect or inoperative email address, then you consent and agree that We may continue providing Communications to you electronically by posting them in your online account, sending them to your designated email address, or delivering them through other electronic means determined by Us, any or all of which you agree constitutes valid electronic delivery. Alternatively, We may, at Our sole discretion, resend Communications to you via U.S. Postal Service or other mail carrier.
              </p>

              <h5 className="font-bold text-base mb-4 text-gray-900">Paper Communications</h5>
              <p className="mb-8">
                You may obtain a paper copy of an electronic Communication by printing it from your computer or mobile device. You may also request a paper copy by calling or writing to Us utilizing the methods listed in the <em>Withdraw Consent</em> section below. We will not charge you a fee for requesting a paper copy unless the requests exceed a reasonable number. The request for a paper copy of any Communication will not by itself constitute a withdrawal of consent for future electronic deliveries.
              </p>

              <h5 className="font-bold text-base mb-4 text-gray-900">Withdraw Consent</h5>
              <p className="mb-6">
                You may withdraw your consent to have Communications provided or made available to you electronically and instead elect to use the U.S. Postal Service, or other mail carrier to obtain Communications from Us by:
              </p>
              <ul className="space-y-4 mb-8 pl-4">
                <li className="flex gap-3">
                  <span className="text-gray-400 mt-1.5">•</span>
                  <span>signing into your online account and changing your permission to communicate electronically;</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-400 mt-1.5">•</span>
                  <span>calling Us at <strong>1-800-4-SALLIE</strong> or at a different phone number that We may, from time to time, communicate to you; or</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-400 mt-1.5">•</span>
                  <span>writing to Us at the following address or a different mailing address that We may, from time to time, communicate to you.</span>
                </li>
              </ul>

              <div className="bg-gray-50 p-6 rounded-lg mb-8 text-gray-900 font-medium border border-gray-100 max-w-sm">
                Sallie Mae<br />
                P.O. Box 3319<br />
                Wilmington, DE 19804-4319
              </div>

              <p className="mb-8">
                If you withdraw your consent to have Communications provided or made available to you electronically, We may charge you a fee for providing some or all subsequent Communications by paper and We will notify you in advance of any applicable charges. A withdrawal of consent does not apply to disclosures provided or made available to you during the online loan application process or to Communications provided or made available to you electronically before the date on which the withdrawal of consent takes effect. Your withdrawal of consent will become effective after We receive your request and have had a reasonable period of time to process it. In addition, your withdrawal does not apply to any consent you provide to Us to send you electronic communications relating to any Retail Banking account(s) you may have with Us.
              </p>

              <h5 className="font-bold text-base mb-4 text-gray-900">Tax Documents</h5>
              <p className="mb-6">
                Tax documents will be furnished to you on paper if you do not consent to receive Communications electronically. If you consent to receive tax documents electronically, We will typically only terminate electronic delivery of tax documents under extraordinary circumstances, however, We reserve the right to provide some or all Communications to you at any time in paper form at your designated U.S. Postal address. In no event will We charge you for a paper copy of a tax document.
              </p>
              <p className="mb-6">
                Your consent to receive Communications electronically applies to tax documents furnished to you every year after the consent is given until it is withdrawn by you. We will confirm the withdrawal of consent of electronic delivery of tax documents and the date on which it takes effect by providing a confirmation message when you submit a request to withdraw by using your online account. If you request to withdraw by phone, We will confirm the withdrawal and provide the effective date during the phone call. If you request to withdraw by mail, you can call Us at the phone number provided above to receive verbal confirmation of the withdrawal and the effective date.
              </p>
              <p className="mb-8">
                Tax documents that are provided or made available to you electronically will remain available electronically for at least one year after the date they were originally provided or made available to you electronically.
              </p>

              <h5 className="font-bold text-base mb-4 text-gray-900">Providing an Electronic Signature</h5>
              <p className="mb-6">
                Your consent also permits Us to obtain your electronic signature if you choose to sign Communications or any other document or contract electronically. If you do sign electronically, your electronic signature will bind you to the terms and conditions to the same extent as if you provided your signature on paper with an ink signature.
              </p>
            </div>

            {/* Fading overlay when collapsed */}
            {!isReadMore && (
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            )}
          </div>

          <div className="mt-[-1px]">
            <button 
              onClick={() => setIsReadMore(!isReadMore)}
              className="w-full py-4 bg-white border border-slate-200 text-[15px] font-bold text-secondary-blue hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              {isReadMore ? (
                <>Read Less <ChevronUp className="w-5 h-5" /></>
              ) : (
                <>Read More <ChevronDown className="w-5 h-5" /></>
              )}
            </button>
          </div>
        </div>
      );
    }

    if (subStep === 1) {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Loan Application and Solicitation Disclosure</h3>
          <p className="text-[15px] text-gray-600 mb-8">
            This document provides basic information about the loan you’re applying for, including rates, fees, and loan cost examples.
          </p>

          <div className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
            <SolicitationDisclosure />
          </div>
        </div>
      );
    }

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Privacy Notice</h3>
        <p className="text-[15px] text-gray-600 mb-8">
          By clicking ‘Agree and submit’ you agree to receive Privacy Notices from us electronically and you acknowledge receipt of our <span className="text-secondary-blue font-medium cursor-pointer hover:underline">Privacy Notice</span>.
        </p>

        <div className={`
          relative border border-slate-200 rounded-lg bg-white transition-all duration-500 overflow-hidden shadow-sm
          ${isReadMore ? 'max-h-[5000px]' : 'max-h-[500px]'}
        `}>
          <div className="overflow-y-auto max-h-[1200px]">
            <PrivacyNotice />
          </div>

          {!isReadMore && (
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          )}
        </div>

        <div className="mt-[-1px]">
          <button 
            onClick={() => setIsReadMore(!isReadMore)}
            className="w-full py-4 bg-white border border-slate-200 text-[15px] font-bold text-secondary-blue hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            {isReadMore ? (
              <>Read Less <ChevronUp className="w-5 h-5" /></>
            ) : (
              <>Read More <ChevronDown className="w-5 h-5" /></>
            )}
          </button>
        </div>
      </div>
    );
  };

  const getStepIcon = () => {
    switch (subStep) {
      case 0: return <MousePointerClick className="w-10 h-10" />;
      case 1: return <FileText className="w-10 h-10" />;
      case 2: return <ShieldCheck className="w-10 h-10" />;
      default: return <FileText className="w-10 h-10" />;
    }
  };

  const getStepTitle = () => {
    switch (subStep) {
      case 0: return <>Your application is <span className="text-accent-blue">ready to go!</span></>;
      case 1: return <>Review your <span className="text-accent-blue">loan disclosure.</span></>;
      case 2: return <>Review our <span className="text-accent-blue">privacy notice.</span></>;
      default: return <>Final <span className="text-accent-blue">disclosure.</span></>;
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#E6F4FF] to-transparent -z-10 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto opacity-40">
          <path fill="#fff" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="flex flex-col items-center justify-center pt-24 pb-16 px-8 md:px-20 w-full max-w-6xl mx-auto relative z-0">
        <div className="w-full text-left mb-12">
          <div className="text-secondary-blue mb-6 drop-shadow-sm">
            {getStepIcon()}
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-primary-blue mb-6 tracking-tight leading-[1.1]">
            {getStepTitle()}
          </h1>
          <p className="text-2xl text-gray-600 font-medium max-w-2xl leading-relaxed">
            We just need you to take a look at a couple of documents before you submit.
          </p>
        </div>

        <div className="w-full bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="p-12 md:p-16">
            <div className="flex justify-end mb-8">
              <button className="flex items-center gap-2 text-[15px] font-bold text-secondary-blue hover:text-primary-blue transition-colors group">
                <span className="border-b-2 border-secondary-blue/30 group-hover:border-primary-blue">View/Download</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {renderContent()}
          </div>
        </div>

        {/* Final Acknowledgment Box (Only show on final step) */}
        {subStep === 2 && (
          <div className="w-full mt-12 bg-white border-2 border-secondary-blue rounded-[24px] p-10 shadow-sm animate-in fade-in zoom-in-95 duration-500">
            <h4 className="text-xl font-bold text-gray-900 mb-6">By clicking the “Agree and submit” button below:</h4>
            <div className="space-y-6 text-[15px] text-gray-600 leading-relaxed">
              <p>
                You certify that the information in this application is true and complete to the best of your knowledge.
              </p>
              <p>
                You understand and agree that Sallie Mae may obtain your consumer credit report in connection with this application. Upon your request to Sallie Mae, you will be informed of whether a report has been requested and, if so, the name and address of the consumer reporting agency that provided the report.
              </p>
              <p>
                You authorize Sallie Mae to release the information contained in this application and your credit eligibility results to the school for which you are applying for this loan.
              </p>
              <p>
                Your cosigner will be prompted to enter their information.
              </p>
              <p className="pt-2">
                For important information, including how to make payments and how payments are allocated and applied, visit:{' '}
                <a href="https://www.SallieMae.com/allocation" target="_blank" rel="noopener noreferrer" className="text-secondary-blue font-bold underline">
                  www.SallieMae.com/allocation
                </a>.
              </p>
            </div>
          </div>
        )}

        <div className="w-full flex flex-col md:flex-row items-center justify-end gap-4 mt-16">
          <button 
            onClick={handleBack}
            disabled={isLoading || isContinuing}
            className="w-full md:w-32 h-12 rounded-full border border-gray-400 bg-[#E6F9F4] text-secondary-blue font-bold text-[15px] hover:bg-emerald-50 transition-colors"
          >
            Back
          </button>
          <button 
            onClick={handleAgreeAndSubmit}
            disabled={isLoading || isContinuing}
            className="w-full md:w-48 h-12 rounded-full bg-[#1D4469] text-white font-bold text-[15px] shadow-lg hover:bg-[#153452] transition-all"
          >
            {isContinuing ? 'Submitting...' : 'Agree and submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
