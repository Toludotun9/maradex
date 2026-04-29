import React from 'react';

const steps = [
  'Personal Info',
  'Loan info',
  'Add cosigner',
  'Finalize',
  'Submit',
  'Results'
];

const ProgressStepper = ({ currentStep = 0 }) => {
  return (
    <nav className="hidden md:flex items-center gap-0 flex-1 justify-center max-w-[800px]">
      {steps.map((step, index) => (
        <div 
          key={step} 
          className="flex flex-col items-center relative flex-1 group"
        >
          {/* Indicator */}
          <div className={`
            w-3.5 h-3.5 rounded-full border-2 mb-2 z-10 flex items-center justify-center transition-all duration-300
            ${index === currentStep ? 'border-accent-blue bg-white shadow-[0_0_0_4px_rgba(0,163,224,0.2)]' : ''}
            ${index < currentStep ? 'border-accent-blue bg-accent-blue' : 'border-gray-300 bg-white'}
          `}>
            {index < currentStep && (
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          
          {/* Label */}
          <span className={`text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap ${index === currentStep ? 'text-secondary-blue font-bold' : 'text-gray-500'}`}>
            {step}
          </span>
          
          {/* Line */}
          {index < steps.length - 1 && (
            <div className={`absolute top-[7px] left-1/2 w-full h-[1px] -z-0 ${index < currentStep ? 'bg-accent-blue' : 'bg-gray-300'}`} />
          )}
        </div>
      ))}
    </nav>
  );
};

export default ProgressStepper;
