import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "@/api/axios";
import { setLoading, setProducts, setError } from "@/slices/productSlice";
import type { RootState, AppDispatch } from "@/store/index";
import { extractErrorMessages } from "../../../../utils/helpers/extractErrorMessages";

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const fetchLatestProducts = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const res = await api.get("/products/all", { withCredentials: true });
      const data = res.data;
      const latest = data.slice(0, 12);

      dispatch(
        setProducts({
          products: latest,
          totalProducts: latest.length,
          totalPages: 1,
          currentPage: 1,
        })
      );
    } catch (err: any) {
      dispatch(setError(extractErrorMessages(err) || "Failed to fetch products"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ✅ Fetch on first load
  useEffect(() => {
    if (products.length === 0) {
      fetchLatestProducts();
    }
  }, []); // Only on mount

  // ✅ Refetch when user logs in / logs out / seller changes
  useEffect(() => {
    if (isAuthenticated !== null) {
      fetchLatestProducts();
    }
  }, [isAuthenticated, user?.userType]);

  return {
    products,
    loading,
    error,
    refetch: fetchLatestProducts,
  };
};
