// src/hooks/useProducts.ts
import { useEffect, useRef } from "react";
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
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const hasFetchedOnce = useRef(false);

  const fetchLatestProducts = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const res = await api.get("/products/all");
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

  useEffect(() => {
    // 🔹 Fetch only if not done once OR no cached products
    if (!hasFetchedOnce.current || products.length === 0) {
      fetchLatestProducts();
      hasFetchedOnce.current = true;
    }
  }, []); // ⛔ no dependencies (won’t refetch on remount)

  // 🔁 Optional: refetch only when login/logout happens (manual control)
  useEffect(() => {
    if (hasFetchedOnce.current) {
      fetchLatestProducts();
    }
  }, [isAuthenticated]);

  return {
    products,
    loading,
    error,
    refetch: fetchLatestProducts,
  };
};
