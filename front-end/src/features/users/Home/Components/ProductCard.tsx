import { type Product } from "../types";
import { Link } from "react-router-dom";

// interface ProductCardProps {
//   product: Product;
// }

const ProductCard = ({ product }: { product: Product }) => {
  return (
      <Link to={`/product/${product.id}`}>
    <div
      key={product.id}
      className="bg-white rounded-md sm:rounded-lg shadow-md sm:shadow-lg cursor-pointer hover:shadow-xl transition-shadow flex flex-col"
    >
      {/* Image */}
      <div className="h-32 sm:h-40 md:h-48 overflow-hidden flex items-center justify-center py-1 sm:py-4 bg-white rounded-t-md sm:rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain h-full w-full transform transition-transform duration-300 ease-in-out hover:scale-110"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://via.placeholder.com/200x200?text=No+Image";
          }}
        />
      </div>

      <div className="p-1.5 sm:p-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-0.5 sm:mb-1">
          <h3 className="text-[10px] sm:text-sm font-semibold text-gray-800 line-clamp-1 mb-0.5 sm:mb-0">
            {product.name}
          </h3>
          <span className="bg-blue-100 text-blue-800 text-[8px] sm:text-xs font-medium px-1 sm:px-1.5 py-0.5 rounded whitespace-nowrap self-start">
            {product.category}
          </span>
        </div>
        <div className="mb-0.5 sm:mb-1 flex items-center">
          <span className="text-[8px] sm:text-xs text-gray-600">
            {product.brand}
          </span>
        </div>
        <div className="price-display flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-0.5 sm:gap-1">
          <span className="text-[10px] sm:text-sm font-bold text-gray-900">
            ₹{product.price}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-[8px] sm:text-xs line-through text-gray-500">
              ₹{product.originalPrice}
            </span>
            <span className="text-[8px] sm:text-xs text-green-600">
              {product.discount}% OFF
            </span>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;
