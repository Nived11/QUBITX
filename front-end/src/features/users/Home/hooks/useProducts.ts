import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "@/api/axios";
import { setLoading, setProducts, setError } from "@/slices/productSlice";
import type { RootState, AppDispatch } from "@/store/index";
import { extractErrorMessages } from "@/utils/helpers/extractErrorMessages";

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error, lastFetchedUserType } = useSelector(
    (state: RootState) => state.products
  );
  const userType = useSelector((state: RootState) => state.auth.user?.userType || null);

  const fetchLatestProducts = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const res = await api.get("/products/all");
      const latest = Array.isArray(res.data) ? res.data.slice(0, 12) : [];

      dispatch(
        setProducts({
          products: latest,
          totalProducts: latest.length,
          totalPages: 1,
          currentPage: 1,
          userType, 
        })
      );
    } catch (err: any) {
      dispatch(setError(extractErrorMessages(err) || "Failed to fetch products"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      fetchLatestProducts();
    }
  }, []);

  useEffect(() => {
    if (lastFetchedUserType !== userType) {
      fetchLatestProducts();
    }
  }, [userType]);

  return { products, loading, error, refetch: fetchLatestProducts };
};
