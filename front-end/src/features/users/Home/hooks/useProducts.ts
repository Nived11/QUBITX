// src/hooks/useProducts.ts
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

const fetchLatestProducts = async () => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const res = await api.get("/products/all");
    const latest = res.data.slice(0, 12); // get the latest 12 products
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
    if (products.length === 0) {
      fetchLatestProducts();
    }
  }, [products.length]);

  return {
    products,
    loading,
    error,
    refetch: fetchLatestProducts, // optional manual refetch
  };
};
