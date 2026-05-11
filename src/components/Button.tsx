"use client";

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  type = 'button',
  disabled,
  loading
}) => {
  const baseStyles = "px-8 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 relative min-h-[48px]";
  
  const variants = {
    primary: "bg-primary-blue text-white hover:bg-secondary-blue shadow-lg hover:shadow-xl active:scale-95 disabled:bg-gray-400 disabled:shadow-none",
    secondary: "bg-white text-primary-blue border-2 border-primary-blue hover:bg-gray-50 active:scale-95 disabled:border-gray-300 disabled:text-gray-400",
    outline: "bg-transparent text-primary-blue border-2 border-primary-blue hover:bg-primary-blue hover:text-white"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
