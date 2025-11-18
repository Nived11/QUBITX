import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ImageSection from "./ImageSection";
import DetailsSection from "./DetailsSection";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import SimilarProducts from "./SimilarProducts";
import { useProductDetails } from "../hooks/useProductDetails";
import { selectAllProducts } from "../hooks/productSelectors";

const ProductDetailsContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { productDetails, loading, error } = useProductDetails(id);

  const allProducts = useSelector(selectAllProducts);

  const location = useLocation();
  const readonlyMode = new URLSearchParams(location.search).get("mode") === "readonly";

  const [selectedColor, setSelectedColor] = useState<"main" | number>("main");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [selectedColor]);

  if (loading) return <ProductDetailsSkeleton />;

  if (error)
    return <div className="text-center text-red-500 py-16">{error}</div>;

  if (!productDetails)
    return <div className="text-center text-gray-600 py-16">Product not found</div>;

  return (
    <div className="min-h-screen bg-white/50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          <ImageSection
            product={productDetails}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
            readonly={readonlyMode}
          />


          <DetailsSection
            product={productDetails}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
        </div>
      </div>

      {!readonlyMode && (
        <SimilarProducts
          products={allProducts.filter(
            (p) => p.category === productDetails.category && p._id !== productDetails._id
          )}
        />
      )}
    </div>
  );
};

export default ProductDetailsContainer;