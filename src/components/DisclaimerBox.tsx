"use client";

import React from 'react';

interface DisclaimerBoxProps {
  children: React.ReactNode;
  className?: string;
  hasArrow?: boolean;
}

const DisclaimerBox: React.FC<DisclaimerBoxProps> = ({ children, className = '', hasArrow = false }) => {
  return (
    <div className={`relative bg-[#EEF4F7] p-6 rounded text-xs text-gray-700 leading-relaxed font-medium ${className}`}>
      {hasArrow && (
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-[#EEF4F7] border-b-[8px] border-b-transparent" />
      )}
      {children}
    </div>
  );
};

export default DisclaimerBox;
