import { useState, useEffect } from "react";
import { type Product } from "../../Home/types";
import BackButton from "../../../../components/common/BackButton";
import { useSwipeable } from "react-swipeable";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface ImageSectionProps {
  product: Product;
}

const ImageSection = ({ product }: ImageSectionProps) => {
  const productImages = [product.image, product.image, product.image, product.image, product.image];
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
    }, 3000); // change image every 3 seconds
    return () => clearInterval(interval);
  }, [productImages.length]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1)),
    onSwipedRight: () => setSelectedImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1)),
    trackMouse: true, 
  });

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className=" lg:sticky lg:top-[6rem] lg:h-[calc(90vh-2rem)] lg:self-start">
  
        <BackButton/>
      
      <div className="flex flex-col">
        
        {/* Main Image with Navigation */}
        <div className="relative mb-4 flex-shrink-0" {...handlers}>
          
          <img
            src={productImages[selectedImage]}
            alt={product.name}
            className="w-full  sm:h-[400px] object-contain   bg-white "
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
        <div className="flex gap-6 sm:gap-10 overflow-x-auto scrollbar-hide mb-8 flex-shrink-0 px-4 ">
          {productImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 border-2 rounded-lg overflow-hidden transition ${
                selectedImage === index ? "border-blue-800 shadow-md" : "border-gray-300 hover:border-blue-600"
              }`}
            >
              <img src={img} alt={`View ${index + 1}`} className="w-14 h-14 sm:w-20 sm:h-20 object-cover" />
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 flex-shrink-0 px-4 mb-6">
          <button
            onClick={() => navigate("/cart")}
           className="text-sm sm:text-base bg-gradient-to-r from-blue-800 to-blue-900 text-white py-3 rounded-md font-semibold hover:opacity-90 transition shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
           <span>🛒</span> ADD TO CART
          </button>
          <button className="text-sm sm:text-base bg-gradient-to-r from-blue-800 to-blue-900 text-white py-3 rounded-md font-semibold hover:opacity-90 transition shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
           <span>⚡</span> BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSection;
