import ProductCard from "@/features/users/Home/Components/ProductCard";
import type { Product } from "@/types/product";

interface SimilarProductsProps {
  products: Product[];
}

const SimilarProducts = ({ products }: SimilarProductsProps) => {
  if (!products || products.length === 0) return null;

  const limitedProducts = products.slice(0, 6);

  return (
    <div className="py-8 sm:py-[70px] bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-[28px] font-bold text-gray-700 mb-6 sm:mb-8 border-b-2 border-blue-800/20 pb-3">
          Similar Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {limitedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;
