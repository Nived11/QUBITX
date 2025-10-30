import type { Product } from "@/types/product";
import BackButton from "../../../../components/common/BackButton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useImageSection } from "../hooks/useImageSection";
import ActionButtons from "./ActionButtons";

interface ImageSectionProps {
  product: Product;
  selectedColor: "main" | number;
  onColorChange: (colorIndex: "main" | number) => void;
}

const ImageSection = ({ product, selectedColor }: ImageSectionProps) => {
  const {
    productImages,
    selectedImage,
    setSelectedImage,
    handlers,
    handlePrevImage,
    handleNextImage,
    handleAddToCart,
    handleBuyNow,
  } = useImageSection(product, selectedColor);

  return (
    <div className="lg:sticky lg:top-[6rem] lg:h-[calc(90vh-2rem)] lg:self-start">
      <BackButton />

      <div className="flex flex-col">
        {/* Main Image with Navigation */}
        <div className="relative mb-4 flex-shrink-0" {...handlers}>
          <img
            src={productImages[selectedImage]}
            alt={product.name}
            className="w-full sm:h-[400px] object-contain bg-white"
          />

          {/* Previous Button */}
          <button
            onClick={handlePrevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-blue-800 rounded-full p-2 shadow-lg transition"
          >
            <FiChevronLeft size={20} className="text-blue-800" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-blue-800 rounded-full p-2 shadow-lg transition"
          >
            <FiChevronRight size={20} className="text-blue-800" />
          </button>
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-6 sm:gap-10 overflow-x-auto scrollbar-hide mb-8 flex-shrink-0 px-4">
          {productImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 border-2 rounded-lg overflow-hidden transition ${
                selectedImage === index
                  ? "border-blue-800 shadow-md"
                  : "border-gray-300 hover:border-blue-600"
              }`}
            >
              <img
                src={img}
                alt={`View ${index + 1}`}
                className="w-14 h-14 sm:w-20 sm:h-20 object-cover"
              />
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <ActionButtons
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      </div>
    </div>
  );
};

export default ImageSection;