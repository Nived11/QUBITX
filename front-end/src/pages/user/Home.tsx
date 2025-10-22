import {Categories,Banners ,ProductList,ProductCategories} from "../../features/users/Home"

export default function Home() {
  return (
    <>
    <Categories />
    <div className="w-full px-2 py-1 md:py-6 lg:py-8">
      <Banners />
      <ProductList />
      <ProductCategories/>
    </div>
    </>
  );
}
