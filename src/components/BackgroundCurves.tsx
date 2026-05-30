'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const BackgroundCurves = () => {
  const pathname = usePathname();
  const isInfoPage = pathname === '/terms-of-use' || pathname === '/privacy-policy';

  if (isInfoPage) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Large Top Left Curve */}
      <svg
        className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] opacity-[0.4] text-blue-100"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="0" cy="0" r="100" />
      </svg>

      {/* Large Bottom Right Curve */}
      <svg
        className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] opacity-[0.3] text-blue-50"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="100" cy="100" r="100" />
      </svg>

      {/* Subtle S-Curve Overlay */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-[0.05] text-accent-blue"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeWidth="200"
      >
        <path d="M-100,200 C300,100 700,900 1100,800" />
      </svg>
    </div>
  );
};

export default BackgroundCurves;
