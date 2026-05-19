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
  // 6 steps means 6 columns. The center of each column is spaced at 16.66% increments.
  // The first circle center is at 8.33% (half of 16.66%).
  // The last circle center is at 91.67% (100% - 8.33%).
  // The total track span is 83.34% (91.67% - 8.33%).
  const activePercentage = (currentStep / (steps.length - 1)) * 100;
  const activeWidth = activePercentage * 0.8334;

  return (
    <nav className="flex items-center w-full max-w-[850px] mx-auto py-2 relative">
      {/* 100% Continuous Grey Background Track */}
      <div 
        className="absolute top-[16px] h-[3px] bg-[#e5e7eb] rounded-full z-0" 
        style={{ left: '8.33%', right: '8.33%' }}
      />

      {/* 100% Continuous Active Blue Track */}
      <div 
        className="absolute top-[16px] h-[3px] bg-[#004b87] rounded-full z-0 transition-all duration-500 ease-in-out" 
        style={{ 
          left: '8.33%', 
          width: `${activeWidth}%`
        }}
      />

      <div className="flex items-center justify-between w-full relative z-10">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isFuture = index > currentStep;

          return (
            <div 
              key={step} 
              className="flex flex-col items-center flex-1 relative"
            >
              {/* Indicator (Circle) with white backgrounds to cover the continuous track underneath */}
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
                  hidden sm:block
                  text-[10px] sm:text-[11px] md:text-[12px] mt-2 whitespace-nowrap sm:whitespace-normal md:whitespace-nowrap text-center transition-colors duration-300
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
