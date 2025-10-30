import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { 
  ImageSection, 
  DetailsSection, 
  ProductDetailsSkeleton, 
  SimilarProducts 
} from "../../features/users/ProductDetails";
import { useProductDetails } from "../../features/users/ProductDetails/hooks/useProductDetails";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { productDetails, loading, error } = useProductDetails(id);
  
  // Get all products from Redux store for similar products
  const allProducts = useSelector((state: RootState) => 
    Object.values(state.products.productCache)
  );
  
  // Shared state for color selection
  const [selectedColor, setSelectedColor] = useState<"main" | number>("main");

  if (loading) return <ProductDetailsSkeleton />;

  if (error)
    return <div className="text-center text-red-500 py-16">{error}</div>;

  if (!productDetails)
    return <div className="text-center text-gray-600 py-16">Product not found</div>;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Image Section */}
          <ImageSection 
            product={productDetails} 
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
          
          {/* Right Side - Details Section */}
          <DetailsSection 
            product={productDetails}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
        </div>
      </div>

      {/* Similar Products Section - Shows products from same category */}
      <SimilarProducts
        products={allProducts.filter(
          (p) => p.category === productDetails.category && p._id !== productDetails._id
        )}
      />
    </div>
  );
};

export default ProductDetails;