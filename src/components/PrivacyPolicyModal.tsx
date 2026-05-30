'use client';

import React, { useEffect, useRef } from 'react';
import { useAppContext } from '@/context/AppContext';

const PrivacyPolicyModal = () => {
  const { isPrivacyOpen, setPrivacyOpen } = useAppContext();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPrivacyOpen) {
        setPrivacyOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPrivacyOpen, setPrivacyOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isPrivacyOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPrivacyOpen]);

  if (!isPrivacyOpen) return null;

  const handleClose = () => setPrivacyOpen(false);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside to close backdrop */}
      <div className="absolute inset-0" onClick={handleClose} />
      
      {/* Modal Card */}
      <div 
        ref={modalRef}
        className="relative bg-white w-full max-w-[800px] max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Header (with X close button overlay) */}
        <div className="absolute top-4 right-4 z-50">
          <button 
            onClick={handleClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors focus:outline-none shadow-sm"
            aria-label="Close dialog"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Hero banner exactly like Sallie Mae website */}
        <div className="bg-[#0f345c] text-white p-8 md:p-12 relative flex flex-col justify-end min-h-[160px]">
          <div className="text-[11px] font-bold tracking-widest text-[#0084c9] uppercase mb-2 flex items-center gap-1.5">
            <span>Home</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
            <span className="text-white/70">Privacy policy</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Sallie Mae Privacy</h2>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 md:p-8 overflow-y-auto text-sm text-gray-700 leading-relaxed space-y-6">
          <p className="text-base text-gray-600 font-medium">
            We at Sallie Mae know that you are concerned about privacy and the security of your personal information. We want you to know how we use and protect the personal information we receive from and about you. Please read the policies listed below to understand our principles and practices regarding the protection of personal information.
          </p>

          <hr className="border-gray-100" />

          {/* Section: Privacy Notice */}
          <div className="space-y-2">
            <h3 className="text-base font-extrabold text-[#0f345c] hover:underline cursor-pointer">
              Privacy Notice
            </h3>
            <p className="text-gray-600">
              Describes our privacy principles and practices regarding our relationship with you and how we collect and share personal information with our affiliates and outside companies. The Notice applies to customers, applicants and former customers who have applied for or obtained a Sallie Mae product or service.
            </p>
          </div>

          {/* Section: Privacy Policy */}
          <div className="space-y-2">
            <h3 className="text-base font-extrabold text-[#0f345c] hover:underline cursor-pointer">
              Privacy Policy
            </h3>
            <p className="text-gray-600">
              Applies to everyone who visits or uses our website or mobile applications and describes our practices concerning the collection and use of personal information gathered from or about our online visitors and registered users.
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* Section: Privacy Addenda */}
          <div className="space-y-4">
            <h4 className="text-base font-extrabold text-gray-800">
              Privacy Addenda
            </h4>
            <p className="text-gray-600">
              Supplement our Privacy Policy. The addenda describe our privacy principles and practices and provides instructions on how to exercise your rights under various state laws:
            </p>
            
            <ul className="space-y-3.5 pl-2">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0084c9] mt-2 flex-shrink-0" />
                <p className="text-gray-600">
                  <strong className="text-[#0f345c] hover:underline cursor-pointer">California Privacy Addendum</strong> describes rights under the California Consumer Privacy Act (CCPA).
                </p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0084c9] mt-2 flex-shrink-0" />
                <p className="text-gray-600">
                  <strong className="text-[#0f345c] hover:underline cursor-pointer">Colorado Privacy Addendum</strong> describes rights under the Colorado Privacy Act (CPA).
                </p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0084c9] mt-2 flex-shrink-0" />
                <p className="text-gray-600">
                  <strong className="text-[#0f345c] hover:underline cursor-pointer">Connecticut Privacy Addendum</strong> describes rights under the Connecticut Data Privacy Act (CTDPA).
                </p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0084c9] mt-2 flex-shrink-0" />
                <p className="text-gray-600">
                  <strong className="text-[#0f345c] hover:underline cursor-pointer">Utah Privacy Addendum</strong> describes rights under the Utah Consumer Privacy Act (UCPA).
                </p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0084c9] mt-2 flex-shrink-0" />
                <p className="text-gray-600">
                  <strong className="text-[#0f345c] hover:underline cursor-pointer">Virginia Privacy Addendum</strong> describes rights under the Virginia Consumer Data Protection Act (VCDPA).
                </p>
              </li>
            </ul>
          </div>

          <hr className="border-gray-100" />

          {/* Section: USA Policy Applicability */}
          <div className="space-y-4">
            <p className="text-gray-600">
              These policies apply to our customers and visitors located in the United States. Since they may change, please visit this site from time to time to review the policies for updates. Different policies may apply to some of the products and services offered through the Sallie Mae site. You will find these different policies within the site or on other Internet sites linked to this site. If a different policy applies, we will highlight this for you. The other policies may vary from our policies listed above. These differences are required by the type of the products and services being offered and the laws that apply to them as well as our business arrangements with their providers. We urge you to carefully read these policies in addition to the ones listed above.
            </p>

            <div className="space-y-2">
              <h3 className="text-base font-extrabold text-[#0f345c] hover:underline cursor-pointer">
                Sallie Mae Consumer Rights Request Form
              </h3>
              <p className="text-gray-600 font-medium">
                Allows consumers to request and obtain personal information collected and used by Sallie Mae about them, and to request their personal information be deleted.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end items-center px-6 py-4 border-t border-gray-100 bg-[#F7F9FB]">
          <button
            onClick={handleClose}
            className="px-6 py-2.5 rounded-full bg-[#10365c] hover:bg-[#0b2744] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
