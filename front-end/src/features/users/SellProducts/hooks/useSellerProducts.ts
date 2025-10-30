import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/index";
import api from "@/api/axios";
import { toast } from "sonner";
import {
  setSellerLoading,
  setSellerProducts,
  removeSellerProduct,
  setSellerError,
} from "@/slices/sellerProductSlice";

export const useSellerProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, totalPages, totalProducts, currentPage, loading } = useSelector(
    (state: RootState) => state.sellerProducts
  );

  const fetchSellerProducts = async (page = 1) => {
    dispatch(setSellerLoading(true));
    try {
      const res = await api.get(`/products/seller/my-products?page=${page}`, {
        withCredentials: true,
      });
      dispatch(setSellerProducts(res.data));
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to load products";
      dispatch(setSellerError(msg));
      toast.error(msg);
    } finally {
      dispatch(setSellerLoading(false));
    }
  };

  const deleteSellerProductById = async (id: string) => {
    dispatch(setSellerLoading(true));
    try {
      await api.delete(`/products/delete/${id}`, { withCredentials: true });
      dispatch(removeSellerProduct(id));
      toast.success("Product deleted successfully");
       await fetchSellerProducts();
      
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    } finally {
      dispatch(setSellerLoading(false));
    }
  };

  return {
    products,
    totalPages,
    totalProducts,
    currentPage,
    loading,
    fetchSellerProducts,
    deleteSellerProductById,
  };
};
