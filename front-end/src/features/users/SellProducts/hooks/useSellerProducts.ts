import { useDispatch, useSelector } from "react-redux";
import type{ AppDispatch, RootState } from "@/store/index";
import api from "@/api/axios";
import { toast } from "sonner";
import {
  setLoading,
  setProducts,
  removeProduct,
  setError,
} from "@/slices/productSlice";

export const useProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, totalPages, totalProducts, currentPage, loading } = useSelector(
    (state: RootState) => state.products
  );

  // 🧠 Backend-controlled pagination
  const fetchProducts = async (page = 1) => {
    dispatch(setLoading(true));
    try {
      const res = await api.get(`/products/seller/my-products?page=${page}`, {
        withCredentials: true,
      });
      dispatch(setProducts(res.data));
    } catch (err: any) {
      dispatch(setError(err.response?.data?.message || "Failed to load products"));
      toast.error("Failed to fetch products");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🗑️ Delete Product
  const deleteProductById = async (id: string) => {
    dispatch(setLoading(true));
    try {
      await api.delete(`/products/delete/${id}`, { withCredentials: true });
      dispatch(removeProduct(id));
      toast.success("Product deleted successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    products,
    totalPages,
    totalProducts,
    currentPage,
    loading,
    fetchProducts,
    deleteProductById,
  };
};
