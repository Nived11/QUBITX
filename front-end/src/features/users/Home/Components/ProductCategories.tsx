import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useProducts } from "../hooks/useProducts";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductCategories = () => {
  const { products, loading, error } = useProducts();

  const laptops = products.filter((p) => p.category === "Laptops").slice(0, 4);
  const mobiles = products.filter((p) => p.category === "Smartphones").slice(0, 4);
  const headphones = products.filter((p) => p.category === "Headphones").slice(0, 4);

  return (
    <div className="container mx-auto py-6 px-2 sm:px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Laptops Section */}
        <div className="col-span-1 bg-white rounded-md rounded-t-[50px] shadow">
          <div className="relative bg-gradient-to-r from-[#102362] to-blue-800 border rounded-tl-full rounded-tr-full flex justify-between items-center mb-3 px-6 py-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
            <h2 className="text-base font-bold text-white relative z-10">
              Trending Laptops
            </h2>
            <Link
              to="/products"
              className="pr-3 sm:pr-5 py-1 text-white font-semibold transition cursor-pointer flex items-center gap-1 sm:gap-2 relative z-10 group text-xs sm:text-base"
            >
              <span>See More</span>
              <span className="inline-flex gap-0.5 animate-arrowSlide">
                <span className="inline-block transform transition-transform group-hover:translate-x-1">
                  &gt;
                </span>
                <span className="inline-block transform transition-transform group-hover:translate-x-1 animation-delay-75">
                  &gt;
                </span>
              </span>
            </Link>
          </div>
          {error && <div className="text-center py-8 text-red-600">{error}</div>}
          <div className="lg:grid lg:grid-cols-2 lg:gap-4 p-4 flex lg:flex-none overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="min-w-[48%] sm:min-w-[160px] lg:min-w-0 snap-start">
                    <ProductCardSkeleton />
                  </div>
                ))
              : laptops.map((p) => (
                  <div key={p._id} className="min-w-[48%] sm:min-w-[160px] lg:min-w-0 snap-start">
                    <ProductCard product={p} />
                  </div>
                ))}
          </div>
        </div>

        {/* Mobiles and Headphones Section */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* Mobiles Section */}
          <div className="bg-white rounded-md rounded-t-[50px] shadow">
            <div className="relative bg-gradient-to-r from-[#102362] to-blue-800 border rounded-tl-full rounded-tr-full flex justify-between items-center mb-3 px-6 py-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
              <h2 className="text-base font-bold text-white relative z-10">
                Latest Mobiles
              </h2>
              <Link
                to="/products"
                className="pr-3 sm:pr-5 py-1 text-white font-semibold transition cursor-pointer flex items-center gap-1 sm:gap-2 relative z-10 group text-xs sm:text-base"
              >
                <span>See More</span>
                <span className="inline-flex gap-0.5 animate-arrowSlide">
                  <span className="inline-block transform transition-transform group-hover:translate-x-1">
                    &gt;
                  </span>
                  <span className="inline-block transform transition-transform group-hover:translate-x-1 animation-delay-75">
                    &gt;
                  </span>
                </span>
              </Link>
            </div>
            {error && <div className="text-center py-8 text-red-600">{error}</div>}
            <div className="md:grid md:grid-cols-4 md:gap-4 p-4 flex md:flex-none overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="min-w-[140px] sm:min-w-[160px] md:min-w-0 snap-start">
                      <ProductCardSkeleton />
                    </div>
                  ))
                : mobiles.map((p) => (
                    <div key={p._id} className="min-w-[140px] sm:min-w-[160px] md:min-w-0 snap-start">
                      <ProductCard product={p} />
                    </div>
                  ))}
            </div>
          </div>

          {/* Headphones Section */}
          <div className="bg-white rounded-md rounded-t-[50px] shadow">
            <div className="relative bg-gradient-to-r from-[#102362] to-blue-800 border rounded-tl-full rounded-tr-full flex justify-between items-center mb-3 px-6 py-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
              <h2 className="text-base font-bold text-white relative z-10">
                Branded Headphones
              </h2>
              <Link
                to="/products"
                className="pr-3 sm:pr-5 py-1 text-white font-semibold transition cursor-pointer flex items-center gap-1 sm:gap-2 relative z-10 group text-xs sm:text-base"
              >
                <span>See More</span>
                <span className="inline-flex gap-0.5 animate-arrowSlide">
                  <span className="inline-block transform transition-transform group-hover:translate-x-1">
                    &gt;
                  </span>
                  <span className="inline-block transform transition-transform group-hover:translate-x-1 animation-delay-75">
                    &gt;
                  </span>
                </span>
              </Link>
            </div>
            {error && <div className="text-center py-8 text-red-600">{error}</div>}
            <div className="md:grid md:grid-cols-4 md:gap-4 p-4 flex md:flex-none overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="min-w-[140px] sm:min-w-[160px] md:min-w-0 snap-start">
                      <ProductCardSkeleton />
                    </div>
                  ))
                : headphones.map((p) => (
                    <div key={p._id} className="min-w-[140px] sm:min-w-[160px] md:min-w-0 snap-start">
                      <ProductCard product={p} />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;