import { useParams } from "react-router-dom";
import { ImageSection , DetailsSection , ProductDetailsSkeleton} from "../../features/users/ProductDetails";
import { useProductDetails } from "../../features/users/ProductDetails/hooks/useProductDetails";

const ProductDetails = () => {
   const { id } = useParams<{ id: string }>();
  const { productDetails, loading, error } = useProductDetails(id);

if (loading) return <ProductDetailsSkeleton />;

  if (error)
    return <div className="text-center text-red-500 py-16">{error}</div>;

  if (!productDetails)
    return <div className="text-center text-gray-600 py-16">Product not found</div>;

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto ">
        
        <div className="grid lg:grid-cols-2 gap-8">
   
      <ImageSection product={productDetails} />
      <DetailsSection product={productDetails} />
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;