// src/features/orders/components/StatusTracker.tsx
import { Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import type { Order } from '@/types/order';
import { useOrders } from '../hooks/useOrders';

interface StatusTrackerProps {
  status: Order['orderStatus'];
}

const StatusTracker = ({ status }: StatusTrackerProps) => {
  const { getStatusStep } = useOrders();

  if (status === 'cancelled') {
    return (
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-600" />
          <span className="text-sm font-semibold text-red-700">Order Cancelled</span>
        </div>
      </div>
    );
  }

  const currentStep = getStatusStep(status);

  const steps = [
    { num: 1, label: 'Pending', icon: Package },
    { num: 2, label: 'Confirmed', icon: CheckCircle },
    { num: 3, label: 'Shipped', icon: Truck },
    { num: 4, label: 'Delivered', icon: CheckCircle }
  ];

  return (
    <div className="mb-6 ml-[10%]">
      <style>{`
        @keyframes blink-animation {
          0%, 100% { 
            background-color: rgb(37, 99, 235);
            border-color: rgb(37, 99, 235);
          }
          50% { 
            background-color: rgb(147, 197, 253);
            border-color: rgb(147, 197, 253);
          }
        }
        .blink {
          animation: blink-animation 1.5s ease-in-out infinite;
        }
      `}</style>
      
      <div className="relative">
        {/* The main horizontal baseline (behind icons) */}
        <div className="absolute left-0 right-0 top-6 h-px bg-gray-300 -z-10" />

        {/* Steps row */}
        <div className="flex items-center gap-0">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            const isShippedAndCurrent = isCurrent && step.label === 'Shipped';
            const isDeliveredAndCurrent = isCurrent && step.label === 'Delivered';
            const StepIcon = step.icon;

            return (
              <div key={step.num} className="flex items-center w-full">
                {/* Icon container */}
                <div className="flex flex-col items-center w-1/4">
                  <div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                      ${
                        isCompleted
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : isCurrent && !isShippedAndCurrent && !isDeliveredAndCurrent
                          ? 'bg-white border-blue-600 text-blue-600 shadow-md'
                          : !isCurrent && !isShippedAndCurrent && !isDeliveredAndCurrent
                          ? 'bg-white border-gray-300 text-gray-400'
                          : ''
                      }
                      ${isShippedAndCurrent ? 'blink bg-blue-600 border-blue-600 text-white' : ''}
                      ${isDeliveredAndCurrent ? 'bg-blue-600 border-blue-600 text-white' : ''}`}
                  >
                    <StepIcon className={`w-5 h-5 ${isCompleted || isShippedAndCurrent || isDeliveredAndCurrent ? 'text-white' : ''}`} />
                  </div>

                  {/* Label below icon */}
                  <span
                    className={`mt-2 text-xs font-medium text-center ${
                      isCompleted || isCurrent ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector between this icon and the next (render for all but last) */}
                {index < steps.length - 1 && (
                  <div
                    className={`h-px flex-1 mx-2 ${
                      currentStep > step.num ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    aria-hidden
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatusTracker;