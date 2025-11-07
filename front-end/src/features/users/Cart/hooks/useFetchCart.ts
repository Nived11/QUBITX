import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "@/api/axios";
import {
  setCartLoading,
  setCartError,
  setCart,
} from "@/slices/cartSlice";
import type { AppDispatch, RootState } from "@/store";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/helpers/extractErrorMessages";

export const useFetchCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, loading, error } = useSelector((state: RootState) => state.cart);

  const fetchCart = async () => {
    try {
      dispatch(setCartLoading(true));
      const { data } = await api.get("/cart/");
      if (data?.cart) {
        dispatch(setCart(data.cart));
      } else {
        dispatch(setCartError("No cart found"));
      }
      
    } catch (err) {
      dispatch(setCartError(extractErrorMessages(err) || "Failed to fetch cart"));
    } finally {
      dispatch(setCartLoading(false));
    }
  };

  // ✅ REMOVE ITEM
  const removeCartItem = async (productId: string) => {
    try {
      dispatch(setCartLoading(true));
      const { data } = await api.delete(`/cart/remove/${productId}`);
      if (data?.cart) {
        dispatch(setCart(data.cart));
        toast.success("Item removed from cart");
      }
    } catch (err) {
      toast.error(extractErrorMessages(err) || "Failed to remove item");
    } finally {
      dispatch(setCartLoading(false));
    }
  };

const updateCartItem = async (productId: string, quantity: number) => {
  try {
    if (!cart || !cart.items) return;

    const currentCart = cart;

    const updatedItems = currentCart.items.map((item) =>
      item.product._id === productId ? { ...item, quantity } : item
    );

    dispatch(setCart({ ...currentCart, items: updatedItems }));
    await api.put("/cart/update", { productId, quantity });
  } catch (err) {
    toast.error(extractErrorMessages(err) || "Failed to update quantity");
    fetchCart(); 
  }
};

  useEffect(() => {
    fetchCart();
  }, []);


  return { cart, loading, error, fetchCart, removeCartItem,updateCartItem };
};
