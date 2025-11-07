const CartSkeleton = () => {
  return (
    <div className="p-4 md:p-6 space-y-4 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
        {/* Left: Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-3 flex gap-3"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div className="flex-grow space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                  <div className="h-6 w-10 bg-gray-200 rounded"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 space-y-4">
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-12 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
          <div className="h-10 w-full bg-gray-200 rounded mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
