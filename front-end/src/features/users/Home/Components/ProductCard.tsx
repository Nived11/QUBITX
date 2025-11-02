import { Link } from "react-router-dom";
import SwingingTag from "./SwingingTag";
import placeholderSVG from "@/components/common/PlaceHolderSVG";

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  actualPrice: number;
  discountPercentage: number;
  discountedPrice: number;
  images: string[];
  stock?: number;
  warranty?: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const image =
    product.images?.[0] || "";

  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
        {product.discountPercentage > 0 && (
          <SwingingTag discount={product.discountPercentage} />
        )}

        {/* Image Container */}
        <div className="h-36 sm:h-40 md:h-40 overflow-hidden flex items-center justify-center ">
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="object-contain h-full w-full transition-transform duration-500 ease-in-out group-hover:scale-110"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = `data:image/svg+xml;utf8,${encodeURIComponent(placeholderSVG)}`;
              }}
            />

          ) : (
            <div
              className="flex items-center justify-center w-full h-full"
              dangerouslySetInnerHTML={{ __html: placeholderSVG }}
            />
          )}
        </div>

        {/* Product Details */}
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          {/* Brand & Category */}
          <div className="flex items-center justify-end gap-2 mb-1">
            <span className="bg-blue-50 text-blue-700 text-[9px] sm:text-xs font-semibold px-2 py-0.5 rounded-full">
              {product.brand}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 line-clamp-1 ">
            {product.name}
          </h3>

          {/* Price Section */}
          <div className="mt-auto">
            <div className="flex items-end gap-2 flex-wrap">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                ₹{product.discountedPrice.toLocaleString("en-IN")}
              </span>
              {product.actualPrice > product.discountedPrice && (
                <span className="text-xs sm:text-sm line-through text-gray-500 mb-0.5">
                  ₹{product.actualPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Savings */}
            {product.actualPrice > product.discountedPrice && (
              <p className="text-[10px] sm:text-xs text-green-600 font-bold mt-1">
                Save ₹
                {(product.actualPrice - product.discountedPrice).toLocaleString(
                  "en-IN"
                )}
              </p>
            )}
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 border-2 border-transparent  rounded-lg transition-all duration-300 pointer-events-none" />
      </div>
    </Link>
  );
};

export default ProductCard;
