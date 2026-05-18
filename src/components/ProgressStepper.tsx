import React from 'react';

const steps = [
  'Personal info',
  'Loan info',
  'Add cosigner',
  'Finalize',
  'Submit',
  'Results'
];

interface ProgressStepperProps {
  currentStep?: number;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep = 0 }) => {
  return (
    <nav className="flex items-center w-full max-w-[850px] mx-auto py-2">
      <div className="flex items-center justify-between w-full relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isFuture = index > currentStep;

          return (
            <div 
              key={step} 
              className="flex flex-col items-center flex-1 relative group"
            >
              {/* Left Connector Line */}
              {index > 0 && (
                <div 
                  className={`
                    absolute top-[8px] right-1/2 w-1/2 h-[3px] -z-0 transition-colors duration-300
                    ${index <= currentStep ? 'bg-[#004b87]' : 'bg-[#e5e7eb]'}
                  `}
                />
              )}

              {/* Right Connector Line */}
              {index < steps.length - 1 && (
                <div 
                  className={`
                    absolute top-[8px] left-1/2 w-1/2 h-[3px] -z-0 transition-colors duration-300
                    ${index < currentStep ? 'bg-[#004b87]' : 'bg-[#e5e7eb]'}
                  `}
                />
              )}

              {/* Indicator (Circle) */}
              <div 
                className={`
                  rounded-full flex items-center justify-center transition-all duration-300 z-10
                  ${isCompleted ? 'w-4 h-4 bg-[#004b87]' : ''}
                  ${isCurrent ? 'w-5 h-5 bg-white border-[4px] border-[#0084c9]' : ''}
                  ${isFuture ? 'w-4 h-4 bg-white border-[2px] border-gray-200' : ''}
                `}
                style={isCurrent ? { transform: 'translateY(-2px)' } : undefined}
              />
              
              {/* Label */}
              <span 
                className={`
                  text-[12px] mt-2 whitespace-nowrap transition-colors duration-300
                  ${isCompleted ? 'text-[#004b87] font-medium' : ''}
                  ${isCurrent ? 'text-[#0084c9] font-bold' : ''}
                  ${isFuture ? 'text-gray-400 font-medium' : ''}
                `}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default ProgressStepper;
