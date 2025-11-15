import BackButton from "@/components/common/BackButton";
import { useCheckout ,StepIndicator ,AddressStep,OrderSummaryStep,PaymentStep,CheckoutActions}from "@/features/users/Checkout";

const Checkout = () => {
  const checkout = useCheckout();

  if (checkout.addressHook.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <BackButton />

        <StepIndicator currentStep={checkout.currentStep} />

        <div className="bg-white rounded-lg shadow-md p-6">
          {checkout.currentStep === 1 && <AddressStep checkout={checkout} />}
          {checkout.currentStep === 2 && <OrderSummaryStep checkout={checkout} />}
          {checkout.currentStep === 3 && <PaymentStep checkout={checkout} />}

          <CheckoutActions checkout={checkout} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;