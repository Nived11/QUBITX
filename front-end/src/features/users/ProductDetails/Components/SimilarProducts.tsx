import { Link } from "react-router-dom";
import SwingingTag from "../../Home/Components/SwingingTag";
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
}

interface SimilarProductsProps {
  products: Product[];
}

const SimilarProducts = ({ products }: SimilarProductsProps) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="py-8 sm:py-[70px] bg-gray-50 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-[28px] font-bold text-gray-700 mb-6 sm:mb-8 border-b-2 border-blue-800/20 pb-3">
          Similar Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {products.map((product) => {
            const image = product.images?.[0] || "";

            return (
              <Link key={product._id} to={`/product/${product._id}`}>
                <div className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
                  {product.discountPercentage > 0 && (
                    <SwingingTag discount={product.discountPercentage} />
                  )}

                  {/* Image */}
                  <div className="h-36 sm:h-44 md:h-48 overflow-hidden flex items-center justify-center">
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
                    <div className="flex items-center justify-end gap-2 mb-1">
                      <span className="bg-blue-50 text-blue-700 text-[9px] sm:text-xs font-semibold px-2 py-0.5 rounded-full">
                        {product.brand}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
                      {product.name}
                    </h3>

                    <div className="mt-auto">
                      <div className="flex items-end gap-2 flex-wrap">
                        <span className="text-base sm:text-lg font-bold text-gray-900">
                          ₹{product.discountedPrice.toLocaleString("en-IN")}
                        </span>
                        {product.actualPrice > product.discountedPrice && (
                          <span className="text-[10px] sm:text-xs line-through text-gray-500 mb-0.5">
                            ₹{product.actualPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      {product.actualPrice > product.discountedPrice && (
                        <p className="text-[9px] sm:text-xs text-green-600 font-medium mt-1">
                          Save ₹
                          {(product.actualPrice - product.discountedPrice).toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;
