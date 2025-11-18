import { useParams } from "react-router-dom";
import ProductCard from "@/features/users/Home/Components/ProductCard";
import FilterProduct from "./FilterBar";
import { useCategoryProducts } from "../hooks/useCategoryProducts";
import BackButton from "@/components/common/BackButton";
import ProductCardSkeleton from "../../Home/Components/ProductCardSkeleton";

const CategoryLists = () => {
  const { id } = useParams<{ id: string }>();

  const {
    products,
    loading,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    applyFilter,
    resetFilter,
    listRef,
  } = useCategoryProducts(id);


  return (
    <div className="min-h-screen bg-white/50 px-4 py-4">
      <BackButton />
      <div className="flex flex-col md:grid md:grid-cols-4 gap-4 h-screen">

        <div className="w-full md:w-auto md:col-span-1">
          <FilterProduct
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            onApply={applyFilter}
            onReset={resetFilter}
          />
        </div>


        {/* Product list */}
        <div ref={listRef} className="md:col-span-3 h-full overflow-y-auto pb-20 scrollbar-hide ">

          {!loading && products.length === 0 && (
            <div className="w-full flex justify-center items-center py-10">
              <p className="text-gray-600 text-lg font-medium">
                No products found
              </p>
            </div>
          )}

          {products.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {loading && products.length === 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default CategoryLists;
