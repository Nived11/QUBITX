import Slider from "react-slick";
import  { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

 const banners = [
    {
      name: "OnePlus 13s",
      image:
        "https://portal.lotuselectronics.com/banner_images/original/e7ee6f7101887e2812eb4c4854ff7a93.webp",
    },
    {
      name: "Samsung Galaxy",
      image:
        "https://portal.lotuselectronics.com/banner_images/original/e521b215ecf118b553b5424f356ffa2e.webp",
    },
    {
      name: "Apple Macbook",
      image:
        "https://portal.lotuselectronics.com/banner_images/original/e7ee6f7101887e2812eb4c4854ff7a93.webp",
    },
    {
      name: "Headphones Sale",
      image:
        "https://portal.lotuselectronics.com/banner_images/original/e521b215ecf118b553b5424f356ffa2e.webp",
    },
  ];
  const NextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 
               bg-white/20 backdrop-blur-md shadow-md 
               rounded-full p-0 sm:p-2 hover:bg-white/60 transition
               "
  >
    <FiChevronRight size={24} className="text-white" />
  </button>
);

const PrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 
               bg-white/20 backdrop-blur-md shadow-md 
               rounded-full p-0 sm:p-2  hover:bg-white/60 transition"
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

  return (
    <div className="relative mt-6 overflow-hidden rounded-lg">
      <NextArrow onClick={() => sliderRef.current?.slickNext()} />
      <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />

      <Slider ref={sliderRef} {...settings}>
        {banners.map((banner, idx) => (
          <div
            key={idx}
            className="relative w-full h-[95px] sm:h-[150px] md:h-[200px] lg:h-[250px]  xl:h-[350px]"
          >
            <img
              src={banner.image}
              alt={banner.name}
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};


export default Banners;