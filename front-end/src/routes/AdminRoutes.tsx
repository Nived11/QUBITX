import { Navigate, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import NotFound from "../pages/user/NotFound";

const AdminRoutes = (isAdmin: boolean) => {
  return (
    <Route path="/admin/*">
      <Route
        path="login"
        element={isAdmin ? <Navigate to={"/admin"} /> : <AdminLogin />}
      />
      <Route element={<AdminLayout isAdmin={isAdmin} />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  );
};

export default AdminRoutes;
