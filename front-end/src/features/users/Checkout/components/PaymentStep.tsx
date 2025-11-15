// src/features/checkout/components/PaymentStep.tsx
import { Check, CreditCard } from "lucide-react";
import  PriceSummary  from "./PriceSummary";

interface PaymentStepProps {
  checkout: any;
}

 const PaymentStep = ({ checkout }: PaymentStepProps) => {
  const { paymentMethod, setPaymentMethod, subtotal, discount, shipping, grandTotal } = checkout;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
      
      <div className="space-y-3">
        {/* Cash on Delivery */}
        <div
          onClick={() => setPaymentMethod("COD")}
          className={`border-2 rounded-lg p-4 cursor-pointer transition ${
            paymentMethod === "COD"
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200 hover:border-blue-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Cash on Delivery</h3>
                <p className="text-sm text-gray-600">Pay when you receive</p>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "COD"
                  ? "border-blue-600 bg-blue-600"
                  : "border-gray-300"
              }`}
            >
              {paymentMethod === "COD" && <Check size={14} className="text-white" />}
            </div>
          </div>
        </div>

        {/* Razorpay (Coming Soon) */}
        <div className="border-2 border-gray-200 rounded-lg p-4 opacity-50 cursor-not-allowed">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Razorpay</h3>
                <p className="text-sm text-gray-600">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Summary */}
      <PriceSummary 
        subtotal={subtotal}
        discount={discount}
        shipping={shipping}
        total={grandTotal}
        showLabel
      />
    </div>
  );
};

export default PaymentStep;