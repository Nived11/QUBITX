import { type Product } from "../../Home/types";


interface DetailsSectionProps {
  product: Product;
}

const DetailsSection = ({ product }: DetailsSectionProps) => {
  return (
    <div className="space-y-6 px-4 py-4 ">
      
      <span className="inline-flex items-center justify-center px-3 py-0.5 text-[15px] font-semibold text-blue-800  bg-blue-200 rounded-full">
        {product.brand}
      </span>
      <h1 className="text-[19px] font-[600] text-gray-900 mb-4  sm:text-[25px] ">
        {product.name}
      </h1>

      {/* Price */}
      <div className=" p-4 text-black">
        <div className="flex items-center mb-2 gap-4">
        <p className="text-sm mb-1 text-black font-semibold ">Special Price</p>
         <span className="animate-pulse  bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            30% OFF
          </span>
          </div>
        <div className=" flex items-baseline gap-4">
          <span className="text-4xl font-bold">₹{product.price}</span>
          <div className="text-lg line-through  text-red-500">
            ₹{(product.price * 1.3).toFixed(2)}
          </div>
         
        </div>
      </div>


        {/* Specifications */}

      <div className="pt-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-800 pb-2">
          Specifications
        </h3>
        <div className="space-y-3">
          <div className="flex border-b border-gray-200 pb-2">
            <span className="font-semibold text-gray-800 w-40">
              Model Number:
            </span>
            <span className="text-gray-700">PRD-{product.id}-2024</span>
          </div>
          <div className="flex border-b border-gray-200 pb-2">
            <span className="font-semibold text-gray-800 w-40">Material:</span>
            <span className="text-gray-700">Premium Quality</span>
          </div>
          <div className="flex border-b border-gray-200 pb-2">
            <span className="font-semibold text-gray-800 w-40">Color:</span>
            <span className="text-gray-700">As shown in image</span>
          </div>
          <div className="flex border-b border-gray-200 pb-2">
            <span className="font-semibold text-gray-800 w-40">Weight:</span>
            <span className="text-gray-700">500g</span>
          </div>
          <div className="flex border-b border-gray-200 pb-2">
            <span className="font-semibold text-gray-800 w-40">
              Dimensions:
            </span>
            <span className="text-gray-700">20 x 15 x 10 cm</span>
          </div>
          <div className="flex pb-2">
            <span className="font-semibold text-gray-800 w-40">
              Country of Origin:
            </span>
            <span className="text-gray-700">India</span>
          </div>
        </div>
      </div>

      {/* Product Description */}
      

      {/* Specifications */}
      

      {/* Warranty */}
      <div className="pt-4 ">
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
                1 Year Manufacturer Warranty
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
      <div className="pt-4">
        <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-800 pb-2">
          Product Description
        </h3>
        <p className="text-gray-800 leading-relaxed">
          Experience premium quality with this exceptional product. Designed
          with attention to detail and built to last, this product offers
          outstanding performance and reliability. Perfect for everyday use, it
          combines style with functionality to meet all your needs. Crafted from
          high-quality materials, it ensures durability and long-lasting
          satisfaction.
        </p>
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 rounded-lg shadow-md p-6 pt-4 border-l-4 border-blue-800">
        <h3 className="text-lg font-bold text-blue-900 mb-3">
          Why Choose This Product?
        </h3>
        <ul className="space-y-2 text-gray-800 ">
          <li className="flex items-start gap-2">
            <span className="text-blue-800 mt-1">•</span>
            <span>High-quality construction for long-lasting durability</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-800 mt-1">•</span>
            <span>Excellent value for money with premium features</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-800 mt-1">•</span>
            <span>Trusted by thousands of satisfied customers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-800 mt-1">•</span>
            <span>Free shipping on orders above ₹500</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DetailsSection;
