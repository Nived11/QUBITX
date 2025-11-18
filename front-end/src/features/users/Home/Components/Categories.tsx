import smartphone from "../../../../assets/categoriesimages/smartphone.png";
import laptop from "../../../../assets/categoriesimages/laptop.webp";
import headphone from "../../../../assets/categoriesimages/headphone.png";
import smartwatch from "../../../../assets/categoriesimages/smartwatch.webp";
import speaker from "../../../../assets/categoriesimages/speaker.webp";
import camera from "../../../../assets/categoriesimages/camera.png";
import gaming from "../../../../assets/categoriesimages/gaming.png";
import tablet from "../../../../assets/categoriesimages/tablet.png";
import smarthome from "../../../../assets/categoriesimages/smarthome.png";
import cpu from "../../../../assets/categoriesimages/cpu.png";
import earbuds from "../../../../assets/categoriesimages/earbuds.webp";
import printers from "../../../../assets/categoriesimages/printers.png";
import { useNavigate } from "react-router-dom";

const categories = [
    { name: "Smartphones", image: smartphone },
    { name: "Headphones", image: headphone },
    { name: "Laptops", image: laptop },
    { name: "Smart Watches", image: smartwatch },
    { name: "Speakers", image: speaker },
    { name: "Cameras", image: camera },
    { name: "Gaming", image: gaming },
    { name: "Tablets", image: tablet },
    { name: "Smart Home", image: smarthome },
    { name: "Printers", image: printers },
    { name: "Earbuds", image: earbuds },
    { name: "Accessories", image: cpu },
  ];

const Categories = () => {
    const navigate = useNavigate();
  return (
    <div className=" px-2 py-4  flex items-center gap-5 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-12 overflow-x-auto scrollbar-hide">
  {categories.map((cat, idx) => (
    <div
      key={idx}
       onClick={() => navigate(`/category/${cat.name}`)}
      className="flex flex-col items-center text-center flex-shrink-0 w-16 sm:w-18 md:w-20 lg:w-20"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 flex items-center justify-center bg-gray-300/30 rounded-full  p-2 cursor-pointer ">
        <img
          src={cat.image}
          alt={cat.name}
          className="w-12 h-12 sm:w-12 sm:h-12 md:w-12 md:h-12 lg:w-12 lg:h-12  object-contain hover:scale-[1.4] transition-transform duration-300"
        />
      </div>
      <p className="text-xs sm:text-sm md:text-sm lg:text-sm font-semibold text-gray-700 mt-2 ml-1 truncate">
        {cat.name}
      </p>
    </div>
  ))}
</div>

  )
}

export default Categories;