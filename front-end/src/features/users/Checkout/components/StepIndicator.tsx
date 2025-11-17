import { MapPin, Package, CreditCard, Check, } from 'lucide-react';

// StepIndicator Component - Similar to StatusTracker
const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { num: 1, label: "Address", icon: MapPin },
    { num: 2, label: "Review", icon: Package },
    { num: 3, label: "Payment", icon: CreditCard },
  ];

 return (
    <div className="mb-8 px-4">
      <style>{`
        @keyframes pulse-step {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 0 8px rgba(37, 99, 235, 0);
          }
        }
        .pulse-active {
          animation: pulse-step 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="relative max-w-2xl mx-auto">
        {/* Steps */}
        <div className="relative flex justify-between items-start">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            const StepIcon = step.icon;

            return (
              <div key={step.num} className="flex flex-col items-center relative" style={{ flex: 1 }}>
                {/* Icon circle */}
                <div
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : isCurrent
                      ? 'bg-white border-blue-600 text-blue-600 pulse-active'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <StepIcon className="w-5 h-5" />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`mt-2 text-sm font-medium ${
                    isCompleted || isCurrent ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>

                {/* Connecting line to next step */}
                {index < steps.length - 1 && (
                  <div 
                    className="absolute top-5 left-1/2 h-0.5 transition-all duration-500"
                    style={{ 
                      width: 'calc(100% + ((100vw - 100%) / 6))',
                      maxWidth: '100%',
                      zIndex: 0
                    }}
                  >
                    <div className={`h-full ${isCompleted ? 'bg-blue-600' : 'bg-gray-200'}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;