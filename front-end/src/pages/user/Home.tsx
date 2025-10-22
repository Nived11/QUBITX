import {Categories,Banners ,ProductList,ProductCategories} from "../../features/users/Home"

export default function Home() {
  return (
    <>
    <Categories />
    <div className="w-full px-4 py-4">
      <Banners />
      <ProductList />
      <ProductCategories/>
    </div>
    </>
  );
}
