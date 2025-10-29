import { motion } from "framer-motion";

const SwingingTag = ({ discount }: { discount: number }) => {
  return (
    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 flex flex-col items-center">
      {/* String */}
      <div className="w-[1px] h-2 sm:h-3 bg-blue-300"></div>

      {/* Tag */}
      <motion.div
        animate={{
          rotate: [5, -5, 5], // rotate between +5° and -5° smoothly
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white
          px-2 sm:px-3 py-[2px] sm:py-[4px] rounded-md shadow-md border border-blue-400/30
          backdrop-blur-sm origin-top"
      >
        {/* Hole */}
        <div className="absolute -top-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-white rounded-full border-[1.5px] border-blue-800 shadow-inner"></div>

        {/* Gloss overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-white/10 to-transparent rounded-md pointer-events-none"></div>

        {/* Discount text */}
        <span className="text-[8px] sm:text-[10px] md:text-xs font-semibold tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
          {discount}% OFF
        </span>

        {/* Bottom notch */}
        <div className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-blue-900/90"></div>
      </motion.div>
    </div>
  );
};

export default SwingingTag;
