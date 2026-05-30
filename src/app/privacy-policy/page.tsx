'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PrivacyNotice from '@/components/PrivacyNotice';
import CookieConsentBanner from '@/components/CookieConsentBanner';

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  return (
    <div className="w-full bg-white text-gray-800 min-h-screen flex flex-col font-sans">
      
      {/* Blue breadcrumb and title banner */}
      <div className="bg-[#0b4c7c] text-white py-12 md:py-16">
        <div className="max-w-[1250px] mx-auto px-6 lg:px-8">
          <div className="text-[13px] font-bold tracking-widest text-white/50 mb-3 flex items-center gap-1.5 uppercase select-none">
            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40 font-normal">&gt;</span>
            <span className="text-white/60">Privacy policy</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-serif">
            Sallie Mae Privacy
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 py-12 md:py-16 flex-grow w-full">
        <div className="space-y-8 text-[15px] leading-relaxed text-gray-700">
          
          <p className="text-[16px] text-gray-800 leading-relaxed font-medium">
            We at Sallie Mae know that you are concerned about privacy and the security of your personal information. We want you to know how we use and protect the personal information we receive from and about you. Please read the policies listed below to understand our principles and practices regarding the protection of personal information.
          </p>

          <hr className="border-gray-200" />

          {/* Section: Privacy Notice */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('notice')}
              className="text-left font-bold text-[#004b87] text-lg hover:underline cursor-pointer flex items-center gap-2 group focus:outline-none"
            >
              <span className="underline">Privacy Notice</span>
              <svg 
                className={`w-4 height-4 text-[#004b87] transition-transform duration-200 ${activeSection === 'notice' ? 'rotate-90' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <p className="text-gray-600">
              Describes our privacy principles and practices regarding our relationship with you and how we collect and share personal information with our affiliates and outside companies. The Notice applies to customers, applicants and former customers who have applied for or obtained a Sallie Mae product or service.
            </p>

            {activeSection === 'notice' && (
              <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-500 border-b border-gray-200 select-none flex justify-between items-center">
                  <span>OFFICIAL FACTS CONSUMER DISCLOSURE</span>
                  <button 
                    onClick={() => setActiveSection(null)}
                    className="text-[#004b87] hover:underline"
                  >
                    Hide details
                  </button>
                </div>
                <PrivacyNotice />
              </div>
            )}
          </div>

          <hr className="border-gray-200" />

          {/* Section: Privacy Policy */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('policy')}
              className="text-left font-bold text-[#004b87] text-lg hover:underline cursor-pointer flex items-center gap-2 group focus:outline-none"
            >
              <span className="underline">Privacy Policy</span>
              <svg 
                className={`w-4 height-4 text-[#004b87] transition-transform duration-200 ${activeSection === 'policy' ? 'rotate-90' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <p className="text-gray-600">
              Applies to everyone who visits or uses our website or mobile applications and describes our practices concerning the collection and use of personal information gathered from or about our online visitors and registered users.
            </p>

            {activeSection === 'policy' && (
              <div className="mt-4 p-6 bg-[#f7f9fb] border border-gray-200 rounded-lg space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <h4 className="font-bold text-[#13325b]">Sallie Mae Online Consumer Information Privacy Policy</h4>
                <p className="text-sm">
                  This Online Privacy Policy applies to the personal information we collect through our website, mobile apps, and other online properties. We collect info you provide (name, email, SSN, income) and device data (IP address, browser, behavior). We use cookies and pixel tags to enhance navigation, analyze usage, and customize ads.
                </p>
                <p className="text-sm">
                  You can disable cookies in your browser settings, though some online features may not function properly. We do not sell your personal information or share it with third parties for their own marketing purposes without consent.
                </p>
                <button 
                  onClick={() => setActiveSection(null)}
                  className="text-xs font-bold text-[#004b87] hover:underline"
                >
                  Hide details
                </button>
              </div>
            )}
          </div>

          <hr className="border-gray-200" />

          {/* Section: Privacy Addenda */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 text-lg">
              Privacy Addenda
            </h3>
            <p className="text-gray-600">
              Supplement our Privacy Policy. The addenda describe our privacy principles and practices and provides instructions on how to exercise your rights under various state laws:
            </p>
            
            <ul className="space-y-4 pl-1">
              <li className="space-y-2">
                <button
                  onClick={() => toggleSection('ca')}
                  className="text-left font-bold text-[#004b87] hover:underline flex items-center gap-1.5 focus:outline-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0084c9]" />
                  <span>California Privacy Addendum</span>
                </button>
                <p className="text-sm text-gray-600 pl-4">
                  Describes rights under the California Consumer Privacy Act (CCPA) and California Consumer Privacy Rights Act (CPRA).
                </p>
                {activeSection === 'ca' && (
                  <div className="ml-4 p-4 bg-gray-50 border border-gray-200 rounded text-sm space-y-2 animate-in fade-in duration-200">
                    <p><strong>California Residents Rights:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Right to know what personal info is collected, sold, or shared.</li>
                      <li>Right to delete personal info collected.</li>
                      <li>Right to correct inaccurate personal info.</li>
                      <li>Right to opt-out of sale or sharing.</li>
                      <li>Right to non-discrimination for exercising rights.</li>
                    </ul>
                  </div>
                )}
              </li>

              <li className="space-y-2">
                <button
                  onClick={() => toggleSection('co')}
                  className="text-left font-bold text-[#004b87] hover:underline flex items-center gap-1.5 focus:outline-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0084c9]" />
                  <span>Colorado Privacy Addendum</span>
                </button>
                <p className="text-sm text-gray-600 pl-4">
                  Describes rights under the Colorado Privacy Act (CPA).
                </p>
                {activeSection === 'co' && (
                  <div className="ml-4 p-4 bg-gray-50 border border-gray-200 rounded text-sm space-y-2 animate-in fade-in duration-200">
                    <p><strong>Colorado Consumers Rights:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Right to opt-out of targeted advertising, sales, and profiling.</li>
                      <li>Right of access, correction, deletion, and portability of personal data.</li>
                    </ul>
                  </div>
                )}
              </li>

              <li className="space-y-2">
                <button
                  onClick={() => toggleSection('ct')}
                  className="text-left font-bold text-[#004b87] hover:underline flex items-center gap-1.5 focus:outline-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0084c9]" />
                  <span>Connecticut Privacy Addendum</span>
                </button>
                <p className="text-sm text-gray-600 pl-4">
                  Describes rights under the Connecticut Data Privacy Act (CTDPA).
                </p>
                {activeSection === 'ct' && (
                  <div className="ml-4 p-4 bg-gray-50 border border-gray-200 rounded text-sm space-y-2 animate-in fade-in duration-200">
                    <p><strong>Connecticut Residents Rights:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Right to confirm, access, delete, and receive portable copies of personal data.</li>
                      <li>Right to correct inaccuracies in personal data.</li>
                      <li>Right to opt-out of profiling and targeted ads.</li>
                    </ul>
                  </div>
                )}
              </li>

              <li className="space-y-2">
                <button
                  onClick={() => toggleSection('ut')}
                  className="text-left font-bold text-[#004b87] hover:underline flex items-center gap-1.5 focus:outline-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0084c9]" />
                  <span>Utah Privacy Addendum</span>
                </button>
                <p className="text-sm text-gray-600 pl-4">
                  Describes rights under the Utah Consumer Privacy Act (UCPA).
                </p>
                {activeSection === 'ut' && (
                  <div className="ml-4 p-4 bg-gray-50 border border-gray-200 rounded text-sm space-y-2 animate-in fade-in duration-200">
                    <p><strong>Utah Residents Rights:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Right to confirm processing, access, and delete personal data.</li>
                      <li>Right to obtain data portability.</li>
                      <li>Right to opt-out of sales and targeted ads.</li>
                    </ul>
                  </div>
                )}
              </li>

              <li className="space-y-2">
                <button
                  onClick={() => toggleSection('va')}
                  className="text-left font-bold text-[#004b87] hover:underline flex items-center gap-1.5 focus:outline-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0084c9]" />
                  <span>Virginia Privacy Addendum</span>
                </button>
                <p className="text-sm text-gray-600 pl-4">
                  Describes rights under the Virginia Consumer Data Protection Act (VCDPA).
                </p>
                {activeSection === 'va' && (
                  <div className="ml-4 p-4 bg-gray-50 border border-gray-200 rounded text-sm space-y-2 animate-in fade-in duration-200">
                    <p><strong>Virginia Residents Rights:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Right to access, correct, delete, and obtain copies of personal data.</li>
                      <li>Right to opt-out of targeted ads, sales, and profiling.</li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>

          <hr className="border-gray-200" />

          {/* Section: USA Policy Applicability */}
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed text-sm">
              These policies apply to our customers and visitors located in the United States. Since they may change, please visit this site from time to time to review the policies for updates. Different policies may apply to some of the products and services offered through the Sallie Mae site. You will find these different policies within the site or on other Internet sites linked to this site. If a different policy applies, we will highlight this for you. The other policies may vary from our policies listed above. These differences are required by the type of the products and services being offered and the laws that apply to them as well as our business arrangements with their providers. We urge you to carefully read these policies in addition to the ones listed above.
            </p>

            <div className="space-y-3">
              <Link
                href="#"
                className="font-bold text-[#004b87] text-lg hover:underline cursor-pointer block"
              >
                Sallie Mae Consumer Rights Request Form
              </Link>
              <p className="text-gray-600">
                Allows consumers to request and obtain personal information collected and used by Sallie Mae about them, and to request their personal information be deleted.
              </p>
            </div>
          </div>

        </div>
      </div>
      <CookieConsentBanner />
    </div>
  );
}
