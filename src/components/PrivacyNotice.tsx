'use client';

import React from 'react';

const PrivacyNotice = () => {
  return (
    <div className="p-8 text-[13px] text-gray-700 leading-relaxed overflow-y-auto max-h-[800px] font-sans">
      <div className="flex justify-between items-start mb-6">
        <div className="w-32">
          <svg viewBox="0 0 200 40" className="w-full text-[#5D2E8E] fill-current">
            <text x="0" y="30" fontSize="24" fontWeight="900" style={{ letterSpacing: '-1px' }}>sallie mae</text>
          </svg>
        </div>
        <div className="text-right text-[10px] text-gray-400 font-bold uppercase">
          rev. 12/2025
        </div>
      </div>

      <div className="border border-gray-400 mb-8 overflow-hidden">
        <div className="flex bg-gray-600 text-white p-4 items-center">
          <h4 className="text-2xl font-bold tracking-widest mr-6">FACTS</h4>
          <h5 className="text-sm font-bold uppercase">WHAT DOES SALLIE MAE BANK DO WITH YOUR PERSONAL INFORMATION?</h5>
        </div>

        <div className="flex border-b border-gray-400">
          <div className="w-24 bg-gray-100 p-4 font-bold text-gray-600 text-sm border-r border-gray-400">Why?</div>
          <div className="flex-1 p-4">
            Financial companies choose how they share your personal information. Federal law gives consumers the right to limit some but not all sharing. Federal law also requires us to tell you how we collect, share, and protect your personal information. Please read this notice carefully to understand what we do.
          </div>
        </div>

        <div className="flex border-b border-gray-400">
          <div className="w-24 bg-gray-100 p-4 font-bold text-gray-600 text-sm border-r border-gray-400">What?</div>
          <div className="flex-1 p-4">
            <p className="mb-2">The types of personal information we collect and share depend on the product or service you have with us. This information can include:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Social Security number and income</li>
              <li>Account balances and payment history</li>
              <li>Transaction history and credit history</li>
            </ul>
          </div>
        </div>

        <div className="flex">
          <div className="w-24 bg-gray-100 p-4 font-bold text-gray-600 text-sm border-r border-gray-400">How?</div>
          <div className="flex-1 p-4">
            All financial companies need to share customers' personal information to run their everyday business. In the section below, we list the reasons financial companies can share their customers' personal information; the reasons Sallie Mae Bank chooses to share; and whether you can limit this sharing.
          </div>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-400 text-xs mb-8">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="border border-gray-400 p-3 text-left w-1/2">Reasons we can share your personal information</th>
            <th className="border border-gray-400 p-3 text-center">Does Sallie Mae Bank share?</th>
            <th className="border border-gray-400 p-3 text-center">Can you limit this sharing?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 p-3">
              <strong>For our everyday business purposes –</strong><br/>
              such as to process your transactions, maintain your account(s), respond to court orders and legal investigations, or report to credit bureaus
            </td>
            <td className="border border-gray-400 p-3 text-center">Yes</td>
            <td className="border border-gray-400 p-3 text-center">No</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-3">
              <strong>For our marketing purposes –</strong><br/>
              to offer our products and services to you
            </td>
            <td className="border border-gray-400 p-3 text-center">Yes</td>
            <td className="border border-gray-400 p-3 text-center">No</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-3">
              <strong>For joint marketing with other financial companies</strong>
            </td>
            <td className="border border-gray-400 p-3 text-center">Yes</td>
            <td className="border border-gray-400 p-3 text-center">No</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-3">
              <strong>For our affiliates’ everyday business purposes –</strong><br/>
              information about your transactions and experiences
            </td>
            <td className="border border-gray-400 p-3 text-center">Yes</td>
            <td className="border border-gray-400 p-3 text-center">No</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-3">
              <strong>For our affiliates’ everyday business purposes –</strong><br/>
              information about your creditworthiness
            </td>
            <td className="border border-gray-400 p-3 text-center">Yes</td>
            <td className="border border-gray-400 p-3 text-center">Yes</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-3">
              <strong>For our affiliates to market to you</strong>
            </td>
            <td className="border border-gray-400 p-3 text-center">Yes</td>
            <td className="border border-gray-400 p-3 text-center">Yes</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-3">
              <strong>For nonaffiliates to market to you</strong>
            </td>
            <td className="border border-gray-400 p-3 text-center">No</td>
            <td className="border border-gray-400 p-3 text-center">We don't share</td>
          </tr>
        </tbody>
      </table>

      <div className="border border-gray-400 mb-8">
        <div className="flex border-b border-gray-400">
          <div className="w-32 bg-gray-100 p-4 font-bold text-gray-600 text-sm border-r border-gray-400 leading-tight">To limit our sharing</div>
          <div className="flex-1 p-4">
            <ul className="list-disc ml-5 space-y-2">
              <li>Call toll free <strong>1-855-582-1928</strong> – to select your choices</li>
            </ul>
            <p className="mt-3 font-bold">Please note:</p>
            <p>If you are a <em>new</em> customer, we can begin sharing your information 30 days from the date we sent this notice. When you are <em>no longer</em> our customer, we continue to share your information as described in this notice.</p>
            <p className="mt-3">To limit sharing you can call us toll free Monday–Friday 8am–8pm ET.</p>
          </div>
        </div>
        <div className="flex">
          <div className="w-32 bg-gray-100 p-4 font-bold text-gray-600 text-sm border-r border-gray-400">Questions?</div>
          <div className="flex-1 p-4">
            Call toll free <strong>1-855-582-1928</strong> or go to <span className="underline font-bold text-blue-700">www.SallieMae.com/legal/privacy</span>
          </div>
        </div>
      </div>

      <div className="pt-20">
        <div className="w-32 mb-6">
          <svg viewBox="0 0 200 40" className="w-full text-[#5D2E8E] fill-current">
            <text x="0" y="30" fontSize="24" fontWeight="900" style={{ letterSpacing: '-1px' }}>sallie mae</text>
          </svg>
        </div>
        
        <div className="border border-gray-400">
          <div className="bg-gray-400 p-1 flex">
            <div className="w-64 bg-gray-100 p-2 font-bold text-gray-600 border-r border-gray-400">Who we are</div>
            <div className="flex-1 bg-white"></div>
          </div>
          <div className="flex border-b border-gray-400">
            <div className="w-64 bg-gray-100 p-4 font-bold text-gray-600 text-[11px] border-r border-gray-400 leading-tight">Who is providing this notice?</div>
            <div className="flex-1 p-4">Sallie Mae Bank</div>
          </div>

          <div className="bg-gray-400 p-1 flex">
            <div className="w-64 bg-gray-100 p-2 font-bold text-gray-600 border-r border-gray-400">What we do</div>
            <div className="flex-1 bg-white"></div>
          </div>
          <div className="flex border-b border-gray-400">
            <div className="w-64 bg-gray-100 p-4 font-bold text-gray-600 text-[11px] border-r border-gray-400 leading-tight">How does Sallie Mae Bank protect my personal information?</div>
            <div className="flex-1 p-4">
              To protect your personal information from unauthorized access and use, we use security measures that comply with federal law. These measures include computer safeguards and secured files and buildings.
            </div>
          </div>
          <div className="flex border-b border-gray-400">
            <div className="w-64 bg-gray-100 p-4 font-bold text-gray-600 text-[11px] border-r border-gray-400 leading-tight">How does Sallie Mae Bank collect my personal information?</div>
            <div className="flex-1 p-4">
              <p className="mb-2">We collect your personal information, for example, when you:</p>
              <ul className="list-disc ml-5 space-y-1 mb-2">
                <li>apply for a loan or give us your contact information</li>
                <li>open an account or make deposits or withdrawals from your account</li>
                <li>use your credit or debit card</li>
              </ul>
              <p>We also collect your personal information from others, such as credit bureaus, affiliates, or other companies.</p>
            </div>
          </div>
          <div className="flex border-b border-gray-400">
            <div className="w-64 bg-gray-100 p-4 font-bold text-gray-600 text-[11px] border-r border-gray-400 leading-tight">Why can’t I limit all sharing?</div>
            <div className="flex-1 p-4">
              <p className="mb-2">Federal law gives you the right to limit only</p>
              <ul className="list-disc ml-5 space-y-1 mb-2">
                <li>sharing for affiliates’ everyday business purposes – information about your creditworthiness</li>
                <li>affiliates from using your information to market to you</li>
                <li>sharing for nonaffiliates to market to you</li>
              </ul>
              <p>State laws and individual companies may give you additional rights to limit sharing. See below for more on your rights under state law.</p>
            </div>
          </div>
          <div className="flex border-b border-gray-400">
            <div className="w-64 bg-gray-100 p-4 font-bold text-gray-600 text-[11px] border-r border-gray-400 leading-tight">What happens when I limit sharing for an account I hold jointly with someone else?</div>
            <div className="flex-1 p-4">Your choices will apply to everyone on your account.</div>
          </div>

          <div className="bg-gray-400 p-1 flex">
            <div className="w-64 bg-gray-100 p-2 font-bold text-gray-600 border-r border-gray-400">Definitions</div>
            <div className="flex-1 bg-white"></div>
          </div>
          <div className="flex border-b border-gray-400">
            <div className="w-64 bg-gray-100 p-4 font-bold text-gray-600 text-[11px] border-r border-gray-400 leading-tight">Affiliates</div>
            <div className="flex-1 p-4">
              <p className="mb-2">Companies related by common ownership or control. They can be financial and nonfinancial companies.</p>
              <ul className="list-disc ml-5 space-y-1 text-[11px]">
                <li>Our affiliates include companies under common ownership and control with Sallie Mae Bank and that share the “Sallie Mae,” “SLM,” or “SMB” name, such as SLM Education Services, LLC; SMB Business Development, Inc.; SMB Shared Services, Inc.; SMB IT, Inc.; SMB Education Funding, LLC; and SLM Funding Solutions, LLC.</li>
              </ul>
            </div>
          </div>
          <div className="flex border-b border-gray-400">
            <div className="w-64 bg-gray-100 p-4 font-bold text-gray-600 text-[11px] border-r border-gray-400 leading-tight">Nonaffiliates</div>
            <div className="flex-1 p-4">
              <p className="mb-2">Companies not related by common ownership or control. They can be financial and nonfinancial companies.</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Nonaffiliates we share with can include service providers such as data processors and companies that are involved in promoting or marketing our own products.</li>
              </ul>
            </div>
          </div>
          <div className="flex border-b border-gray-400">
            <div className="w-64 bg-gray-100 p-4 font-bold text-gray-600 text-[11px] border-r border-gray-400 leading-tight">Joint marketing</div>
            <div className="flex-1 p-4">
              <p className="mb-2">A formal agreement between nonaffiliated financial companies that together market financial products or services to you.</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Our joint marketing partners include financial institutions such as companies that provide credit products and insurance companies.</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-400 p-1 flex">
            <div className="w-64 bg-gray-100 p-2 font-bold text-gray-600 border-r border-gray-400 uppercase text-[10px]">Other important information</div>
            <div className="flex-1 bg-white"></div>
          </div>
          <div className="p-4 space-y-4">
            <p><strong>Vermont residents:</strong> We will not share personal information about you with nonaffiliates other than as permitted by law. We also will not share information about your creditworthiness with our affiliates without your consent.</p>
            <p><strong>California residents:</strong> We will share your personal information only as permitted by law. We will not disclose your personal information with nonaffiliates for their marketing purposes, unless you authorize us to do so. We will not disclose your personal information with joint marketing partners or our affiliates for their marketing purposes, unless we notify you in advance and allow you to opt-out and prevent this type of disclosure.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;
