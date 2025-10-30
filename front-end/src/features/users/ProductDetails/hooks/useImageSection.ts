import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/product";

export const useImageSection = (product: Product, selectedColor: "main" | number) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  // Get current images based on selected color
  const productImages =
    selectedColor === "main"
      ? product.images.filter(Boolean)
      : product.colorVariants?.[selectedColor]?.images.filter(Boolean) || [];

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
  const handleAddToCart = () => {
    navigate("/cart");
  };

  const handleBuyNow = () => {
    navigate("/checkout");
  };

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