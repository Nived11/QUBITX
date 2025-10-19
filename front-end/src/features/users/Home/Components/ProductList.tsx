import { Link } from "react-router-dom";
import { products } from "../datas/DummyProducts";
import FilterProduct from "./FilterProduct";
import ProductCard from "./ProductCard";
import { type Product } from "../types";

const ProductList = () => {


  return (
    <div className="container mx-auto py-6 px-2 sm:px-4">
      <div className="flex justify-between items-center mb-8 px-2 sm:px-0">
        <h1 className="text-lg sm:text-2xl font-bold text-blue-800">Latest Products</h1>
        
        <FilterProduct/>

      </div>

      <div className="h-auto w-full py-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-4 md:gap-3">
          {products.map((product: Product) => (
          <ProductCard  key={product.id} product={product} />
        ))}
        </div>
      </div>

      <div className="flex justify-end mt-5 bg-gradient-to-r from-[#102362] to-blue-800 rounded-bl-full rounded-br-full relative overflow-hidden mx-2 sm:mx-0 py-1">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
        
        <Link
          to="/products"
          className="pr-3 sm:pr-5 py-1 text-white font-semibold transition cursor-pointer flex items-center gap-1 sm:gap-2 relative z-10 group text-xs sm:text-base"
        >
          <span>See More</span>
          <span className="inline-flex gap-0.5 animate-arrowSlide">
            <span className="inline-block transform transition-transform group-hover:translate-x-1">&gt;</span>
            <span className="inline-block transform transition-transform group-hover:translate-x-1 animation-delay-75">&gt;</span>
          </span>
        </Link>
      </div>   
    </div>
  );
};

export default ProductList;