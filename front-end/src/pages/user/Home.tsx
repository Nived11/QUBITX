import {Categories, Banners, ProductList, ProductCategories} from "@/features/users/Home";
import { useProducts } from "@/features/users/Home/hooks/useProducts";

export default function Home() {
  const productsHook = useProducts();

  return (
    <>
      <Categories />
      <div className="w-full px-2 py-1 md:py-6 lg:py-8">
        <Banners />

        {/* pass productsHook to ProductList */}
        <ProductList {...productsHook} />

        {/* pass productsHook to ProductCategories */}
        <ProductCategories {...productsHook} />
      </div>
    </>
  );
}
