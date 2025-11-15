
const AddressSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-pulse">
      <div className="mx-auto px-2 lg:px-12">
        
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <div className="h-6 w-40 bg-gray-300 rounded"></div>
            <div className="h-4 w-56 bg-gray-200 rounded"></div>
          </div>

          <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
        </div>

        {/* Address Cards Skeleton */}
        <div className="space-y-4 max-h-screen overflow-y-auto pr-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6"
            >
              <div className="flex justify-between mb-3">
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
                <div className="h-5 w-16 bg-gray-200 rounded"></div>
              </div>

              {/* Name & Phone */}
              <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-40 bg-gray-200 rounded mb-4"></div>

              {/* Address lines */}
              <div className="space-y-2 mb-4">
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                <div className="h-4 w-52 bg-gray-200 rounded"></div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 border-t pt-3">
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-20 bg-gray-200 rounded"></div>
                <div className="h-6 w-20 bg-gray-200 rounded ml-auto"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AddressSkeleton;
