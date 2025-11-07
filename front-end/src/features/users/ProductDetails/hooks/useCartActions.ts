import { useDispatch } from "react-redux";
import api from "@/api/axios";
import { toast } from "sonner";
import {
  setCartLoading,
  setCartError,
  addToCartSuccess,
} from "@/slices/cartSlice";

export const useCartActions = () => {
    
  const dispatch = useDispatch();

  const addToCart = async (
    productId: string,
    quantity: number,
    color: string
  ) => {
    dispatch(setCartLoading(true));
    dispatch(setCartError(null));

    try {
      const res = await api.post("/cart/add",
        { productId, quantity, color }
      );

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
