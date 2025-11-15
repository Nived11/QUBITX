// src/features/checkout/components/CheckoutActions.tsx
interface CheckoutActionsProps {
  checkout: any;
}

 const CheckoutActions = ({ checkout }: CheckoutActionsProps) => {
  const { currentStep, isPlacingOrder, addressHook, handleBack, handleNext, handlePlaceOrder } = checkout;

  return (
    <div className="flex gap-3 mt-8 pt-6 border-t">
      {currentStep > 1 && (
        <button
          onClick={handleBack}
          disabled={isPlacingOrder}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
      )}
      
      {currentStep < 3 ? (
        <button
          onClick={handleNext}
          disabled={addressHook.actionLoading || isPlacingOrder}
          className="flex-1 bg-gradient-to-r from-blue-800 to-blue-900 text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      ) : (
        <button
          onClick={handlePlaceOrder}
          disabled={addressHook.actionLoading || isPlacingOrder}
          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPlacingOrder ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Placing Order...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      )}
    </div>
  );
};

export default CheckoutActions;