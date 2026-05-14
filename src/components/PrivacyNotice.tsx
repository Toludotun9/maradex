'use client';

import React from 'react';

const PrivacyNotice = () => {
  return (
    <div className="p-8 text-[13px] text-gray-700 leading-relaxed font-sans bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-center gap-2">
          <div className="text-3xl font-black text-gray-900 tracking-tighter">
            sallie mae<span className="text-[10px] align-top">®</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-gray-400">rev. 12/2025</p>
        </div>
      </div>

      {/* FACTS Table */}
      <div className="border-[1.5px] border-gray-400 mb-8">
        <div className="flex border-b-[1.5px] border-gray-400">
          <div className="bg-gray-500 text-white p-4 font-bold text-2xl w-40 flex items-center justify-center">
            FACTS
          </div>
          <div className="p-4 flex-1 flex items-center">
            <h4 className="text-lg font-bold text-gray-900 uppercase">WHAT DOES SALLIE MAE BANK DO WITH YOUR PERSONAL INFORMATION?</h4>
          </div>
        </div>

        <div className="flex border-b-[1.5px] border-gray-400 min-h-[80px]">
          <div className="bg-gray-300 text-white p-4 font-bold text-xl w-40 flex items-center justify-center italic">
            Why?
          </div>
          <div className="p-4 flex-1 text-[13.5px] leading-relaxed">
            Financial companies choose how they share your personal information. Federal law gives consumers the right to limit some but not all sharing. Federal law also requires us to tell you how we collect, share, and protect your personal information. Please read this notice carefully to understand what we do.
          </div>
        </div>

        <div className="flex border-b-[1.5px] border-gray-400 min-h-[80px]">
          <div className="bg-gray-300 text-white p-4 font-bold text-xl w-40 flex items-center justify-center italic">
            What?
          </div>
          <div className="p-4 flex-1 text-[13.5px] leading-relaxed">
            The types of personal information we collect and share depend on the product or service you have with us. This information can include:
            <ul className="mt-2 space-y-1 list-none pl-2">
              <li className="flex gap-4">
                <span className="text-gray-900 font-bold">■</span> Social Security number and income
              </li>
              <li className="flex gap-4">
                <span className="text-gray-900 font-bold">■</span> Account balances and payment history
              </li>
              <li className="flex gap-4">
                <span className="text-gray-900 font-bold">■</span> Transaction history and credit history
              </li>
            </ul>
          </div>
        </div>

        <div className="flex min-h-[80px]">
          <div className="bg-gray-300 text-white p-4 font-bold text-xl w-40 flex items-center justify-center italic">
            How?
          </div>
          <div className="p-4 flex-1 text-[13.5px] leading-relaxed">
            All financial companies need to share customers' personal information to run their everyday business. In the section below, we list the reasons financial companies can share their customers' personal information; the reasons Sallie Mae Bank chooses to share; and whether you can limit this sharing.
          </div>
        </div>
      </div>

      {/* Sharing Table */}
      <table className="w-full border-collapse border-[1.5px] border-gray-400 text-[13px] mb-8">
        <thead>
          <tr className="bg-gray-300">
            <th className="border-[1.5px] border-gray-400 p-3 text-left font-bold text-white w-[50%]">Reasons we can share your personal information</th>
            <th className="border-[1.5px] border-gray-400 p-3 text-center font-bold text-white">Does Sallie Mae Bank share?</th>
            <th className="border-[1.5px] border-gray-400 p-3 text-center font-bold text-white">Can you limit this sharing?</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          <tr>
            <td className="border-[1.5px] border-gray-400 p-4">
              <strong>For our everyday business purposes –</strong><br/>
              such as to process your transactions, maintain your account(s), respond to court orders and legal investigations, or report to credit bureaus
            </td>
            <td className="border-[1.5px] border-gray-400 p-4 text-center">Yes</td>
            <td className="border-[1.5px] border-gray-400 p-4 text-center">No</td>
          </tr>
          <tr>
            <td className="border-[1.5px] border-gray-400 p-4">
              <strong>For our marketing purposes –</strong> to offer our products and services to you
            </td>
            <td className="border-[1.5px] border-gray-400 p-4 text-center">Yes</td>
            <td className="border-[1.5px] border-gray-400 p-4 text-center">No</td>
          </tr>
          <tr>
            <td className="border-[1.5px] border-gray-400 p-4">
              <strong>For joint marketing with other financial companies</strong>
            </td>
            <td className="border-[1.5px] border-gray-400 p-4 text-center">Yes</td>
            <td className="border-[1.5px] border-gray-400 p-4 text-center">No</td>
          </tr>
          <tr>
            <td className="border-[1.5px] border-gray-400 p-4">
              <strong>For our affiliates’ everyday business purposes –</strong> information about your transactions and experiences
            </td>
            <td className="border-[1.5px] border-gray-400 p-4 text-center">Yes</td>
            <td className="border-[1.5px] border-gray-400 p-4 text-center">No</td>
          </tr>
          <tr>
            <td className="border-[1.5px] border-gray-400 p-4">
              <strong>For our affiliates’ everyday business purposes –</strong> information about your creditworthiness
            </td>
            <td className="border-[1.5px] border-gray-400 p-4 text-center">Yes</td>
            <td className="border-[1.5px] border-gray-400 p-4 text-center">Yes</td>
          </tr>
          <tr>
            <td className="border-[1.5px] border-gray-400 p-4">
              <strong>For our affiliates to market to you</strong>
            </td>
            <td className="border-[1.5px] border-gray-400 p-4 text-center">Yes</td>
            <td className="border-[1.5px] border-gray-400 p-4 text-center">Yes</td>
          </tr>
          <tr>
            <td className="border-[1.5px] border-gray-400 p-4">
              <strong>For nonaffiliates to market to you</strong>
            </td>
            <td className="border-[1.5px] border-gray-400 p-4 text-center">No</td>
            <td className="border-[1.5px] border-gray-400 p-4 text-center">We don’t share</td>
          </tr>
        </tbody>
      </table>

      {/* Opt-out Section */}
      <div className="border-[1.5px] border-gray-400 mb-8">
        <div className="flex border-b-[1.5px] border-gray-400">
          <div className="bg-gray-400 text-white p-4 font-bold text-lg w-40 flex items-center justify-center text-center leading-tight">
            To limit our sharing
          </div>
          <div className="p-4 flex-1 text-[13.5px] leading-relaxed">
            <ul className="list-none pl-2 mb-2">
              <li className="flex gap-4">
                <span className="text-gray-900 font-bold">■</span> Call toll free 1-855-582-1928 – to select your choices
              </li>
            </ul>
            <p className="font-bold mb-1">Please note:</p>
            <p>If you are a <em>new</em> customer, we can begin sharing your information 30 days from the date we sent this notice. When you are <em>no longer</em> our customer, we continue to share your information as described in this notice.</p>
            <p className="mt-2">To limit sharing you can call us toll free Monday-Friday 8am-8pm ET.</p>
          </div>
        </div>
        <div className="flex">
          <div className="bg-gray-400 text-white p-4 font-bold text-lg w-40 flex items-center justify-center">
            Questions?
          </div>
          <div className="p-4 flex-1 text-[13.5px] leading-relaxed flex items-center">
            Call toll free 1-855-582-1928 or go to <span className="font-bold underline ml-1">www.SallieMae.com/legal/privacy</span>
          </div>
        </div>
      </div>

      {/* Who We Are Table */}
      <div className="border-[1.5px] border-gray-400 mb-8">
        <div className="bg-gray-400 text-white p-3 font-bold text-base uppercase">Who we are</div>
        <div className="flex border-b border-gray-200">
          <div className="p-4 font-bold w-64 text-gray-800">Who is providing this notice?</div>
          <div className="p-4 flex-1">Sallie Mae Bank</div>
        </div>

        <div className="bg-gray-400 text-white p-3 font-bold text-base uppercase">What we do</div>
        <div className="flex border-b border-gray-200">
          <div className="p-4 font-bold w-64 text-gray-800">How does Sallie Mae Bank protect my personal information?</div>
          <div className="p-4 flex-1 leading-relaxed">
            To protect your personal information from unauthorized access and use, we use security measures that comply with federal law. These measures include computer safeguards and secured files and buildings.
          </div>
        </div>
        <div className="flex border-b border-gray-200">
          <div className="p-4 font-bold w-64 text-gray-800">How does Sallie Mae Bank collect my personal information?</div>
          <div className="p-4 flex-1 leading-relaxed">
            We collect your personal information, for example, when you:
            <ul className="mt-2 space-y-2 pl-2">
              <li className="flex gap-4"><span className="font-bold">■</span> apply for a loan or give us your contact information</li>
              <li className="flex gap-4"><span className="font-bold">■</span> open an account or make deposits or withdrawals from your account</li>
              <li className="flex gap-4"><span className="font-bold">■</span> use your credit or debit card</li>
            </ul>
            We also collect your personal information from others, such as credit bureaus, affiliates, or other companies.
          </div>
        </div>
        <div className="flex border-b border-gray-200">
          <div className="p-4 font-bold w-64 text-gray-800">Why can’t I limit all sharing?</div>
          <div className="p-4 flex-1 leading-relaxed">
            Federal law gives you the right to limit only
            <ul className="mt-2 space-y-2 pl-2">
              <li className="flex gap-4"><span className="font-bold">■</span> sharing for affiliates’ everyday business purposes – information about your creditworthiness</li>
              <li className="flex gap-4"><span className="font-bold">■</span> affiliates from using your information to market to you</li>
              <li className="flex gap-4"><span className="font-bold">■</span> sharing for nonaffiliates to market to you</li>
            </ul>
            State laws and individual companies may give you additional rights to limit sharing. See below for more on your rights under state law.
          </div>
        </div>
        <div className="flex">
          <div className="p-4 font-bold w-64 text-gray-800">What happens when I limit sharing for an account I hold jointly with someone else?</div>
          <div className="p-4 flex-1">Your choices will apply to everyone on your account.</div>
        </div>

        <div className="bg-gray-400 text-white p-3 font-bold text-base uppercase">Definitions</div>
        <div className="flex border-b border-gray-200">
          <div className="p-4 font-bold w-64 text-gray-800">Affiliates</div>
          <div className="p-4 flex-1 leading-relaxed">
            Companies related by common ownership or control. They can be financial and nonfinancial companies.
            <ul className="mt-2 pl-2">
              <li className="flex gap-4">
                <span className="font-bold">■</span> 
                <em>Our affiliates include companies related by common ownership and control with Sallie Mae Bank and that share the “Sallie Mae,” “SLM,” or “SMB” name, such as SLM Education Services, LLC; SMB Business Development, Inc.; SMB Shared Services, Inc.; SMB IT, Inc.; SMB Education Funding, LLC; and SLM Funding Solutions, LLC.</em>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex border-b border-gray-200">
          <div className="p-4 font-bold w-64 text-gray-800">Nonaffiliates</div>
          <div className="p-4 flex-1 leading-relaxed">
            Companies not related by common ownership or control. They can be financial and nonfinancial companies.
            <ul className="mt-2 pl-2">
              <li className="flex gap-4">
                <span className="font-bold">■</span> 
                <em>Nonaffiliates we share with can include service providers such as data processors and companies that are involved in promoting or marketing our own products.</em>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex">
          <div className="p-4 font-bold w-64 text-gray-800">Joint marketing</div>
          <div className="p-4 flex-1 leading-relaxed">
            A formal agreement between nonaffiliated financial companies that together market financial products or services to you.
            <ul className="mt-2 pl-2">
              <li className="flex gap-4">
                <span className="font-bold">■</span> 
                <em>Our joint marketing partners include financial institutions such as companies that provide credit products and insurance companies.</em>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-400 text-white p-3 font-bold text-base uppercase">Other important information</div>
        <div className="p-6 space-y-4 text-[13.5px] leading-relaxed">
          <p><strong>Vermont residents:</strong> We will not share personal information about you with nonaffiliates other than as permitted by law. We also will not share information about your creditworthiness with our affiliates without your consent.</p>
          <p><strong>California residents:</strong> We will share your personal information only as permitted by law. We will not disclose your personal information with nonaffiliates for their marketing purposes, unless you authorize us to do so. We will not disclose your personal information with joint marketing partners or our affiliates for their marketing purposes, unless we notify you in advance and allow you to opt-out and prevent this type of disclosure.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;
