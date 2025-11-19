export const RibbonTag = ({ discount }: { discount: number }) => {
  return (
    <div className="absolute top-1 left-0 z-20 sm:top-1">
      <div className="relative bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 text-white shadow-lg">
        
        <span className="text-[10px] sm:text-[10px] font-bold tracking-wide py-1.5 px-3 sm:py-2 sm:px-4 block drop-shadow-md uppercase">
          {discount}% OFF
        </span>
        <div className="absolute right-0 top-0 w-0 h-0 border-t-[18px] sm:border-t-[22px] border-t-blue-800 border-r-[10px] sm:border-r-[12px] border-r-transparent translate-x-full"></div>
        <div className="absolute right-0 bottom-0 w-0 h-0 border-b-[18px] sm:border-b-[22px] border-b-blue-800 border-r-[10px] sm:border-r-[12px] border-r-transparent translate-x-full"></div>
      </div>
    </div>
  );
};

export default RibbonTag;