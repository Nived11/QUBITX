import Slider from "react-slick";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useBanners } from "../hooks/useBanners"; // your hook
import { useNavigate } from "react-router-dom";

const NextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 
               bg-white/20 backdrop-blur-md shadow-md 
               rounded-full p-0 sm:p-2 hover:bg-white/60 transition"
  >
    <FiChevronRight size={24} className="text-white" />
  </button>
);

const PrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 
               bg-white/20 backdrop-blur-md shadow-md 
               rounded-full p-0 sm:p-2 hover:bg-white/60 transition"
  >
    <FiChevronLeft size={24} className="text-white" />
  </button>
);

const settings = {
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: false,
  pauseOnFocus: false,
  draggable: false,
  swipe: true,
};

const Banners = () => {
  const sliderRef = useRef<Slider | null>(null);
  const { banners, loading } = useBanners();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="relative mb-2 overflow-hidden rounded-lg h-[95px] sm:h-[150px] md:h-[200px] lg:h-[250px] xl:h-[350px] bg-gray-200 animate-pulse"></div>
    );
  }

  return (
    <div
    
    className="relative mb-2 overflow-hidden rounded-lg">
      <NextArrow onClick={() => sliderRef.current?.slickNext()} />
      <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />

      <Slider ref={sliderRef} {...settings}>
        {banners.map((banner: any) => (
          <div
            key={banner._id}
             onClick={() =>
                navigate(`/product/${banner.productId?._id || banner.productId}`)
              }
            className="cursor-pointer relative w-full h-[95px] sm:h-[150px] md:h-[200px] lg:h-[250px] xl:h-[350px]"
          >
            <img
              src={banner.image}
              alt={banner.name}
              className="w-full h-[95px] sm:h-[150px] md:h-[200px] lg:h-[250px] xl:h-[350px] rounded-lg object-fit"
            />
            
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banners;
