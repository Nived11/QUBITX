// src/features/checkout/components/OrderSummaryStep.tsx
import { OrderItemsList } from "./OrderItemsList";
import  PriceSummary  from "./PriceSummary";

interface OrderSummaryStepProps {
  checkout: any;
}

 const OrderSummaryStep = ({ checkout }: OrderSummaryStepProps) => {
  const { addressHook, orderItems, subtotal, discount, shipping, grandTotal, setCurrentStep } = checkout;

  return (
    <div className="space-y-4  lg:max-w-[80%] lg:mx-auto w-full bg-white px-4 py-4 sm:px-8 md:p-6 lg:p-8 rounded-lg">
      <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
      
      {/* Delivery Address */}
      {addressHook.selectedAddress && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Delivery Address</h3>
              <p className="text-sm font-medium">{addressHook.selectedAddress.fullName}</p>
              <p className="text-sm text-gray-600">
                {addressHook.selectedAddress.addressLine1}, {addressHook.selectedAddress.city} - {addressHook.selectedAddress.pincode}
              </p>
            </div>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Change
            </button>
          </div>
        </div>
      )}

      {/* Order Items */}
      <OrderItemsList items={orderItems} />

      {/* Price Summary */}
      <PriceSummary 
        subtotal={subtotal}
        discount={discount}
        shipping={shipping}
        total={grandTotal}
      />
    </div>
  );
};

export default OrderSummaryStep;