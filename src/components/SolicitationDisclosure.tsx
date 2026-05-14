'use client';

import React from 'react';

const SolicitationDisclosure = () => {
  return (
    <div className="p-8 text-[13px] text-gray-700 leading-relaxed overflow-y-auto max-h-[800px] font-sans">
      <div className="text-center mb-8">
        <h4 className="text-base font-bold text-gray-900">Private Education Loan Application and Solicitation Disclosure</h4>
        <p className="text-[11px] text-gray-500 mt-1">Page 1 of 4</p>
      </div>

      <div className="border-t-2 border-black pt-4 mb-6 flex justify-between items-start">
        <div>
          <h5 className="text-lg font-bold text-gray-900">Smart Option Student Loan</h5>
          <p className="text-sm font-medium">Variable Rate Type (see pages 3 & 4 for Fixed Rate Type)</p>
        </div>
        <div className="text-right text-[11px]">
          <p className="font-bold">Sallie Mae Bank</p>
          <p>P.O. Box 3319</p>
          <p>Wilmington, DE 19804</p>
          <p>(877) 279-7172</p>
        </div>
      </div>

      <h5 className="text-xl font-bold text-gray-900 mb-6">Loan Interest Rate & Fees</h5>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="bg-gray-100 p-6 rounded-sm flex-1 border border-gray-200">
          <p className="text-sm mb-4">Your <strong>starting interest rate</strong> will be between</p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="bg-white border border-gray-300 px-6 py-3 text-2xl font-bold">
              4.000<span className="text-sm align-top ml-0.5">%</span>
            </div>
            <span className="font-medium text-gray-500">and</span>
            <div className="bg-white border border-gray-300 px-6 py-3 text-2xl font-bold">
              17.420<span className="text-sm align-top ml-0.5">%</span>
            </div>
          </div>
          <p className="text-xs text-gray-600">After the starting rate is set, your rate will then vary with the market</p>
        </div>
        <div className="flex-[1.5]">
          <h6 className="font-bold text-gray-900 mb-2">Your Starting Interest Rate (upon approval)</h6>
          <p className="mb-4">
            The starting interest rate you pay will be determined after you apply. It will be based upon your credit history and other factors (cosigner credit, repayment option, etc). If approved, we will notify you of the rate you qualify for within the stated range.
          </p>
          <h6 className="font-bold text-gray-900 mb-2">Your Interest Rate during the life of the loan</h6>
          <p className="font-bold mb-2">Your rate is variable.</p>
          <p className="mb-4">
            This means that your rate could move lower or higher than the rates on this form. The variable rate is based upon the 30-day average Secured Overnight Financing Rate (SOFR) (as published by the Federal Reserve Bank of New York). For more information on this rate, see the reference notes.
          </p>
          <div className="bg-gray-50 border-l-4 border-gray-300 p-3 italic">
            Although the rate will vary after you are approved, it will <span className="underline font-bold">never exceed 25.000%</span> (the maximum allowable for this loan).
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h5 className="text-lg font-bold text-gray-900 mb-2">Loan Fees</h5>
        <p className="mb-4">
          <strong>Application Fee:</strong> $0.00. <strong>Origination Fee:</strong> The fees that we charge to make this loan range from 0.000% to 0.000% of total loan amount. <strong>Loan Guarantee Fee:</strong> 0.000% to 0.000% of total loan amount. <strong>Repayment Fee:</strong> The fees we charge when you begin repayment range from 0.000% to 0.000% of the total loan amount. <strong>Late Fee:</strong> 5.000% of the amount of the past due payment, up to a maximum of $25. <strong>Returned Check Fee:</strong> up to $20.00.
        </p>
      </div>

      <div className="mb-10">
        <h5 className="text-lg font-bold text-gray-900 mb-2">Loan Cost Examples</h5>
        <p className="mb-4">
          The total amount you will pay for this loan will vary depending upon when you start to repay it. This example provides estimates based upon three (3) different repayment options available to you while enrolled in school.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left w-1/3">Repayment Option <br/><span className="font-normal">(while enrolled in school and during the separation period of 6 billing periods thereafter)</span></th>
                <th className="border border-gray-300 p-3 text-left">Amount Provided <br/><span className="font-normal">(amount provided directly to you or your school)</span></th>
                <th className="border border-gray-300 p-3 text-left">Interest Rate <br/><span className="font-normal">(highest possible starting rate)</span></th>
                <th className="border border-gray-300 p-3 text-left">Loan Term <br/><span className="font-normal">(how long you have to pay off the loan)</span></th>
                <th className="border border-gray-300 p-3 text-left">Total Paid over life of loan <br/><span className="font-normal">(includes associated fees)</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3">
                  <p className="font-bold">1. INTEREST REPAYMENT</p>
                  <p>Make interest payments but defer payments on the principal amount while enrolled in school and during the separation period.</p>
                </td>
                <td className="border border-gray-300 p-3">$10,000</td>
                <td className="border border-gray-300 p-3">17.420%</td>
                <td className="border border-gray-300 p-3">15 years starting <span className="underline">after</span> the separation period</td>
                <td className="border border-gray-300 p-3 font-bold">$35,203.61</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3">
                  <p className="font-bold">2. FIXED REPAYMENT</p>
                  <p>Make payments of $25 while enrolled in school and during the separation period. Interest will be charged and added to your loan.</p>
                </td>
                <td className="border border-gray-300 p-3">$10,000</td>
                <td className="border border-gray-300 p-3">17.420%</td>
                <td className="border border-gray-300 p-3">15 years starting <span className="underline">after</span> the separation period</td>
                <td className="border border-gray-300 p-3 font-bold">$45,686.02</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">
                  <p className="font-bold">3. DEFERRED REPAYMENT</p>
                  <p>Make no payments while enrolled in school and during the separation period. Interest will be charged and added to your loan.</p>
                </td>
                <td className="border border-gray-300 p-3">$10,000</td>
                <td className="border border-gray-300 p-3">17.420%</td>
                <td className="border border-gray-300 p-3">15 years starting <span className="underline">after</span> the separation period</td>
                <td className="border border-gray-300 p-3 font-bold">$47,970.03</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-[11px] text-gray-600 italic border-l-2 border-gray-200 pl-4">
          <p className="font-bold mb-1">About this example</p>
          <p>
            The repayment example assumes that the borrower remains in school for 4 years and has a 6-month separation period before beginning repayment. It is based on the <strong>highest starting rate currently charged</strong>, associated fees, and the maximum loan term. The loan term, also referred to as the term of the loan, is the period during which regularly scheduled payments of principal and interest will be due. The length of the loan term can range from 10 to 15 years, depending on the loan amount requested and the borrower’s total outstanding Sallie Mae-serviced loan balance. The loan term may be shorter if it is subject to a minimum monthly payment amount of $50.
          </p>
        </div>
      </div>

      <div className="text-center py-4 border-y border-gray-200 mb-10">
        <p className="font-bold tracking-widest text-[11px]">SEE BACK OF PAGE</p>
        <p className="text-[10px] text-gray-400 mt-1">7SDA2506/Rev052026v01</p>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-end border-b-2 border-black pb-2 mb-6">
          <h5 className="text-xl font-bold text-gray-900">Federal Loan Alternatives</h5>
          <p className="text-[11px] text-gray-500">Page 2 of 4</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left">Loan Program</th>
                  <th className="border border-gray-300 p-3 text-left">Current Interest Rates by Program Type*</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 font-bold">DIRECT <br/><span className="font-normal text-[10px]">for Students</span></td>
                  <td className="border border-gray-300 p-3">
                    <p className="mb-2"><strong>6.390% fixed</strong> Undergraduate subsidized and unsubsidized</p>
                    <p><strong>7.940% fixed</strong> Graduate</p>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-bold">DIRECT PLUS <br/><span className="font-normal text-[10px]">for Parents and Graduate/Professional Students</span></td>
                  <td className="border border-gray-300 p-3">
                    <p><strong>8.940% fixed</strong> Federal Direct Loan</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-[10px] text-gray-500 mt-3 leading-tight italic">
              *These interest rates are determined by federal law and are for federal loans first disbursed on or after July 1, 2025, and before July 1, 2026. The federal loan interest rates may change in the future, but only for new federal loans.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-md border border-blue-100 flex-none md:w-64">
            <h6 className="text-sm font-bold text-gray-900 mb-3 leading-tight">You may qualify for Federal education loans.</h6>
            <p className="text-xs mb-4">
              For additional information, <strong>contact your school's financial aid office</strong> or the <strong>Department of Education at:</strong>
            </p>
            <p className="text-sm font-bold text-secondary-blue border-b border-secondary-blue pb-1 w-fit">
              www.studentaid.gov
            </p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h5 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-2 mb-6">Next Steps</h5>
        <ol className="list-decimal ml-6 space-y-6">
          <li className="pl-2">
            <p className="font-bold text-gray-900 mb-1">Find Out About Other Loan Options.</p>
            <p className="text-gray-600">
              Some schools have school-specific student loan benefits and terms not detailed on this form. Contact your school's financial aid office or visit the Department of Education's web site at: www.studentaid.gov for more information about other loans.
            </p>
          </li>
          <li className="pl-2">
            <p className="font-bold text-gray-900 mb-1">To Apply for this Loan, Complete the Application and the Self-Certification Form.</p>
            <p className="text-gray-600">
              You may get the certification form from your school's financial aid office. If you are approved for this loan, the loan terms will be available for 30 days (terms will not change during this period, except as permitted by law and the variable interest rate may change based on the market).
            </p>
          </li>
        </ol>
      </div>

      <div className="bg-gray-100 p-8 rounded-sm">
        <h5 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-2 mb-6">Reference Notes</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-xs text-gray-600">
          <div>
            <h6 className="font-bold text-gray-900 mb-3">Variable Interest Rate</h6>
            <ul className="list-disc ml-5 space-y-3">
              <li>This loan has a variable interest rate, that is based on a publicly available index, the 30-day average Secured Overnight Financing Rate (SOFR) rounded up to the nearest one-eighth of one percent. Your rate will be calculated each month by adding a margin between 0.250% and 13.670% to the SOFR rounded up to the nearest one-eighth of one percent.</li>
              <li>The rate will not increase more than once a month, but there is no limit on the amount that the rate could increase at one time.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-gray-900 mb-3">Cosigner</h6>
            <ul className="list-disc ml-5 space-y-3">
              <li>A cosigner is not required, but may help you qualify and/or receive a lower interest rate.</li>
              <li>Must be at least the age of majority in the cosigner's state of residence at the time of loan application.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-gray-900 mb-3">Eligibility Criteria <br/><span className="font-normal italic">Borrower</span></h6>
            <ul className="list-disc ml-5 space-y-3">
              <li>For full-time, half-time, or less-than-half-time enrollment at an eligible school.</li>
              <li>Must be at least the age of majority in your state of residence at the time you apply. Otherwise a cosigner is needed.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-gray-900 mb-3">Bankruptcy Limitations</h6>
            <ul className="list-disc ml-5 space-y-3">
              <li>If you file for bankruptcy you may still be required to pay back this loan.</li>
            </ul>
            <p className="mt-4 font-bold text-gray-900 leading-tight">
              More information about loan eligibility and repayment deferral or forbearance options is available in your loan application and promissory note.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-y border-gray-200 mb-10">
        <p className="font-bold tracking-widest text-[11px]">SEE BACK OF PAGE</p>
        <p className="text-[10px] text-gray-400 mt-1">7SDA2506/Rev052026v01</p>
      </div>

      {/* Page 3: Fixed Rate Type */}
      <div className="mb-10 pt-10 border-t-4 border-double border-gray-300">
        <div className="text-center mb-8">
          <h4 className="text-base font-bold text-gray-900">Private Education Loan Application and Solicitation Disclosure</h4>
          <p className="text-[11px] text-gray-500 mt-1">Page 3 of 4</p>
        </div>

        <div className="border-t-2 border-black pt-4 mb-6 flex justify-between items-start">
          <div>
            <h5 className="text-lg font-bold text-gray-900">Smart Option Student Loan</h5>
            <p className="text-sm font-medium">Fixed Rate Type (see pages 1 & 2 for Variable Rate Type)</p>
          </div>
          <div className="text-right text-[11px]">
            <p className="font-bold">Sallie Mae Bank</p>
            <p>P.O. Box 3319</p>
            <p>Wilmington, DE 19804</p>
            <p>(877) 279-7172</p>
          </div>
        </div>

        <h5 className="text-xl font-bold text-gray-900 mb-6">Loan Interest Rate & Fees</h5>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="bg-gray-100 p-6 rounded-sm flex-1 border border-gray-200">
            <p className="text-sm mb-4">Your <strong>interest rate</strong> will be between</p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="bg-white border border-gray-300 px-6 py-3 text-2xl font-bold">
                3.200<span className="text-sm align-top ml-0.5">%</span>
              </div>
              <span className="font-medium text-gray-500">and</span>
              <div className="bg-white border border-gray-300 px-6 py-3 text-2xl font-bold">
                18.550<span className="text-sm align-top ml-0.5">%</span>
              </div>
            </div>
            <p className="text-xs text-gray-600">After the rate is set, it will be fixed for the life of the loan</p>
          </div>
          <div className="flex-[1.5]">
            <h6 className="font-bold text-gray-900 mb-2">Your Interest Rate (upon approval)</h6>
            <p className="mb-4">
              The interest rate you pay will be determined after you apply. It will be based upon your credit history and other factors (cosigner credit, repayment option, etc). If approved, we will notify you of the rate you qualify for within the stated range.
            </p>
            <h6 className="font-bold text-gray-900 mb-2">Your Interest Rate during the life of the loan</h6>
            <p className="font-bold mb-2">Your rate is fixed.</p>
            <p className="mb-4">
              This means that your rate will not increase or decrease for the life of the loan. For more information on this rate, see the reference notes.
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h5 className="text-lg font-bold text-gray-900 mb-2">Loan Cost Examples</h5>
          <p className="mb-4">
            The total amount you will pay for this loan will vary depending upon when you start to repay it. This example provides estimates based upon three (3) different repayment options available to you while enrolled in school.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left w-1/3">Repayment Option <br/><span className="font-normal">(while enrolled in school and during the separation period of 6 billing periods thereafter)</span></th>
                  <th className="border border-gray-300 p-3 text-left">Amount Provided <br/><span className="font-normal">(amount provided directly to you or your school)</span></th>
                  <th className="border border-gray-300 p-3 text-left">Interest Rate <br/><span className="font-normal">(highest possible starting rate)</span></th>
                  <th className="border border-gray-300 p-3 text-left">Loan Term <br/><span className="font-normal">(how long you have to pay off the loan)</span></th>
                  <th className="border border-gray-300 p-3 text-left">Total Paid over life of loan <br/><span className="font-normal">(includes associated fees)</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3">
                    <p className="font-bold">1. INTEREST REPAYMENT</p>
                    <p>Make interest payments but defer payments on the principal amount while enrolled in school and during the separation period.</p>
                  </td>
                  <td className="border border-gray-300 p-3">$10,000</td>
                  <td className="border border-gray-300 p-3">18.550%</td>
                  <td className="border border-gray-300 p-3">15 years starting <span className="underline">after</span> the separation period</td>
                  <td className="border border-gray-300 p-3 font-bold">$37,059.53</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">
                    <p className="font-bold">2. FIXED REPAYMENT</p>
                    <p>Make payments of $25 while enrolled in school and during the separation period. Interest will be charged and added to your loan.</p>
                  </td>
                  <td className="border border-gray-300 p-3">$10,000</td>
                  <td className="border border-gray-300 p-3">18.550%</td>
                  <td className="border border-gray-300 p-3">15 years starting <span className="underline">after</span> the separation period</td>
                  <td className="border border-gray-300 p-3 font-bold">$49,249.81</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">
                    <p className="font-bold">3. DEFERRED REPAYMENT</p>
                    <p>Make no payments while enrolled in school and during the separation period. Interest will be charged and added to your loan.</p>
                  </td>
                  <td className="border border-gray-300 p-3">$10,000</td>
                  <td className="border border-gray-300 p-3">18.550%</td>
                  <td className="border border-gray-300 p-3">15 years starting <span className="underline">after</span> the separation period</td>
                  <td className="border border-gray-300 p-3 font-bold">$51,710.66</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Page 4: Reference Notes for Fixed Rate */}
      <div className="mb-10">
        <div className="flex justify-between items-end border-b-2 border-black pb-2 mb-6">
          <h5 className="text-xl font-bold text-gray-900">Federal Loan Alternatives</h5>
          <p className="text-[11px] text-gray-500">Page 4 of 4</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="flex-1">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left">Loan Program</th>
                  <th className="border border-gray-300 p-3 text-left">Current Interest Rates by Program Type*</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 font-bold">DIRECT <br/><span className="font-normal text-[10px]">for Students</span></td>
                  <td className="border border-gray-300 p-3">
                    <p className="mb-2"><strong>6.390% fixed</strong> Undergraduate subsidized and unsubsidized</p>
                    <p><strong>7.940% fixed</strong> Graduate</p>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-bold">DIRECT PLUS <br/><span className="font-normal text-[10px]">for Parents and Graduate/Professional Students</span></td>
                  <td className="border border-gray-300 p-3">
                    <p><strong>8.940% fixed</strong> Federal Direct Loan</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-[10px] text-gray-500 mt-3 leading-tight italic">
              *These interest rates are determined by federal law and are for federal loans first disbursed on or after July 1, 2025, and before July 1, 2026. The federal loan interest rates may change in the future, but only for new federal loans.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-md border border-blue-100 flex-none md:w-64">
            <h6 className="text-sm font-bold text-gray-900 mb-3 leading-tight">You may qualify for Federal education loans.</h6>
            <p className="text-xs mb-4">
              For additional information, <strong>contact your school's financial aid office</strong> or the <strong>Department of Education at:</strong>
            </p>
            <p className="text-sm font-bold text-secondary-blue border-b border-secondary-blue pb-1 w-fit">
              www.studentaid.gov
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h5 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-2 mb-6">Next Steps</h5>
          <ol className="list-decimal ml-6 space-y-6">
            <li className="pl-2">
              <p className="font-bold text-gray-900 mb-1">Find Out About Other Loan Options.</p>
              <p className="text-gray-600">
                Some schools have school-specific student loan benefits and terms not detailed on this form. Contact your school's financial aid office or visit the Department of Education's web site at: www.studentaid.gov for more information about other loans.
              </p>
            </li>
            <li className="pl-2">
              <p className="font-bold text-gray-900 mb-1">To Apply for this Loan, Complete the Application and the Self-Certification Form.</p>
              <p className="text-gray-600">
                You may get the certification form from your school's financial aid office. If you are approved for this loan, the loan terms will be available for 30 days (terms will not change during this period, except as permitted by law).
              </p>
            </li>
          </ol>
        </div>

        <div className="bg-gray-100 p-8 rounded-sm">
          <h5 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-2 mb-6">Reference Notes</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-xs text-gray-600">
            <div>
              <h6 className="font-bold text-gray-900 mb-3">Fixed Interest Rate</h6>
              <ul className="list-disc ml-5 space-y-3">
                <li>This loan has a fixed interest rate, and will not increase or decrease for the life of the loan.</li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-gray-900 mb-3">Cosigner</h6>
              <ul className="list-disc ml-5 space-y-3">
                <li>A cosigner is not required, but may help you qualify and/or receive a lower interest rate.</li>
                <li>Must be at least the age of majority in cosigner's state of residence at the time of loan application.</li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-gray-900 mb-3">Eligibility Criteria <br/><span className="font-normal italic">Borrower</span></h6>
              <ul className="list-disc ml-5 space-y-3">
                <li>For full-time, half-time, or less-than-half-time enrollment at an eligible school.</li>
                <li>Must be at least the age of majority in your state of residence at the time you apply. Otherwise a cosigner is needed.</li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-gray-900 mb-3">Bankruptcy Limitations</h6>
              <ul className="list-disc ml-5 space-y-3">
                <li>If you file for bankruptcy you may still be required to pay back this loan.</li>
              </ul>
              <p className="mt-4 font-bold text-gray-900 leading-tight">
                More information about loan eligibility and repayment deferral or forbearance options is available in your loan application and promissory note.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-10 border-t border-gray-200">
          <p className="text-[11px] text-gray-500 italic">
            Military Lending Act Disclosure: To hear an oral disclosure of a statement of the Military Annual Percentage Rate and a clear description of the payment obligation, please call our toll-free number at 855-455-6972.
          </p>
          <p className="text-right text-[10px] text-gray-400 mt-4">7SDA2506/Rev052026v01</p>
        </div>
      </div>
    </div>
  );
};

export default SolicitationDisclosure;

