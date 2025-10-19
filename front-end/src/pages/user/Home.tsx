import {Categories,Banners ,ProductList,ProductCategories} from "../../features/users/Home"

export default function Home() {
  return (
    <div className="w-full px-4 py-4">
      
      <Categories />
      <Banners />
      <ProductList />
      <ProductCategories/>
      
    </div>
  );
}
