const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg flex flex-col animate-pulse">
      {/* Image skeleton */}
      <div className="h-32 sm:h-40 md:h-48 bg-gray-200 rounded-t-md sm:rounded-t-lg" />

      {/* Content skeleton */}
      <div className="p-1.5 sm:p-3 flex flex-col gap-1 sm:gap-2">
        {/* Title and category */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3 sm:w-1/2" />
          <div className="h-2 sm:h-3 bg-gray-200 rounded w-10 sm:w-12" />
        </div>

        {/* Brand */}
        <div className="h-2.5 sm:h-3 bg-gray-200 rounded w-1/3 sm:w-1/4" />

        {/* Price area */}
        <div className="flex items-center gap-2">
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16" />
          <div className="h-2.5 sm:h-3 bg-gray-200 rounded w-8 sm:w-10" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
