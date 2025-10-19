
import { useParams } from "react-router-dom";
import { products } from "../../features/users/Home/datas/DummyProducts";
import { type Product } from "../../features/users/Home/types";
import { ImageSection , DetailsSection} from "../../features/users/ProductDetails";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product: Product | undefined = products.find((p) => p.id.toString() === id);
  

  if (!product) {
    return <div className="p-6 text-center text-red-600 font-bold">Product not found!</div>;
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto ">
        
        <div className="grid lg:grid-cols-2 gap-8">
   
         <ImageSection product={product} />

          <DetailsSection product={product} />
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;