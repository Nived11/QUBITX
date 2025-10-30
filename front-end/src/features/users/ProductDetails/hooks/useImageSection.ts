// features/users/ProductDetails/hooks/useImageSection.ts
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/product";

export const useImageSection = (product: Product) => {
  const productImages = product.images.filter(Boolean); // clean undefined/null
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  // Auto-slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [productImages.length]);

  // Swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () => setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1)),
    onSwipedRight: () => setSelectedImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1)),
    trackMouse: true,
  });

  // Manual navigation
  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  // Navigate to cart
  const handleAddToCart = () => {
    navigate("/cart");
  };

  const handleBuyNow = () => {
    navigate("/checkout");
  }

  return {
    productImages,
    selectedImage,
    setSelectedImage,
    handlers,
    handlePrevImage,
    handleNextImage,
    handleAddToCart,
    handleBuyNow,
  };
};
