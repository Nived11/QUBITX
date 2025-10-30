const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* ================= LEFT IMAGE SECTION ================= */}
          <div className="flex flex-col">
            {/* Back Button Skeleton */}
            <div className="mb-4">
              <div className="h-8 w-24 rounded-full bg-gray-200"></div>
            </div>

            {/* Main Image Skeleton */}
            <div className="relative mb-4">
              <div className="w-full h-[350px] sm:h-[400px] rounded-lg bg-gray-200"></div>
            </div>

            {/* Thumbnails Skeleton */}
            <div className="flex gap-4 overflow-x-auto px-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-gray-200"></div>
              ))}
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex gap-4">
              <div className="h-12 w-full rounded-lg bg-gray-200"></div>
              <div className="h-12 w-full rounded-lg bg-gray-200"></div>
            </div>
          </div>

          {/* ================= RIGHT DETAILS SECTION ================= */}
          <div className="space-y-6">
            {/* Brand Tag */}
            <div className="h-6 w-24 rounded-full bg-gray-200"></div>

            {/* Product Title */}
            <div className="h-8 w-3/4 bg-gray-200 rounded"></div>

            {/* Price Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
              </div>
              <div className="flex items-baseline gap-4">
                <div className="h-8 w-24 bg-gray-200 rounded"></div>
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-2">
              <div className="h-6 w-48 bg-gray-200 rounded"></div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-4 w-40 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

            {/* Warranty Info */}
            <div className="space-y-3">
              <div className="h-6 w-64 bg-gray-200 rounded"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                  <div className="h-4 w-40 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-6 w-56 bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>

            {/* Why Choose Section */}
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-800 space-y-2">
              <div className="h-5 w-48 bg-gray-200 rounded"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-200"></div>
                  <div className="h-4 w-60 bg-gray-200 rounded"></div>
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
