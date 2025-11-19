import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import type { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const ProductList = ({ products, loading, error }: ProductListProps) => {

  return (
    <div className="container mx-auto py-6 px-2 sm:px-4">
      <div className="flex justify-between items-center mb-8 px-2 sm:px-0">
        <h1 className="text-lg sm:text-2xl font-bold text-blue-800">Latest Products</h1>
      
      </div>
      <div className="h-auto w-full py-4">
        {error && <div className="text-center py-8 text-red-600">{error} </div>}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-4 md:gap-3">
          
        {loading
  ? Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)
  : products.slice(0, 12).map((p) => <ProductCard key={p._id} product={p} />)}

        </div>
      </div>
    </div>
  );
};

export default ProductList;