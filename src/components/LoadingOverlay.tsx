'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';

export default function LoadingOverlay() {
  const { isPageTransitioning } = useAppContext();

  if (!isPageTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/85 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
      <div className="flex flex-col items-center gap-4">
        {/* Sleek rotating gradient spinner */}
        <div className="relative w-24 h-24">
          <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="spinner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00A3E0" />
                <stop offset="50%" stopColor="#00E5C9" />
                <stop offset="100%" stopColor="#004B8D" />
              </linearGradient>
            </defs>
            {/* Faint track background */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#E2E8F0"
              strokeWidth="7"
              fill="transparent"
              className="opacity-20"
            />
            {/* The rotating gradient path */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#spinner-grad)"
              strokeWidth="7"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray="251.2"
              strokeDashoffset="65"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
