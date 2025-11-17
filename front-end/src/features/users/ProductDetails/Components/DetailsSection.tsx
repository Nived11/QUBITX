import type { Product } from "@/types/product";

interface DetailsSectionProps {
  product: Product;
  selectedColor: "main" | number;
  onColorChange: (colorIndex: "main" | number) => void;
}

const DetailsSection = ({
  product,
  selectedColor,
  onColorChange,
}: DetailsSectionProps) => {
  // Get current color name
  const currentColorName =
    selectedColor === "main"
      ? product.color
      : product.colorVariants?.[selectedColor]?.colorName || "";

  // Get current stock based on selected color
  const currentStock =
    selectedColor === "main"
      ? product.stock
      : product.colorVariants?.[selectedColor]?.stock ?? product.stock;

  const isOutOfStock = currentStock === 0;

  return (
    <div className="space-y-6 px-4 py-4">
      {/* Brand Tag */}
      <span className="inline-flex items-center justify-center px-3 py-0.5 text-[15px] font-semibold text-blue-800 bg-blue-200 rounded-full">
        {product.brand}
      </span>

      {/* Product Name */}
      <h1 className="text-[22px] font-[900] text-gray-900 sm:text-[28px] mb-2">
        {product.name}
      </h1>

      {/* Price Section */}
      <div className=" text-black">
        <div className="flex items-center mb-2 gap-4">

          {isOutOfStock ? (
            <span className="animate-pulse bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              OUT OF STOCK
            </span>
          ) : (
            <>
              <p className="text-sm mb-1 text-black font-semibold">Special Price</p>

              {product.discountPercentage > 0 && (
                <span className="animate-pulse bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </>
          )}
        </div>
        <div className="flex items-baseline gap-4 p-4 ">
          <span className="text-4xl font-bold">
            ₹{product.discountedPrice.toLocaleString("en-IN")}
          </span>
          <div className="text-lg line-through text-red-500">
            ₹{product.actualPrice}
          </div>
        </div>
        <p className="px-4 text-green-600  font-bold">
          Save ₹
          {(product.actualPrice - product.discountedPrice).toLocaleString(
            "en-IN"
          )}
        </p>
      </div>

      {/* Color Selection Section */}
      <div className="pt-4 border-t border-gray-200">
        <div className="mb-3 flex items-center gap-4">
          <p className="text-sm font-semibold text-gray-700">Color:</p>
          <p className="text-lg font-bold text-blue-800">{currentColorName}</p>
        </div>

        {/* Color Variants */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {/* Main Product Color */}
          <button
            onClick={() => onColorChange("main")}
            className={`bg-white flex-shrink-0 border-2 rounded-md overflow-hidden transition ${selectedColor === "main"
                ? "border-gray-600 shadow-lg"
                : "border-gray-300 hover:border-gray-600"
              }`}
          >
            <div className="p-1">
              <img
                src={product.images[0]}
                alt={product.color}
                className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded"
              />
            </div>
          </button>

          {/* Color Variants */}
          {product.colorVariants && product.colorVariants.length > 0 && (
            <>
              {product.colorVariants.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => onColorChange(index)}
                  className={`bg-white flex-shrink-0 border-2 rounded-md overflow-hidden transition ${selectedColor === index
                      ? "border-gray-600 shadow-lg"
                      : "border-gray-300 hover:border-gray-600"
                    }`}
                >
                  <div className="p-1">
                    <img
                      src={variant.images[0]}
                      alt={variant.colorName}
                      className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded"
                    />
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Dynamic Specifications */}
      {product.specifications && product.specifications.length > 0 && (
        <div className="pt-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-800 pb-2">
            Specifications
          </h3>
          <div className="space-y-3">
            {product.specifications.map((spec, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row border-b border-gray-200 pb-2 text-[15px] gap-1 sm:gap-0"
              >
                <span className="font-semibold text-gray-800 sm:w-40 sm:flex-shrink-0">
                  {spec.label}
                </span>
                <span className="text-gray-700">
                  <span className="hidden sm:inline mr-2">:</span>
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Warranty Section */}
      {product.warranty && (
        <div className="pt-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-800 pb-2">
            Warranty Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-green-600 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">
                  {product.warranty} Year Manufacturer Warranty
                </p>
                <p className="text-sm text-gray-700">
                  Covers manufacturing defects
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-green-600 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">
                  7 Days Replacement Policy
                </p>
                <p className="text-sm text-gray-700">
                  Easy returns and replacements
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-green-600 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">Customer Support</p>
                <p className="text-sm text-gray-700">
                  24/7 dedicated support team
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Description */}
      {product.description && (
        <div className="pt-4">
          <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-800 pb-2">
            Product Description
          </h3>
          <p className="text-gray-800 leading-relaxed text-[15px] text-justify  md:px-2 ">
            {product.description}
          </p>
        </div>
      )}

      {/* Why Choose Section */}
      {product.whychoose && product.whychoose.length > 0 && (
        <div className="bg-blue-50 rounded-lg shadow-md p-6 pt-4 border-l-4 border-blue-800">
          <h3 className="text-lg font-bold text-blue-900 mb-3">
            Why Choose This Product?
          </h3>
          <ul className="space-y-2 text-gray-800 text-[15px] text-justify [hyphens:auto] md:px-2">
            {product.whychoose.map((reason, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-800 mt-1">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailsSection;