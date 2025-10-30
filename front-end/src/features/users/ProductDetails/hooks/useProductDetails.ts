import { useEffect } from "react";
import api from "@/api/axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setProductDetails, setLoading, setError } from "@/slices/productSlice";
import { extractErrorMessages } from "../../../../utils/helpers/extractErrorMessages";

export const useProductDetails = (productId: string | undefined) => {
  const dispatch = useDispatch();
  const { productCache, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const productDetails = productId ? productCache[productId] : null;

  useEffect(() => {
    if (!productId || productDetails) return;

    const fetchProduct = async () => {
      dispatch(setLoading(true));
      try {
        const res = await api.get(`/products/${productId}`);
        dispatch(setProductDetails(res.data));
      } catch (err: any) {
        dispatch(setError(extractErrorMessages(err) || "Failed to fetch product"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProduct();
  }, [productId, dispatch, productDetails]);

  return { productDetails, loading, error };
};
