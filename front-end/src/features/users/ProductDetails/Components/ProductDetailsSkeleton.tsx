const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-white animate-pulse overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 overflow-hidden">

          {/* ================= LEFT IMAGE SECTION ================= */}
          <div className="lg:sticky lg:top-[6rem] lg:h-[calc(90vh-2rem)] lg:self-start flex flex-col overflow-hidden">

            {/* Back Button */}
            <div className="h-8 w-24 bg-gray-200 rounded-full mb-4"></div>

            {/* Main Image */}
            <div className="relative mb-4 w-full overflow-hidden">
              <div className="w-full h-[380px] sm:h-[420px] bg-gray-200 rounded-lg"></div>

              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-300/50 rounded-full"></div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-300/50 rounded-full"></div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto max-w-full pb-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-200 flex-shrink-0"
                ></div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <div className="h-14 w-full bg-gray-200 rounded-lg"></div>
              <div className="h-14 w-full bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          {/* ================= RIGHT DETAILS SECTION ================= */}
          <div className="space-y-6 overflow-hidden">

            {/* Brand Tag */}
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>

            {/* Product Name */}
            <div className="h-8 w-3/4 bg-gray-200 rounded"></div>

            {/* Price Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
              </div>
              <div className="flex items-baseline gap-4">
                <div className="h-8 w-28 bg-gray-200 rounded"></div>
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>

            {/* Color Section */}
            <div className="space-y-3 pt-4 border-t">
              <div className="h-5 w-40 bg-gray-200 rounded"></div>

              <div className="flex gap-3 overflow-x-auto max-w-full pb-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-gray-200 flex-shrink-0"
                  ></div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-3 pt-4">
              <div className="h-6 w-48 bg-gray-200 rounded"></div>

              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row gap-2 border-b pb-2"
                >
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-4 w-40 sm:w-1/2 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

            {/* Warranty Section */}
            <div className="space-y-3 pt-4">
              <div className="h-6 w-56 bg-gray-200 rounded"></div>

              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-40 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-2 pt-4">
              <div className="h-6 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>

            {/* Why Choose */}
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-800 space-y-2">
              <div className="h-5 w-40 bg-gray-200 rounded"></div>

              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
