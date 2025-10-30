import React from "react";

interface ActionButtonsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAddToCart,
  onBuyNow,
}) => {
  return (
    <>
      {/* Desktop / Laptop View */}
      <div className="hidden sm:grid grid-cols-2 gap-3 flex-shrink-0 px-4 mb-6">
        <button
          onClick={onAddToCart}
          className="text-sm sm:text-base bg-gradient-to-r from-blue-800 to-blue-900 text-white py-3 rounded-md font-semibold hover:opacity-90 transition shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
        >
          <span>🛒</span> ADD TO CART
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
            onClick={onAddToCart}
            className="text-xs bg-gradient-to-r from-blue-800 to-blue-900 text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
          >
            <span>🛒</span> ADD TO CART
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
