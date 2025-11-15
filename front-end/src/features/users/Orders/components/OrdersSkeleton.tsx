const OrdersSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-5">

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 animate-pulse"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                <div className="h-3 w-28 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Status Tracker */}
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                </div>
              ))}
            </div>

            {/* Item Preview */}
            <div className="flex gap-3 sm:gap-4 mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-md"></div>

              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded mt-2"></div>
              </div>
            </div>

            {/* Address */}
            <div className="h-16 bg-gray-100 rounded-lg mb-4"></div>

            {/* Price Breakdown */}
            <div className="space-y-3 bg-gray-100 p-4 rounded-lg mb-4">
              <div className="h-3 w-full bg-gray-200 rounded"></div>
              <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
              <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-4">
              <div className="space-y-2">
                <div className="h-3 w-28 bg-gray-200 rounded"></div>
                <div className="h-5 w-32 bg-gray-300 rounded"></div>
              </div>
              <div className="h-10 w-28 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default OrdersSkeleton;
