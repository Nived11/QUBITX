import React from "react";

interface ActionButtonsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
  onGoToCart: () => void;
  isAddedToCart: boolean;
  isAdding: boolean;
  isAuthenticated: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAddToCart,
  onBuyNow,
   onGoToCart,
  isAddedToCart,
  isAdding,
  isAuthenticated,

}) => {

  const shouldShowGoToCart = isAuthenticated && isAddedToCart;
  const addOrGoAction = shouldShowGoToCart  ? onGoToCart : onAddToCart;
  const addOrGoLabel = shouldShowGoToCart  ? "GO TO CART" : "ADD TO CART";

  return (
    <>
      {/* Desktop / Laptop View */}
      <div className="hidden sm:grid grid-cols-2 gap-3 flex-shrink-0 px-4 mb-6">
       <button
          onClick={addOrGoAction}
          disabled={isAdding}
          className={`text-sm flex justify-center items-center gap-2 ${
            shouldShowGoToCart
              ? "bg-gradient-to-b from-green-700 to-green-900"
              : "bg-gradient-to-r from-blue-800 to-blue-900"
          } text-white py-3 rounded-md font-semibold transition ${
            isAdding ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {isAdding ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>{shouldShowGoToCart  ? "🛍️" : "🛒"}</span>
          )}
          {isAdding ? "ADDING..." : addOrGoLabel}
        </button>


        <button
          onClick={onBuyNow}
          className="text-sm sm:text-base bg-gradient-to-r from-blue-800 to-blue-900 text-white py-3 rounded-md font-semibold hover:opacity-90 transition shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
        >
          <span>⚡</span> BUY NOW
        </button>
      </div>

      {/* Mobile View (Fixed Bottom) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white  shadow-lg px-3 py-2 z-50">
        <div className="grid grid-cols-2 gap-3">
          <button
          onClick={addOrGoAction}
          disabled={isAdding}
          className={`text-xs flex justify-center items-center gap-2 ${
            shouldShowGoToCart 
              ? "bg-gradient-to-b from-green-700 to-green-900"
              : "bg-gradient-to-r from-blue-800 to-blue-900"
          } text-white py-3 rounded-md font-semibold transition ${
            isAdding ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {isAdding ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>{shouldShowGoToCart  ? "🛍️" : "🛒"}</span>
          )}
          {isAdding ? "ADDING..." : addOrGoLabel}
        </button>


          <button
            onClick={onBuyNow}
            className="text-xs bg-gradient-to-r from-blue-800 to-blue-900 text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
          >
            <span>⚡</span> BUY NOW
          </button>
        </div>
      </div>
    </>
  );
};

export default ActionButtons;
