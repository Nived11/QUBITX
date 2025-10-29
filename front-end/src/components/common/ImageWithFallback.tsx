import { useState } from "react";

const ImageWithFallback = ({ src, alt }: { src: string; alt: string }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Skeleton shimmer while loading */}
      {isLoading && !isError && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      )}

      {/* Error Placeholder */}
      {isError ? (
        <div className="flex flex-col items-center justify-center text-gray-500 gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 sm:w-12 sm:h-12 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3l18 18M9.88 9.88l-6.76 6.76a1.5 1.5 0 001.06 2.56h13.64a1.5 1.5 0 001.06-2.56l-6.76-6.76M13.12 13.12L21 5.25a1.5 1.5 0 00-1.06-2.56H6.3a1.5 1.5 0 00-1.06 2.56l7.88 7.88z"
            />
          </svg>
          <span className="text-xs sm:text-sm font-medium">Image Not Found</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsError(true)}
          className={`object-contain h-full w-full transition-transform duration-500 ease-in-out ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
    </div>
  );
};

export default ImageWithFallback;
