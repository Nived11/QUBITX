import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { toast } from "sonner";
import {
  setCartLoading,
  setCartError,
  addToCartSuccess,
} from "@/slices/cartSlice";
import type { RootState } from "@/store";

export const useCartActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const addToCart = async (
    productId: string,
    quantity: number,
    color: string
  ) => {
    if (!isAuthenticated) {
      toast.warning("Please login first to add items to cart");
      navigate("/login");
      return;
    }

    dispatch(setCartLoading(true));
    dispatch(setCartError(null));

    try {
      const res = await api.post("/cart/add", { 
        productId, 
        quantity, 
        color 
      });

      dispatch(addToCartSuccess(res.data.cart));
      toast.success(res.data.message || "Added to cart successfully");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to add product to cart";
      dispatch(setCartError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setCartLoading(false));
    }
  };

  return { addToCart };
};