import { Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import ProtectedRoute from "./ProtectedRoute";
import AuthProtectRoute from "./AuthprotectRoute";
import { SignUp, Login, Home, ProductDetails, NotFound, Cart, ProfileInfo, Orders, UserAddress, SellProducts,Checkout,CategoryPage} from "../pages/user";

const PublicRoutes = () => {
  return (
    <>

      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:id" element={<CategoryPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<ProfileInfo />} />
            <Route path="orders" element={<Orders />} />
            <Route path="user-address" element={<UserAddress />} />
            <Route path="sell-products" element={<SellProducts />} />
          </Route>
        </Route>
      </Route>

      <Route element={<AuthProtectRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </>
  );
};

export default PublicRoutes;
