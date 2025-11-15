import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/product";
import { useCartActions } from "../hooks/useCartActions"; 
import { useSelector } from "react-redux";
import { type RootState } from "@/store";
import { toast } from "sonner";

export const useImageSection = (product: Product, selectedColor: "main" | number) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCartActions(); 

  const cart = useSelector((state: RootState) => state.cart.cart);
  const loading = useSelector((state: RootState) => state.cart.loading);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (cart?.items?.some((item) => item.product?._id === product._id)) {
      setIsAddedToCart(true);
    } else {
      setIsAddedToCart(false);
    }
  }, [cart, product._id]);

  // Get current images based on selected color
  const productImages =
    selectedColor === "main"
      ? product.images.filter(Boolean)
      : product.colorVariants?.[selectedColor]?.images.filter(Boolean) || [];

  // Get current stock based on selected color
  const currentStock = 
    selectedColor === "main"
      ? product.stock
      : product.colorVariants?.[selectedColor]?.stock ?? product.stock;

  const isOutOfStock = currentStock === 0;

  // Reset image index when color changes
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedColor]);

  // Auto-slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prev) =>
        prev === productImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [productImages.length]);

  // Swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setSelectedImage((prev) =>
        prev === productImages.length - 1 ? 0 : prev + 1
      ),
    onSwipedRight: () =>
      setSelectedImage((prev) =>
        prev === 0 ? productImages.length - 1 : prev - 1
      ),
    trackMouse: true,
  });

  // Manual navigation
  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  // Navigate to cart
  const handleAddToCart = async () => {
    if (isOutOfStock) {
      toast.error("This product is out of stock");
      return;
    }

    if (!isAuthenticated) {
      toast.warning("Please login first to add items to cart");
      navigate("/login");
      return;
    }

    const color =
      selectedColor === "main"
        ? product.color
        : product.colorVariants?.[selectedColor]?.colorName || product.color;

    if (!product._id) {
      console.error("Product ID is missing.");
      return;
    }

    if (!color) {
      console.error("Product color is missing.");
      return;
    }
    await addToCart(String(product._id), 1, color);
    setIsAddedToCart(true);
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const handleBuyNow = () => {
    if (isOutOfStock) {
      toast.error("This product is out of stock");
      return;
    }

    if (!isAuthenticated) {
      toast.warning("Please login first to purchase");
      navigate("/login");
      return;
    }

    // Get the color name
    const colorName = selectedColor === "main" 
      ? product.color 
      : product.colorVariants?.[selectedColor]?.colorName || product.color;

    // Get the selected images array
    const selectedImages = selectedColor === "main"
      ? product.images
      : product.colorVariants?.[selectedColor]?.images || product.images;

    // Navigate to checkout with product data including images
    navigate("/checkout", {
      state: {
        isBuyNow: true,
        product: product,
        selectedColor: colorName,
        selectedImages: selectedImages,
        quantity: 1,
      },
    });
  };

  return {
    productImages,
    selectedImage,
    setSelectedImage,
    handlers,
    handlePrevImage,
    handleNextImage,
    handleAddToCart,
    handleGoToCart,
    handleBuyNow,
    isAddedToCart,
    loading,
    isOutOfStock,
    currentStock,
  };
};