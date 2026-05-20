'use client';

import React from 'react';

const SolicitationDisclosure = () => {
  return (
    <div className="p-4 sm:p-8 md:p-10 text-[13px] text-gray-700 leading-relaxed overflow-y-auto max-h-[850px] font-sans bg-white">
      {/* Page 1 */}
      <div className="mb-16">
        <div className="text-center mb-4">
          <h4 className="text-[15px] font-bold text-gray-900 uppercase tracking-tight">Private Education Loan Application and Solicitation Disclosure</h4>
          <p className="text-[11px] text-gray-500 mt-1 text-right">Page 1 of 4</p>
        </div>

        <div className="border-t-2 border-black pt-4 mb-8 flex justify-between items-start">
          <div className="max-w-[60%]">
            <h5 className="text-xl font-bold text-gray-900 leading-tight mb-1">Smart Option Student Loan</h5>
            <p className="text-[13px] font-medium text-gray-600">Variable Rate Type (see pages 3 & 4 for Fixed Rate Type)</p>
          </div>
          <div className="text-right text-[12px] leading-tight text-gray-900">
            <p className="font-bold mb-0.5">Sallie Mae Bank</p>
            <p>P.O. Box 3319</p>
            <p>Wilmington, DE 19804</p>
            <p>(877) 279-7172</p>
          </div>
        </div>

        <h5 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-2">Loan Interest Rate & Fees</h5>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-10">
          <div className="bg-gray-100 p-4 sm:p-8 rounded-lg flex-1 border border-gray-200">
            <p className="text-[15px] mb-6 text-gray-800">Your <strong>starting interest rate</strong> will be between</p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6">
              <div className="bg-white border-2 border-gray-300 px-4 sm:px-8 py-3 sm:py-4 text-2xl sm:text-3xl font-bold text-gray-900 shadow-sm">
                4.000<span className="text-base align-top ml-0.5 font-semibold">%</span>
              </div>
              <span className="font-bold text-gray-400 text-[14px] sm:text-lg italic">and</span>
              <div className="bg-white border-2 border-gray-300 px-4 sm:px-8 py-3 sm:py-4 text-2xl sm:text-3xl font-bold text-gray-900 shadow-sm">
                17.420<span className="text-base align-top ml-0.5 font-semibold">%</span>
              </div>
            </div>
            <p className="text-[13px] text-gray-600 font-medium text-center">After the starting rate is set, your rate will then vary with the market</p>
          </div>
          <div className="flex-[1.4] space-y-6">
            <div>
              <h6 className="text-base font-bold text-gray-900 mb-2">Your Starting Interest Rate (upon approval)</h6>
              <p className="text-[14px] leading-relaxed">
                The starting interest rate you pay will be determined after you apply. It will be based upon your credit history and other factors (cosigner credit, repayment option, etc). If approved, we will notify you of the rate you qualify for within the stated range.
              </p>
            </div>
            <div>
              <h6 className="text-base font-bold text-gray-900 mb-2">Your Interest Rate during the life of the loan</h6>
              <p className="font-bold text-gray-900 mb-2">Your rate is variable.</p>
              <p className="text-[14px] leading-relaxed mb-4">
                This means that your rate could move lower or higher than the rates on this form. The variable rate is based upon the 30-day average Secured Overnight Financing Rate (SOFR) (as published by the Federal Reserve Bank of New York). For more information on this rate, see the reference notes.
              </p>
              <div className="bg-gray-100 border-l-4 border-gray-400 p-5 rounded-r-md">
                <p className="text-[14px] text-gray-800">
                  Although the rate will vary after you are approved, it will <span className="underline font-bold text-gray-900">never exceed 25.000%</span> (the maximum allowable for this loan).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h5 className="text-xl font-bold text-gray-900 mb-4">Loan Fees</h5>
          <p className="text-[14px] leading-relaxed text-gray-700">
            <strong>Application Fee:</strong> $0.00. <strong>Origination Fee:</strong> The fees that we charge to make this loan range from 0.000% to 0.000% of total loan amount. <strong>Loan Guarantee Fee:</strong> 0.000% to 0.000% of total loan amount. <strong>Repayment Fee:</strong> The fees we charge when you begin repayment range from 0.000% to 0.000% of the total loan amount. <strong>Late Fee:</strong> 5.000% of the amount of the past due payment, up to a maximum of $25. <strong>Returned Check Fee:</strong> up to $20.00.
          </p>
        </div>

        <div className="mb-8">
          <h5 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Loan Cost Examples</h5>
          <p className="text-[14px] text-gray-700 mb-6">
            The total amount you will pay for this loan will vary depending upon when you start to repay it. This example provides estimates based upon three (3) different repayment options available to you while enrolled in school.
          </p>

          <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="bg-gray-100 text-gray-900">
                  <th className="border-b border-r border-gray-300 p-4 text-left font-bold w-[30%]">Repayment Option <br/><span className="font-normal text-[11px] text-gray-600">(while enrolled in school and during the separation period of 6 billing periods thereafter)</span></th>
                  <th className="border-b border-r border-gray-300 p-4 text-left font-bold">Amount Provided <br/><span className="font-normal text-[11px] text-gray-600">(amount provided directly to you or your school)</span></th>
                  <th className="border-b border-r border-gray-300 p-4 text-left font-bold">Interest Rate <br/><span className="font-normal text-[11px] text-gray-600">(highest possible starting rate)</span></th>
                  <th className="border-b border-r border-gray-300 p-4 text-left font-bold">Loan Term <br/><span className="font-normal text-[11px] text-gray-600">(how long you have to pay off the loan)</span></th>
                  <th className="border-b border-gray-300 p-4 text-left font-bold">Total Paid over life of loan <br/><span className="font-normal text-[11px] text-gray-600">(includes associated fees)</span></th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="border-r border-b border-gray-200 p-4">
                    <p className="font-bold text-gray-900 mb-1">1. INTEREST REPAYMENT</p>
                    <p className="text-gray-600 text-[12px] leading-relaxed">Make interest payments but defer payments on the principal amount while enrolled in school and during the separation period.</p>
                  </td>
                  <td className="border-r border-b border-gray-200 p-4 text-gray-900 font-medium">$10,000</td>
                  <td className="border-r border-b border-gray-200 p-4 text-gray-900 font-medium">17.420%</td>
                  <td className="border-r border-b border-gray-200 p-4 text-gray-600">15 years starting <span className="underline decoration-gray-400">after</span> the separation period</td>
                  <td className="border-b border-gray-200 p-4 font-bold text-gray-900 text-base">$35,203.61</td>
                </tr>
                <tr className="bg-gray-50/30 hover:bg-gray-50/60 transition-colors">
                  <td className="border-r border-b border-gray-200 p-4">
                    <p className="font-bold text-gray-900 mb-1">2. FIXED REPAYMENT</p>
                    <p className="text-gray-600 text-[12px] leading-relaxed">Make payments of $25 while enrolled in school and during the separation period. Interest will be charged and added to your loan.</p>
                  </td>
                  <td className="border-r border-b border-gray-200 p-4 text-gray-900 font-medium">$10,000</td>
                  <td className="border-r border-b border-gray-200 p-4 text-gray-900 font-medium">17.420%</td>
                  <td className="border-r border-b border-gray-200 p-4 text-gray-600">15 years starting <span className="underline decoration-gray-400">after</span> the separation period</td>
                  <td className="border-b border-gray-200 p-4 font-bold text-gray-900 text-base">$45,686.02</td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="border-r border-gray-200 p-4">
                    <p className="font-bold text-gray-900 mb-1">3. DEFERRED REPAYMENT</p>
                    <p className="text-gray-600 text-[12px] leading-relaxed">Make no payments while enrolled in school and during the separation period. Interest will be charged and added to your loan.</p>
                  </td>
                  <td className="border-r border-gray-200 p-4 text-gray-900 font-medium">$10,000</td>
                  <td className="border-r border-gray-200 p-4 text-gray-900 font-medium">17.420%</td>
                  <td className="border-r border-gray-200 p-4 text-gray-600">15 years starting <span className="underline decoration-gray-400">after</span> the separation period</td>
                  <td className="p-4 font-bold text-gray-900 text-base">$47,970.03</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h6 className="font-bold text-gray-900 mb-2">About this example</h6>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              The repayment example assumes that the borrower remains in school for 4 years and has a 6-month separation period before beginning repayment. It is based on the <strong>highest starting rate currently charged</strong>, associated fees, and the maximum loan term. The loan term, also referred to as the term of the loan, is the period during which regularly scheduled payments of principal and interest will be due. The length of the loan term can range from 10 to 15 years, depending on the loan amount requested and the borrower’s total outstanding Sallie Mae-serviced loan balance. The loan term may be shorter if it is subject to a minimum monthly payment amount of $50.
            </p>
          </div>
        </div>

        <div className="relative pt-12">
          <p className="text-center font-bold tracking-[0.2em] text-[12px] text-gray-900">SEE BACK OF PAGE</p>
          <div className="flex justify-between items-end mt-4">
            <p className="text-[11px] text-gray-400">7SDA2506/Rev052026v01</p>
            <p className="text-[12px] font-bold text-gray-900">Page 2 of 4</p>
          </div>
        </div>
      </div>

      {/* Page 2 */}
      <div className="mb-16 pt-16 border-t-2 border-gray-100">
        <div className="mb-12">
          <h5 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-8">Federal Loan Alternatives</h5>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1">
              <table className="w-full border-collapse border border-gray-300 text-[13px]">
                <thead>
                  <tr className="bg-gray-100 text-gray-900">
                    <th className="border border-gray-300 p-4 text-left font-bold">Loan Program</th>
                    <th className="border border-gray-300 p-4 text-left font-bold">Current Interest Rates by Program Type*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-4">
                      <p className="font-bold text-gray-900 uppercase text-[11px] mb-1">DIRECT</p>
                      <p className="text-gray-600 italic">for Students</p>
                    </td>
                    <td className="border border-gray-300 p-4">
                      <p className="mb-2"><strong>6.390% fixed</strong> Undergraduate subsidized and unsubsidized</p>
                      <p><strong>7.940% fixed</strong> Graduate</p>
                    </td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="border border-gray-300 p-4">
                      <p className="font-bold text-gray-900 uppercase text-[11px] mb-1">DIRECT PLUS</p>
                      <p className="text-gray-600 italic">for Parents and Graduate/Professional Students</p>
                    </td>
                    <td className="border border-gray-300 p-4">
                      <p><strong>8.940% fixed</strong> Federal Direct Loan</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[11px] text-gray-500 mt-4 leading-relaxed italic">
                *These interest rates are determined by federal law and are for federal loans first disbursed on or after July 1, 2025, and before July 1, 2026. The federal loan interest rates may change in the future, but only for new federal loans.
              </p>
            </div>
            <div className="md:w-72 space-y-4">
              <h6 className="text-[15px] font-bold text-gray-900 leading-snug">You may qualify for Federal education loans.</h6>
              <p className="text-[13px] text-gray-700 leading-relaxed">
                For additional information, <strong>contact your school's financial aid office</strong> or the <strong>Department of Education at:</strong>
              </p>
              <p className="text-base font-bold text-secondary-blue hover:underline cursor-pointer">
                www.studentaid.gov
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h5 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-8">Next Steps</h5>
          <div className="space-y-8">
            <div className="flex gap-4">
              <span className="font-bold text-gray-900 text-lg">1.</span>
              <div>
                <h6 className="font-bold text-gray-900 text-[15px] mb-1">Find Out About Other Loan Options.</h6>
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  Some schools have school-specific student loan benefits and terms not detailed on this form. Contact your school's financial aid office or visit the Department of Education's web site at: <span className="font-medium">www.studentaid.gov</span> for more information about other loans.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-gray-900 text-lg">2.</span>
              <div>
                <h6 className="font-bold text-gray-900 text-[15px] mb-1">To Apply for this Loan, Complete the Application and the Self-Certification Form.</h6>
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  You may get the certification form from your school's financial aid office. If you are approved for this loan, the loan terms will be available for 30 days (terms will not change during this period, except as permitted by law and the variable interest rate may change based on the market).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="bg-gray-200 p-3 mb-6">
            <h5 className="text-[15px] font-bold text-gray-900 uppercase tracking-wider">Reference Notes</h5>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 px-2">
            <div className="space-y-6">
              <div>
                <h6 className="font-bold text-gray-900 text-[14px] mb-3">Variable Interest Rate</h6>
                <ul className="space-y-4 text-[13px] text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-gray-400">•</span>
                    <span>This loan has a variable interest rate, that is based on a publicly available index, the 30-day average Secured Overnight Financing Rate (SOFR) rounded up to the nearest one-eighth of one percent. Your rate will be calculated each month by adding a margin between 0.250% and 13.670% to the SOFR rounded up to the nearest one-eighth of one percent.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400">•</span>
                    <span>The rate will not increase more than once a month, but there is no limit on the amount that the rate could increase at one time.</span>
                  </li>
                </ul>
              </div>
              <div>
                <h6 className="font-bold text-gray-900 text-[14px] mb-3">Eligibility Criteria <span className="font-normal italic block text-gray-600">Borrower</span></h6>
                <ul className="space-y-4 text-[13px] text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-gray-400">•</span>
                    <span>For full-time, half-time, or less-than-half-time enrollment at an eligible school.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400">•</span>
                    <span>Must be at least the age of majority in your state of residence at the time you apply. Otherwise a cosigner is needed.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h6 className="font-bold text-gray-900 text-[14px] mb-3">Cosigner</h6>
                <ul className="space-y-4 text-[13px] text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-gray-400">•</span>
                    <span>A cosigner is not required, but may help you qualify and/or receive a lower interest rate.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400">•</span>
                    <span>Must be at least the age of majority in the cosigner's state of residence at the time of loan application.</span>
                  </li>
                </ul>
              </div>
              <div>
                <h6 className="font-bold text-gray-900 text-[14px] mb-3">Bankruptcy Limitations</h6>
                <ul className="space-y-4 text-[13px] text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-gray-400">•</span>
                    <span>If you file for bankruptcy you may still be required to pay back this loan.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <p className="font-bold text-gray-900 leading-snug">
                  More information about loan eligibility and repayment deferral or forbearance options is available in your loan application and promissory note.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t-2 border-black space-y-6">
          <p className="text-[13px] text-gray-700 leading-relaxed italic">
            Please see the INTEREST section of your promissory note for more information about the variable interest rate, including the circumstances in which a replacement or substitute index may be used in place of SOFR.
          </p>
          <p className="text-[13px] text-gray-700 leading-relaxed">
            Military Lending Act Disclosure: To hear an oral disclosure of a statement of the Military Annual Percentage Rate and a clear description of the payment obligation, please call our toll-free number at 855-455-6972.
          </p>
          <div className="flex justify-between items-end pt-8">
            <p className="text-[11px] text-gray-400 uppercase">7SDA2506/Rev052026v01</p>
            <div className="text-right">
              <h4 className="text-[14px] font-bold text-gray-900 mb-1 uppercase">Private Education Loan Application and Solicitation Disclosure</h4>
              <p className="text-[12px] font-bold text-gray-900">Page 3 of 4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Page 3: Fixed Rate Type */}
      <div className="pt-16 border-t-4 border-double border-gray-300">
        <div className="text-center mb-4">
          <h4 className="text-[15px] font-bold text-gray-900 uppercase tracking-tight">Private Education Loan Application and Solicitation Disclosure</h4>
          <p className="text-[11px] text-gray-500 mt-1 text-right">Page 3 of 4</p>
        </div>

        <div className="border-t-2 border-black pt-4 mb-8 flex justify-between items-start">
          <div className="max-w-[60%]">
            <h5 className="text-xl font-bold text-gray-900 leading-tight mb-1">Smart Option Student Loan</h5>
            <p className="text-[13px] font-medium text-gray-600">Fixed Rate Type (see pages 1 & 2 for Variable Rate Type)</p>
          </div>
          <div className="text-right text-[12px] leading-tight text-gray-900">
            <p className="font-bold mb-0.5">Sallie Mae Bank</p>
            <p>P.O. Box 3319</p>
            <p>Wilmington, DE 19804</p>
            <p>(877) 279-7172</p>
          </div>
        </div>

        <h5 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-2">Loan Interest Rate & Fees</h5>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-12">
          <div className="bg-gray-100 p-4 sm:p-8 rounded-lg flex-1 border border-gray-200">
            <p className="text-[15px] mb-6 text-gray-800">Your <strong>interest rate</strong> will be between</p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6">
              <div className="bg-white border-2 border-gray-300 px-4 sm:px-8 py-3 sm:py-4 text-2xl sm:text-3xl font-bold text-gray-900 shadow-sm">
                3.200<span className="text-base align-top ml-0.5 font-semibold">%</span>
              </div>
              <span className="font-bold text-gray-400 text-[14px] sm:text-lg italic">and</span>
              <div className="bg-white border-2 border-gray-300 px-4 sm:px-8 py-3 sm:py-4 text-2xl sm:text-3xl font-bold text-gray-900 shadow-sm">
                18.550<span className="text-base align-top ml-0.5 font-semibold">%</span>
              </div>
            </div>
            <p className="text-[13px] text-gray-600 font-medium text-center">After the rate is set, it will be fixed for the life of the loan</p>
          </div>
          <div className="flex-[1.4] space-y-6">
            <div>
              <h6 className="text-base font-bold text-gray-900 mb-2">Your Interest Rate (upon approval)</h6>
              <p className="text-[14px] leading-relaxed">
                The interest rate you pay will be determined after you apply. It will be based upon your credit history and other factors (cosigner credit, repayment option, etc). If approved, we will notify you of the rate you qualify for within the stated range.
              </p>
            </div>
            <div>
              <h6 className="text-base font-bold text-gray-900 mb-2">Your Interest Rate during the life of the loan</h6>
              <p className="font-bold text-gray-900 mb-2">Your rate is fixed.</p>
              <p className="text-[14px] leading-relaxed">
                This means that your rate will not increase or decrease for the life of the loan. For more information on this rate, see the reference notes.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h5 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Loan Cost Examples</h5>
          <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="bg-gray-100 text-gray-900">
                  <th className="border-b border-r border-gray-300 p-4 text-left font-bold w-[30%]">Repayment Option <br/><span className="font-normal text-[11px] text-gray-600">(while enrolled in school and during the separation period of 6 billing periods thereafter)</span></th>
                  <th className="border-b border-r border-gray-300 p-4 text-left font-bold">Amount Provided <br/><span className="font-normal text-[11px] text-gray-600">(amount provided directly to you or your school)</span></th>
                  <th className="border-b border-r border-gray-300 p-4 text-left font-bold">Interest Rate <br/><span className="font-normal text-[11px] text-gray-600">(highest possible starting rate)</span></th>
                  <th className="border-b border-r border-gray-300 p-4 text-left font-bold">Loan Term <br/><span className="font-normal text-[11px] text-gray-600">(how long you have to pay off the loan)</span></th>
                  <th className="border-b border-gray-300 p-4 text-left font-bold">Total Paid over life of loan <br/><span className="font-normal text-[11px] text-gray-600">(includes associated fees)</span></th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="border-r border-b border-gray-200 p-4">
                    <p className="font-bold text-gray-900 mb-1">1. INTEREST REPAYMENT</p>
                    <p className="text-gray-600 text-[12px] leading-relaxed">Make interest payments but defer payments on the principal amount while enrolled in school and during the separation period.</p>
                  </td>
                  <td className="border-r border-b border-gray-200 p-4 text-gray-900 font-medium">$10,000</td>
                  <td className="border-r border-b border-gray-200 p-4 text-gray-900 font-medium">18.550%</td>
                  <td className="border-r border-b border-gray-200 p-4 text-gray-600">15 years starting <span className="underline decoration-gray-400">after</span> the separation period</td>
                  <td className="border-b border-gray-200 p-4 font-bold text-gray-900 text-base">$37,059.53</td>
                </tr>
                <tr className="bg-gray-50/30 hover:bg-gray-50/60 transition-colors">
                  <td className="border-r border-b border-gray-200 p-4">
                    <p className="font-bold text-gray-900 mb-1">2. FIXED REPAYMENT</p>
                    <p className="text-gray-600 text-[12px] leading-relaxed">Make payments of $25 while enrolled in school and during the separation period. Interest will be charged and added to your loan.</p>
                  </td>
                  <td className="border-r border-b border-gray-200 p-4 text-gray-900 font-medium">$10,000</td>
                  <td className="border-r border-b border-gray-200 p-4 text-gray-900 font-medium">18.550%</td>
                  <td className="border-r border-b border-gray-200 p-4 text-gray-600">15 years starting <span className="underline decoration-gray-400">after</span> the separation period</td>
                  <td className="border-b border-gray-200 p-4 font-bold text-gray-900 text-base">$49,249.81</td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="border-r border-gray-200 p-4">
                    <p className="font-bold text-gray-900 mb-1">3. DEFERRED REPAYMENT</p>
                    <p className="text-gray-600 text-[12px] leading-relaxed">Make no payments while enrolled in school and during the separation period. Interest will be charged and added to your loan.</p>
                  </td>
                  <td className="border-r border-gray-200 p-4 text-gray-900 font-medium">$10,000</td>
                  <td className="border-r border-gray-200 p-4 text-gray-900 font-medium">18.550%</td>
                  <td className="border-r border-gray-200 p-4 text-gray-600">15 years starting <span className="underline decoration-gray-400">after</span> the separation period</td>
                  <td className="p-4 font-bold text-gray-900 text-base">$51,710.66</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Page 4 */}
      <div className="pt-16">
        <div className="mb-12">
          <h5 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-8">Federal Loan Alternatives</h5>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1">
              <table className="w-full border-collapse border border-gray-300 text-[13px]">
                <thead>
                  <tr className="bg-gray-100 text-gray-900">
                    <th className="border border-gray-300 p-4 text-left font-bold">Loan Program</th>
                    <th className="border border-gray-300 p-4 text-left font-bold">Current Interest Rates by Program Type*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-4">
                      <p className="font-bold text-gray-900 uppercase text-[11px] mb-1">DIRECT</p>
                      <p className="text-gray-600 italic">for Students</p>
                    </td>
                    <td className="border border-gray-300 p-4">
                      <p className="mb-2"><strong>6.390% fixed</strong> Undergraduate subsidized and unsubsidized</p>
                      <p><strong>7.940% fixed</strong> Graduate</p>
                    </td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="border border-gray-300 p-4">
                      <p className="font-bold text-gray-900 uppercase text-[11px] mb-1">DIRECT PLUS</p>
                      <p className="text-gray-600 italic">for Parents and Graduate/Professional Students</p>
                    </td>
                    <td className="border border-gray-300 p-4">
                      <p><strong>8.940% fixed</strong> Federal Direct Loan</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[11px] text-gray-500 mt-4 leading-relaxed italic">
                *These interest rates are determined by federal law and are for federal loans first disbursed on or after July 1, 2025, and before July 1, 2026. The federal loan interest rates may change in the future, but only for new federal loans.
              </p>
            </div>
            <div className="md:w-72 space-y-4">
              <h6 className="text-[15px] font-bold text-gray-900 leading-snug">You may qualify for Federal education loans.</h6>
              <p className="text-[13px] text-gray-700 leading-relaxed">
                For additional information, <strong>contact your school's financial aid office</strong> or the <strong>Department of Education at:</strong>
              </p>
              <p className="text-base font-bold text-secondary-blue hover:underline cursor-pointer">
                www.studentaid.gov
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h5 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-8">Next Steps</h5>
          <div className="space-y-8">
            <div className="flex gap-4">
              <span className="font-bold text-gray-900 text-lg">1.</span>
              <div>
                <h6 className="font-bold text-gray-900 text-[15px] mb-1">Find Out About Other Loan Options.</h6>
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  Some schools have school-specific student loan benefits and terms not detailed on this form. Contact your school's financial aid office or visit the Department of Education's web site at: <span className="font-medium">www.studentaid.gov</span> for more information about other loans.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-gray-900 text-lg">2.</span>
              <div>
                <h6 className="font-bold text-gray-900 text-[15px] mb-1">To Apply for this Loan, Complete the Application and the Self-Certification Form.</h6>
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  You may get the certification form from your school's financial aid office. If you are approved for this loan, the loan terms will be available for 30 days (terms will not change during this period, except as permitted by law).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="bg-gray-200 p-3 mb-6">
            <h5 className="text-[15px] font-bold text-gray-900 uppercase tracking-wider">Reference Notes</h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 px-2">
            <div>
              <h6 className="font-bold text-gray-900 text-[14px] mb-3">Fixed Interest Rate</h6>
              <ul className="space-y-4 text-[13px] text-gray-700">
                <li className="flex gap-3">
                  <span className="text-gray-400">•</span>
                  <span>This loan has a fixed interest rate, and will not increase or decrease for the life of the loan.</span>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-gray-900 text-[14px] mb-3">Cosigner</h6>
              <ul className="space-y-4 text-[13px] text-gray-700">
                <li className="flex gap-3">
                  <span className="text-gray-400">•</span>
                  <span>A cosigner is not required, but may help you qualify and/or receive a lower interest rate.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-400">•</span>
                  <span>Must be at least the age of majority in cosigner's state of residence at the time of loan application.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t-2 border-black space-y-6">
          <p className="text-[13px] text-gray-700 leading-relaxed">
            Military Lending Act Disclosure: To hear an oral disclosure of a statement of the Military Annual Percentage Rate and a clear description of the payment obligation, please call our toll-free number at 855-455-6972.
          </p>
          <div className="flex justify-between items-end pt-8">
            <p className="text-[11px] text-gray-400 uppercase">7SDA2506/Rev052026v01</p>
            <div className="text-right">
              <p className="text-[12px] font-bold text-gray-900">Page 4 of 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolicitationDisclosure;


