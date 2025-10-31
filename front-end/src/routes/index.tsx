import { Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import { useAdminLoader } from "../hooks/useAdminLoader";
import GlobalLoader from "../components/common/GlobalLoader";
import { useBackendReady } from "../hooks/useBackendReady";

const AppRoutes = () => {
  const { admin, loading: adminLoading } = useAdminLoader();
  const backendReady = useBackendReady();

  if (!backendReady || adminLoading) return <GlobalLoader />;

  return (
    <Routes>
      {PublicRoutes()}
      {AdminRoutes(!!admin)}
    </Routes>
  );
};

export default AppRoutes;
