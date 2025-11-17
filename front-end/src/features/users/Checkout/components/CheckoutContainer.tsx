import BackButton from "@/components/common/BackButton";
import StepIndicator from "./StepIndicator";
import AddressStep from "./AddressStep";
import OrderSummaryStep from "./OrderSummaryStep";
import PaymentStep from "./PaymentStep";
import CheckoutActions from "./CheckoutActions";
import { useCheckout } from "../hooks/useCheckout";

const CheckoutContainer = () => {
  const checkout = useCheckout();

  if (checkout.addressHook.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 pb-32 lg:pb-8">
      <div className="container mx-auto px-4">
        <div className="flex"></div>
        <BackButton />

        <StepIndicator currentStep={checkout.currentStep} />

        <div className=" relative" style={{ zIndex: 1 }}>
          {checkout.currentStep === 1 && <AddressStep checkout={checkout} />}
          <div className="">
           {checkout.currentStep === 2 && <OrderSummaryStep checkout={checkout} />}
          </div>
          {checkout.currentStep === 3 && <PaymentStep checkout={checkout} />}
        </div>

        <CheckoutActions checkout={checkout} />
      </div>

    </div>
  );
};

export default CheckoutContainer;