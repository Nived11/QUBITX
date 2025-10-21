import { Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import ProtectedRoute from "./ProtectedRoute";
import { SignUp,Login, Home, ProductDetails, NotFound, Cart, ProfileInfo, Orders, UserAddress, SellProducts } from "../pages/user";

const PublicRoutes = () => {
  return (
    <>
      {/* Public pages with layout */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Protected section */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<ProfileInfo />} />
            <Route path="orders" element={<Orders />} />
            <Route path="user-address" element={<UserAddress />} />
            <Route path="sell-products" element={<SellProducts />} />
          </Route>
        </Route>
      </Route>

      {/* Login is outside PublicLayout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

    </>
  );
};

export default PublicRoutes;
