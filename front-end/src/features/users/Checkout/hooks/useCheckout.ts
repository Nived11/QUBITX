import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import api from "@/api/axios";
import { clearCart } from "@/slices/cartSlice";
import { useAddress } from "@/features/users/Address/hooks/useAddress";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";
import type { AppDispatch } from "@/store";

interface LocationState {
  isBuyNow?: boolean;
  product?: Product;
  selectedColor?: string;
  cartItems?: CartItem[];
}

export const useCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const state = location.state as LocationState;
  
  const { isBuyNow, product, selectedColor, cartItems } = state || {};
  
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "RAZORPAY">("COD");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  const addressHook = useAddress();

  // Prepare order items
  const orderItems: CartItem[] = isBuyNow && product
    ? [{
        product: product,
        quantity: 1,
        color: selectedColor || product.color,
        images: product.images || []
      } as CartItem]
    : cartItems || [];

  // Calculate totals
  const subtotal = orderItems.reduce(
    (acc, item) => acc + (item.product.actualPrice * item.quantity),
    0
  );
  
  const total = orderItems.reduce(
    (acc, item) => acc + (item.product.discountedPrice * item.quantity),
    0
  );
  
  const discount = subtotal - total;
  const shipping = total > 500 ? 0 : 50;
  const grandTotal = total + shipping;

  // Redirect if no items
  useEffect(() => {
    if (!isBuyNow && (!orderItems || orderItems.length === 0)) {
      navigate("/cart");
    }
  }, [isBuyNow, orderItems, navigate]);

  const handleNext = () => {
    if (currentStep === 1 && !addressHook.selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    if (!addressHook.selectedAddress) {
      toast.error("Please select an address");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const orderData = {
        addressId: addressHook.selectedAddress._id,
        paymentMethod,
        items: orderItems.map(item => ({
          productId: item.product._id,
          quantity: item.quantity,
          color: item.color,
          price: item.product.discountedPrice,
        })),
        subtotal,
        discount,
        shipping,
        total: grandTotal,
        clearCart: !isBuyNow,
      };

      const response = await api.post("/orders/create", orderData);

      if (response.data) {
        if (!isBuyNow) {
          dispatch(clearCart());
        }

        toast.success("Order placed successfully!");
        
        navigate("/profile/orders", { 
          replace: true,
          state: { orderSuccess: true }
        });
      }
    } catch (error: any) {
      console.error("Place order error:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return {
    // State
    currentStep,
    paymentMethod,
    showAddressForm,
    isPlacingOrder,
    orderItems,
    
    // Calculations
    subtotal,
    total,
    discount,
    shipping,
    grandTotal,
    
    // Address hook
    addressHook,
    
    // Actions
    setCurrentStep,
    setPaymentMethod,
    setShowAddressForm,
    handleNext,
    handleBack,
    handlePlaceOrder,
  };
};