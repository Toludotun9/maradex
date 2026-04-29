'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = ''
}) => {
  const baseStyles = "px-10 py-3 rounded-full font-bold text-base transition-all duration-300 inline-flex items-center justify-center cursor-pointer border-none";
  const variants = {
    primary: "bg-primary-blue text-white hover:bg-secondary-blue hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-blue/20",
    secondary: "bg-white text-primary-blue border-2 border-primary-blue hover:bg-bg-light-blue"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
