
const ProductPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 animate-pulse">

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg flex flex-col"
          >
            {/* Image Skeleton */}
            <div className="h-32 sm:h-40 md:h-48 bg-gray-200 rounded-t-md sm:rounded-t-lg"></div>

            {/* Content Skeleton */}
            <div className="p-2 sm:p-3 flex flex-col flex-grow">
              {/* Title and Category Row */}
              <div className="flex justify-between items-start mb-2">
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 sm:h-5 bg-gray-200 rounded w-12 sm:w-16"></div>
              </div>

              {/* Brand */}
              <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/3 mb-2"></div>

              {/* Price Section */}
              <div className="flex items-center gap-1 mb-3">
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-2 sm:h-3 bg-gray-200 rounded w-12"></div>
                <div className="h-2 sm:h-3 bg-gray-200 rounded w-12"></div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 mt-auto">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default ProductPageSkeleton;
