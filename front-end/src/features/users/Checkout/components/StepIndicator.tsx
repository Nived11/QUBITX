// src/features/checkout/components/StepIndicator.tsx
import { MapPin, Package, CreditCard, ChevronRight, Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
}

 const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const steps = [
    { num: 1, label: "Address", icon: MapPin },
    { num: 2, label: "Review", icon: Package },
    { num: 3, label: "Payment", icon: CreditCard },
  ];

  return (
    <div className="flex items-center justify-center mb-8 px-4">
      <div className="flex items-center gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          
          return (
            <div key={step.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold transition ${
                    currentStep >= step.num
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step.num ? (
                    <Check size={20} />
                  ) : (
                    <StepIcon size={20} />
                  )}
                </div>
                <span
                  className={`text-xs sm:text-sm mt-2 font-medium ${
                    currentStep >= step.num ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < 2 && (
                <ChevronRight
                  className={`hidden sm:block mx-2 ${
                    currentStep > step.num ? "text-blue-600" : "text-gray-300"
                  }`}
                  size={24}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;