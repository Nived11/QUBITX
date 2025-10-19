
const categories = [
    { name: "Smartphones", image: "https://image01-in.oneplus.net/media/202406/19/dee6a15ca313f3a7b211f2a440e9f05e.png?x-amz-process=image/format,webp/quality,Q_80" },
    { name: "Laptops", image: "https://image01-in.oneplus.net/media/202406/19/dee6a15ca313f3a7b211f2a440e9f05e.png?x-amz-process=image/format,webp/quality,Q_80" },
    { name: "Headphones", image: "https://image01-in.oneplus.net/media/202406/19/dee6a15ca313f3a7b211f2a440e9f05e.png?x-amz-process=image/format,webp/quality,Q_80" },
    { name: "Smartwatches", image: "https://image01-in.oneplus.net/media/202406/19/dee6a15ca313f3a7b211f2a440e9f05e.png?x-amz-process=image/format,webp/quality,Q_80" },
    { name: "Speakers", image: "https://w7.pngwing.com/pngs/924/969/png-transparent-smartwatch-online-shopping-android-watch-electronics-watch-accessory-accessories-thumbnail.png" },
    { name: "Cameras", image: "https://image01-in.oneplus.net/media/202406/19/dee6a15ca313f3a7b211f2a440e9f05e.png?x-amz-process=image/format,webp/quality,Q_80" },
    { name: "Gaming", image: "https://image01-in.oneplus.net/media/202406/19/dee6a15ca313f3a7b211f2a440e9f05e.png?x-amz-process=image/format,webp/quality,Q_80" },
    { name: "Tablets", image: "https://image01-in.oneplus.net/media/202406/19/dee6a15ca313f3a7b211f2a440e9f05e.png?x-amz-process=image/format,webp/quality,Q_80" },
    { name: "Smart Home", image: "https://image01-in.oneplus.net/media/202406/19/dee6a15ca313f3a7b211f2a440e9f05e.png?x-amz-process=image/format,webp/quality,Q_80" },
    { name: "Accessories", image: "https://image01-in.oneplus.net/media/202406/19/dee6a15ca313f3a7b211f2a440e9f05e.png?x-amz-process=image/format,webp/quality,Q_80" },
    { name: "Earbuds", image: "https://image01-in.oneplus.net/media/202406/19/dee6a15ca313f3a7b211f2a440e9f05e.png?x-amz-process=image/format,webp/quality,Q_80" },
    { name: "Printers", image: "https://image01-in.oneplus.net/media/202406/19/dee6a15ca313f3a7b211f2a440e9f05e.png?x-amz-process=image/format,webp/quality,Q_80" },
  ];

const Categories = () => {
  return (
    <div className="  flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-12 overflow-x-auto scrollbar-hide">
  {categories.map((cat, idx) => (
    <div
      key={idx}
      className="flex flex-col items-center text-center flex-shrink-0 w-16 sm:w-18 md:w-20 lg:w-20"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 flex items-center justify-center rounded-full border-2 border-blue-600 p-2">
        <img
          src={cat.image}
          alt={cat.name}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 object-contain"
        />
      </div>
      <p className="text-xs sm:text-sm md:text-sm lg:text-sm font-semibold text-[--blue2] mt-2 ml-1 truncate">
        {cat.name}
      </p>
    </div>
  ))}
</div>

  )
}

export default Categories;