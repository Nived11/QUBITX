import { ArrowRight } from "lucide-react";
import TruckLoader from "@/components/ui/TruckLoader";


interface CheckoutActionsProps {
  checkout: any;
}

const CheckoutActions = ({ checkout }: CheckoutActionsProps) => {
  const { currentStep, isPlacingOrder, addressHook, handleBack, handleNext, handlePlaceOrder } = checkout;

  return (
    <>
      {/* Desktop Version - Back Button on Left (Steps 2-3) */}
      {currentStep > 1 && (
        <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={handleBack}
            disabled={isPlacingOrder}
            className="w-14 h-14 rounded-full border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center transition-all"
          >
            <ArrowRight size={24} className="rotate-180" />
          </button>
        </div>
      )}

      {/* Desktop Next Button on Right (Steps 1-2) */}
      {currentStep < 3 && (
        <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={handleNext}
            disabled={addressHook.actionLoading || isPlacingOrder}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-800 to-blue-900 text-white hover:opacity-90  disabled:cursor-not-allowed shadow-lg flex items-center justify-center"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      )}

      {/* Desktop Place Order Button - Bottom Center (Step 3 only) - Not Fixed */}
      {currentStep === 3 && (
        <div className="hidden lg:flex justify-center mt-8 mb-8">
          <button
            onClick={handlePlaceOrder}
            disabled={addressHook.actionLoading || isPlacingOrder}
            className="px-8 py-3 bg-gradient-to-b from-blue-700 to-blue-900 text-white text-lg font-semibold rounded-lg hover:opacity-90  disabled:cursor-not-allowed shadow-2xl flex items-center justify-center gap-3 min-w-[250px] transition-all"
          >
            {isPlacingOrder ? (
              <>
               Placing Order
                <TruckLoader />
              </>
            ) : (
              <>
                Place Order
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      )}

      {/* Mobile Version - Fixed Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl p-4" style={{ zIndex: 100 }}>
        <div className="flex gap-3">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              disabled={isPlacingOrder}
              className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
          )}
          
          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              disabled={addressHook.actionLoading || isPlacingOrder}
              className="flex-1 bg-gradient-to-r from-blue-800 to-blue-900 text-white py-2 rounded-lg font-semibold hover:opacity-90  disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              disabled={addressHook.actionLoading || isPlacingOrder}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-semibold hover:opacity-90  disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPlacingOrder ? (
                <>
                  Placing Order 
                <TruckLoader />
                </>
              ) : (
                <>
                  Place Order
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutActions;