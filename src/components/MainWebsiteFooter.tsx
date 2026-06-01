'use client';

import React from 'react';
import Link from 'next/link';

const MainWebsiteFooter = () => {
  return (
    <footer className="w-full bg-[#f3f6f9] text-[#13325b] py-12 mt-auto border-t border-gray-200 select-none">
      <div className="max-w-[1250px] mx-auto px-6 lg:px-8">
        
        {/* Sitemap Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: About Us */}
          <div className="space-y-4">
            <h4 className="text-[15px] font-bold text-[#13325b] uppercase tracking-wider">About Us</h4>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">About Us</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">Careers</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">For Investors</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">For Media</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">Sallie</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">Leading Research</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Scholarships & Blog */}
          <div className="space-y-4">
            <h4 className="text-[15px] font-bold text-[#13325b] uppercase tracking-wider">Scholarships</h4>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">$2,000 No Essay Scholarship by Sallie</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">$5,000 Grad School No Essay Scholarship</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">Scholly Scholarships by Sallie</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">Scholly Easy Apply Scholarships</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">Bridging the Dream Scholarship</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Partner Resources */}
          <div className="space-y-4">
            <h4 className="text-[15px] font-bold text-[#13325b] uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">Cosigner Responsibilities</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">Become a School Partner</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">Partner Resources</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">Military Resources</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">Beware of Debt Relief Offers</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Help & Site Info */}
          <div className="space-y-4">
            <h4 className="text-[15px] font-bold text-[#13325b] uppercase tracking-wider">Help & Info</h4>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700 font-bold">Contact Us</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700 font-bold">Website feedback</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">FAQ</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700 font-bold">Benefits Transparency</Link>
              </li>
              <li>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0084c9] transition-colors font-medium text-gray-700">Sitemap</Link>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Footer Bottom Area (Socials, Legal & Badges) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          
          {/* Social Icons & Secondary Links */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {/* Facebook */}
              <Link href="#" onClick={(e) => e.preventDefault()} className="text-gray-500 hover:text-[#0084c9] transition-colors" aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </Link>
              {/* Twitter/X */}
              <Link href="#" onClick={(e) => e.preventDefault()} className="text-gray-500 hover:text-[#0084c9] transition-colors" aria-label="Twitter">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              {/* LinkedIn */}
              <Link href="#" onClick={(e) => e.preventDefault()} className="text-gray-500 hover:text-[#0084c9] transition-colors" aria-label="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
              {/* Instagram */}
              <Link href="#" onClick={(e) => e.preventDefault()} className="text-gray-500 hover:text-[#0084c9] transition-colors" aria-label="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              {/* YouTube */}
              <Link href="#" onClick={(e) => e.preventDefault()} className="text-gray-500 hover:text-[#0084c9] transition-colors" aria-label="YouTube">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11C4.482 20.5 12 20.5 12 20.5s7.518 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
            </div>
            
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13.5px] font-bold text-[#004b87]">
                <Link href="/terms-of-use" className="hover:underline">Terms of Use</Link>
                <span className="text-gray-300 font-light">|</span>
                <Link href="/privacy-policy" className="hover:underline">Protect Your Privacy</Link>
                <span className="text-gray-300 font-light">|</span>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Avoid Online Fraud</Link>
                <span className="text-gray-300 font-light">|</span>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Accessibility Statement</Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13.5px] font-bold text-[#004b87]">
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Do Not Sell or Share My Personal Information</Link>
                <span className="text-gray-300 font-light">|</span>
                <Link href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Cookie Preferences</Link>
              </div>
            </div>
          </div>

          {/* Badges (BBB and Equal Housing) */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Equal Housing Lender */}
            <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white text-gray-500 text-[11px] font-bold select-none h-11">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="12" y1="3" x2="12" y2="21" />
                <path d="M7 8l5 4-5 4" />
                <path d="M17 8l-5 4 5 4" />
              </svg>
              <span>EQUAL HOUSING LENDER</span>
            </div>

            {/* BBB Accredited Business */}
            <div className="flex items-center gap-1.5 border border-[#005cc8]/30 rounded px-3 py-1 bg-white text-[#005cc8] font-bold select-none h-11">
              <span className="text-[15px] tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>BBB</span>
              <div className="h-6 w-[1.5px] bg-[#005cc8]/20 mx-1"></div>
              <div className="flex flex-col text-[8.5px] leading-tight text-gray-500">
                <span className="font-extrabold text-[#005cc8]">ACCREDITED</span>
                <span>BUSINESS</span>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer / SLM Corp Paragraph */}
        <div className="text-[12.5px] text-gray-500 leading-relaxed space-y-3.5 pt-6 border-t border-gray-200">
          <p>
            Sallie Mae Bank Online Loan Application &copy; 2026 Sallie Mae Bank. All rights reserved.
          </p>
          <p>
            Sallie Mae, the Sallie Mae logo, and other Sallie Mae names and logos are service marks or registered service marks of Sallie Mae Bank. All other names and logos are the property of their respective owners.
          </p>
          <p>
            SLM Corporation and its subsidiaries, including Sallie Mae Bank, are not sponsored by or agencies of the United States of America.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default MainWebsiteFooter;
