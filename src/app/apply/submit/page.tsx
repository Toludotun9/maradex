"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MousePointer2, ExternalLink, ChevronDown, ChevronUp, FileText, ShieldCheck } from 'lucide-react';
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
        <>
          <h3 className="text-xl font-bold text-primary-blue mb-2">Electronic Delivery Consent</h3>
          <p className="text-sm text-gray-600 mb-6 font-medium">
            By clicking the “Agree and Submit” button below, you agree to the terms in our Electronic Delivery Consent.
          </p>

          <div className={`
            relative border border-blue-200 rounded-md bg-white transition-all duration-500 overflow-hidden
            ${isReadMore ? 'max-h-[2000px]' : 'max-h-[400px]'}
          `}>
            <div className="p-8 text-[13px] text-gray-700 leading-relaxed overflow-y-auto max-h-[800px]">
              <p className="text-right text-[11px] mb-6 font-bold uppercase tracking-wider text-gray-400">Revision 09/2025</p>
              
              <h4 className="text-base font-bold text-gray-900 mb-6">Electronic Delivery Consent</h4>
              
              <p className="mb-6 font-bold">
                This Electronic Delivery Consent discloses to you the terms and conditions for receiving Communications (as defined below) electronically. By clicking or tapping the button below, you are: (I) providing your consent to have Communications (as defined below) provided or made available to you electronically, (II) providing your consent to receive those Communications electronically, and (III) confirming you are able to view, have read, understand, agree, and consent to the language and authorizations outlined in this Electronic Delivery Consent.
              </p>

              <p className="mb-6">
                For purposes of this Electronic Delivery Consent, “We”, “Us,” and “Our” are used to refer to Sallie Mae Bank, its subsidiaries, affiliates, agents, successors, and/or assigns.
              </p>

              <h5 className="font-bold mb-3 uppercase text-gray-900">Scope of Consent</h5>
              <p className="mb-4">
                Your consent will apply to all information We provide or make available to you relating to your current and future loan(s) owned or serviced by Us, provided that the information is required by statute, regulation, or other rule of law to be provided or made available to you in writing (“Communications”). Communications include, but are not limited to, those We provide or make available to you:
              </p>
              <ul className="list-disc ml-8 mb-6 space-y-3">
                <li>during the loan application process (if you choose not to consent during an online application session, the online processing of your application will be terminated);</li>
                <li>as a result of the approval or denial of your loan application; and</li>
                <li>in connection with the servicing of your loan(s) (e.g., certain letters or other messages, applicable regulatory documents/disclosures, applicable tax documents (including, but not limited to, IRS Form 1098-E and IRS Form 1099-INT, for loans eligible to receive those forms), annual privacy disclosures, and other necessary information).</li>
              </ul>

              <h5 className="font-bold mb-3 uppercase text-gray-900">Electronic Consent and Delivery Methods</h5>
              <p className="mb-4">
                You consent and agree to receive Communications electronically and to the electronic delivery of Communications to you in a manner determined by Us, which may include, but is not limited to:
              </p>
              <ul className="list-disc ml-8 mb-6 space-y-3">
                <li>posting Communications to your online account (you must set up or have an online account with Us to access these Communications);</li>
                <li>making Communications available on Our website or at a different website that We may, from time to time, communicate to you;</li>
                <li>sending Communications to your designated email address (which may include attachments or embedded links); or</li>
                <li>making Communications available to you during your online session.</li>
              </ul>
              <p className="mb-6">
                We reserve the right to provide some or all Communications to you at any time in paper form at your designated U.S. Postal address.
              </p>

              <h5 className="font-bold mb-3 uppercase text-gray-900">Hardware/Software Requirements to Access and Retain Electronic Communications</h5>
              <p className="mb-6">
                You must have a computer or mobile device equipped with a recent-generation, widely-used web browser that supports access to Portable Document Format (PDF) files and has JavaScript enabled. You must also have hardware and software (and internet service) as necessary to support this software. You must have a valid email address. Additionally, you must have a printer, hard drive, or other storage space to retain these Communications. You represent to Us that you have the necessary hardware and software, as stated.
              </p>

              <h5 className="font-bold mb-3 uppercase text-gray-900">Updating Contact Information</h5>
              <p className="mb-4">
                You agree to notify Us whenever you change your email address. If you change your email address or if email is undeliverable to your email address, you must sign into your online account or call Us at <strong>1-800-4-SALLIE</strong> or at a different phone number that We may, from time to time, communicate to you and update your email address associated to your loan(s).
              </p>
              <p className="mb-6">
                If We receive an electronic notice that an email sent to your designated email address is undeliverable due to an incorrect or inoperative email address, then you consent and agree that We may continue providing Communications to you electronically by posting them in your online account, sending them to your designated email address, or delivering them through other electronic means determined by Us, any or all of which you agree constitutes valid electronic delivery. Alternatively, We may, at Our sole discretion, resend Communications to you via U.S. Postal Service or other mail carrier.
              </p>

              <h5 className="font-bold mb-3 uppercase text-gray-900">Paper Communications</h5>
              <p className="mb-6">
                You may obtain a paper copy of an electronic Communication by printing it from your computer or mobile device. You may also request a paper copy by calling or writing to Us utilizing the methods listed in the <em>Withdraw Consent</em> section below. We will not charge you a fee for requesting a paper copy unless the requests exceed a reasonable number. The request for a paper copy of any Communication will not by itself constitute a withdrawal of consent for future electronic deliveries.
              </p>

              <h5 className="font-bold mb-3 uppercase text-gray-900">Withdraw Consent</h5>
              <p className="mb-4">
                You may withdraw your consent to have Communications provided or made available to you electronically and instead elect to use the U.S. Postal Service, or other mail carrier to obtain Communications from Us by:
              </p>
              <ul className="list-disc ml-8 mb-6 space-y-3">
                <li>signing into your online account and changing your permission to communicate electronically;</li>
                <li>calling Us at <strong>1-800-4-SALLIE</strong> or at a different phone number that We may, from time to time, communicate to you; or</li>
                <li>writing to Us at the following address or a different mailing address that We may, from time to time, communicate to you.</li>
              </ul>

              <div className="bg-gray-50 p-4 rounded mb-6 font-bold text-gray-900 border border-gray-100">
                Sallie Mae<br />
                P.O. Box 3319<br />
                Wilmington, DE 19804-4319
              </div>

              <p className="mb-6">
                If you withdraw your consent to have Communications provided or made available to you electronically, We may charge you a fee for providing some or all subsequent Communications by paper and We will notify you in advance of any applicable charges. A withdrawal of consent does not apply to disclosures provided or made available to you during the online loan application process or to Communications provided or made available to you electronically before the date on which the withdrawal of consent takes effect. Your withdrawal of consent will become effective after We receive your request and have had a reasonable period of time to process it. In addition, your withdrawal does not apply to any consent you provide to Us to send you electronic communications relating to any Retail Banking account(s) you may have with Us.
              </p>

              <h5 className="font-bold mb-3 uppercase text-gray-900">Tax Documents</h5>
              <p className="mb-4">
                Tax documents will be furnished to you on paper if you do not consent to receive Communications electronically. If you consent to receive tax documents electronically, We will typically only terminate electronic delivery of tax documents under extraordinary circumstances, however, We reserve the right to provide some or all Communications to you at any time in paper form at your designated U.S. Postal address. In no event will We charge you for a paper copy of a tax document.
              </p>
              <p className="mb-6">
                Your consent to receive Communications electronically applies to tax documents furnished to you every year after the consent is given until it is withdrawn by you. We will confirm the withdrawal of consent of electronic delivery of tax documents and the date on which it takes effect by providing a confirmation message when you submit a request to withdraw by using your online account. If you request to withdraw by phone, We will confirm the withdrawal and provide the effective date during the phone call. If you request to withdraw by mail, you can call Us at the phone number provided above to receive verbal confirmation of the withdrawal and the effective date.
              </p>
              <p className="mb-6">
                Tax documents that are provided or made available to you electronically will remain available electronically for at least one year after the date they were originally provided or made available to you electronically.
              </p>

              <h5 className="font-bold mb-3 uppercase text-gray-900">Providing an Electronic Signature</h5>
              <p className="mb-6">
                Your consent also permits Us to obtain your electronic signature if you choose to sign Communications or any other document or contract electronically. If you do sign electronically, your electronic signature will bind you to the terms and conditions to the same extent as if you provided your signature on paper with an ink signature.
              </p>
            </div>

            {/* Fading overlay when collapsed */}
            {!isReadMore && (
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            )}
          </div>

          <div className="flex justify-center mt-[-1px]">
            <button 
              onClick={() => setIsReadMore(!isReadMore)}
              className="flex items-center gap-2 px-10 py-3 bg-white border border-t-0 border-blue-200 rounded-b-md text-sm font-bold text-secondary-blue hover:bg-slate-50 transition-colors"
            >
              {isReadMore ? (
                <>Read Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Read More <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </>
      );
    }

    if (subStep === 1) {
      return (
        <>
          <h3 className="text-xl font-bold text-primary-blue mb-2">Loan Application and Solicitation Disclosure</h3>
          <p className="text-sm text-gray-600 mb-6 font-medium">
            This document provides basic information about the loan you’re applying for, including rates, fees, and loan cost examples.
          </p>

          <div className="border border-blue-200 rounded-md bg-white overflow-hidden">
            <SolicitationDisclosure />
          </div>
        </>
      );
    }

    return (
      <>
        <h3 className="text-xl font-bold text-primary-blue mb-2">Privacy Notice</h3>
        <p className="text-sm text-gray-600 mb-6 font-medium">
          By clicking ‘Agree and submit’ you agree to receive Privacy Notices from us electronically and you acknowledge receipt of our Privacy Notice.
        </p>

        <div className="border border-blue-200 rounded-md bg-white overflow-hidden">
          <PrivacyNotice />
        </div>
      </>
    );
  };

  const getStepIcon = () => {
    switch (subStep) {
      case 0: return <MousePointer2 className="w-7 h-7" />;
      case 1: return <FileText className="w-7 h-7" />;
      case 2: return <ShieldCheck className="w-7 h-7" />;
      default: return <FileText className="w-7 h-7" />;
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
    <div className="flex flex-col items-center justify-center flex-1 py-16 px-8 md:px-20 w-full max-w-5xl mx-auto">
      <div className="w-full animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-full text-secondary-blue">
            {getStepIcon()}
          </div>
        </div>

        <h1 className="text-5xl md:text-5xl font-bold text-primary-blue mb-4 leading-tight">
          {getStepTitle()}
        </h1>
        <p className="text-lg text-gray-600 mb-10 font-medium">
          We just need you to take a look at a couple of documents before you submit.
        </p>

        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-10 pb-10">
            <div className="flex justify-end mb-4">
              <button className="flex items-center gap-1 text-sm font-bold text-secondary-blue hover:underline">
                View/Download <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {renderContent()}
          </div>
        </div>

        {/* Final Acknowledgment Box */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm border-2 border-secondary-blue/40 rounded-xl p-8 shadow-sm">
          <h4 className="text-xl font-bold text-gray-900 mb-6">By clicking the “Agree and submit” button below:</h4>
          <div className="space-y-6 text-[15px] text-gray-700 leading-relaxed">
            <p>
              You certify that the information in this application is true and complete to the best of your knowledge.
            </p>
            <p>
              You understand and agree that Sallie Mae may obtain your consumer credit report in connection with this application. Upon your request to Sallie Mae, you will be informed of whether a report has been requested and, if so, the name and address of the consumer reporting agency that provided the report.
            </p>
            <p>
              You authorize Sallie Mae to release the information contained in this application and your credit eligibility results to the school for which you are applying for this loan.
            </p>
            <p className="font-semibold text-primary-blue">
              Your cosigner will be prompted to enter their information.
            </p>
            <p>
              For important information, including how to make payments and how payments are allocated and applied, visit:{' '}
              <a href="https://www.SallieMae.com/allocation" target="_blank" rel="noopener noreferrer" className="text-secondary-blue font-bold border-b-2 border-secondary-blue hover:text-primary-blue transition-colors">
                www.SallieMae.com/allocation
              </a>.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-end gap-8 mt-12 pt-8 border-t border-gray-100">
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
              className="flex-1 md:min-w-[200px] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0" 
              onClick={handleAgreeAndSubmit}
              loading={isContinuing}
              disabled={isLoading}
            >
              {subStep < 2 ? 'Agree and Submit' : 'Agree and Submit Application'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
