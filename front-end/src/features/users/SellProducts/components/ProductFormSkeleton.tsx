
const ProductFormSkeleton = () => {
  return (
    <div className="max-h-[100vh]  p-2 sm:p-4 overflow-y-auto scrollbar-hide animate-pulse">

      {/* Form Content */}
      <div className="mt-4 sm:mt-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Basic Information */}
          <section className="p-4 sm:p-6 space-y-4 sm:space-y-6  rounded-lg">
            <div className="h-6 sm:h-7 bg-gray-300 rounded w-40 sm:w-48 border-b-2 border-gray-200 pb-2 sm:pb-3"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Product Name */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-1.5 sm:mb-2"></div>
                <div className="h-10 sm:h-12 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Brand */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-16 mb-1.5 sm:mb-2"></div>
                <div className="h-10 sm:h-12 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Category */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-1.5 sm:mb-2"></div>
                <div className="h-10 sm:h-12 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Warranty */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-1.5 sm:mb-2"></div>
                <div className="h-10 sm:h-12 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Actual Price */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-1.5 sm:mb-2"></div>
                <div className="h-10 sm:h-12 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Discount */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-1.5 sm:mb-2"></div>
                <div className="h-10 sm:h-12 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Stock */}
              <div className="md:col-span-2">
                <div className="h-4 bg-gray-200 rounded w-28 mb-1.5 sm:mb-2"></div>
                <div className="h-10 sm:h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-1.5 sm:mb-2"></div>
              <div className="h-24 sm:h-28 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Main Images */}
            <div className="h-6 sm:h-7 bg-gray-300 rounded w-44 border-b-2 border-gray-200 pb-2 sm:pb-3"></div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 sm:h-40 bg-gray-200 rounded-lg"></div>
              ))}
            </div>

            {/* Why Choose This */}
            <div className="flex items-center justify-between border-b-2 border-gray-200 pb-2 sm:pb-3">
              <div className="h-6 sm:h-7 bg-gray-300 rounded w-48"></div>
              <div className="h-8 sm:h-9 w-20 sm:w-24 bg-gray-300 rounded-lg"></div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-2 sm:gap-3 items-center">
                  <div className="h-5 w-5 bg-gray-200 rounded"></div>
                  <div className="flex-1 h-10 sm:h-12 bg-gray-200 rounded-lg"></div>
                  <div className="h-10 sm:h-12 w-10 sm:w-12 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>

            {/* Specifications */}
            <div className="flex items-center justify-between border-b-2 border-gray-200 pb-2 sm:pb-3">
              <div className="h-6 sm:h-7 bg-gray-300 rounded w-36"></div>
              <div className="h-8 sm:h-9 w-20 sm:w-24 bg-gray-300 rounded-lg"></div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <div className="flex-1 h-10 sm:h-12 bg-gray-200 rounded-lg"></div>
                  <div className="flex items-center flex-1 gap-2 sm:gap-3">
                    <div className="flex-1 h-10 sm:h-12 bg-gray-200 rounded-lg"></div>
                    <div className="h-10 sm:h-12 w-10 sm:w-12 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Color Variants */}
            <div className="flex items-center justify-between border-b-2 border-gray-200 pb-2 sm:pb-3">
              <div className="h-6 sm:h-7 bg-gray-300 rounded w-32"></div>
              <div className="h-8 sm:h-9 w-24 sm:w-28 bg-gray-300 rounded-lg"></div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="border-2 border-gray-200 rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-5 bg-gray-50"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex-1 h-10 sm:h-12 bg-gray-200 rounded-lg"></div>
                    <div className="h-10 sm:h-12 w-10 sm:w-12 bg-gray-200 rounded-lg"></div>
                  </div>

                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2 sm:mb-3"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                      {[1, 2].map((j) => (
                        <div key={j} className="h-28 sm:h-32 bg-gray-200 rounded-lg"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Submit Buttons */}
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <div className="h-11 sm:h-12 w-full sm:w-48 bg-gray-300 rounded-lg"></div>
              <div className="h-11 sm:h-12 w-full sm:w-48 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormSkeleton;