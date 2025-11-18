import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useSearchProducts } from "@/hooks/useSearchProducts";

const placeholderTexts = [
  " laptops...",
  " tablets...",
  " mobiles...",
  " speakers...",
  " earbuds...",
  " cameras...",
  " accessories...",
  " headphones...",
  " smart watches...",
  " smart home...",
  " gaming...",
  " printers...",
];

const SearchBar = () => {
  const { query, setQuery, results, loading } = useSearchProducts();
  const [showDropdown, setShowDropdown] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typedOnce, setTypedOnce] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); 
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Typing effect for placeholder
  useEffect(() => {
    const currentText = placeholderTexts[placeholderIndex];
    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setPlaceholder((prev) => prev + currentText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 70);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setPlaceholder("");
        setCharIndex(0);
        setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, placeholderIndex]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Track when user typed and results are fetched
useEffect(() => {
  if (typedOnce && query.trim() !== "" && results.length >= 0) {
    setHasSearched(true);
  } else {
    setHasSearched(false); // reset if query is empty
  }
}, [results, typedOnce, query]);


  return (
    <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-md" ref={dropdownRef}>
      {/* Search Input */}
      <FiSearch
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900"
      />
      <input
        type="text"
        placeholder={"search" + placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (!typedOnce) setTypedOnce(true);
        }}
        onFocus={() => setShowDropdown(true)}
        className="placeholder:text-gray-900/80 w-full rounded-full border-2 border-blue-800 text-gray-900 py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-300 text-sm sm:text-base md:text-base md:py-1.5"
      />

      {/* Dropdown */}
{showDropdown && typedOnce && query.trim() !== "" && (
 <div
  className={`
    top-[112px]
    sm:top-14
    ${showDropdown ? "block" : "hidden"}
    left-0
    sm:left-1/2 sm:-translate-x-1/2
    w-screen sm:w-[600px]
    fixed sm:absolute
    scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
    bg-white  border-b-2 border-blue-700 shadow-lg rounded-b-md mt-1 max-h-60 overflow-y-auto z-50
  `}
   style={{
    scrollbarWidth: "thin",
  }}
>

    {loading ? (
      <div className="p-2 text-center text-gray-500 text-sm">Loading...</div>
    ) : hasSearched && results.length === 0 ? (
      <div className="p-2 text-center text-gray-500 text-sm">No products found</div>
    ) : (
      results.map((product) => (
        <div
          key={product._id}
          onClick={() => {
            navigate(`/product/${product._id}`);
            setQuery("");
            setShowDropdown(false);
            setTypedOnce(false);
            setHasSearched(false);
          }}
          className="flex items-center gap-2 p-2 hover:bg-blue-50 cursor-pointer"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 bg-white rounded-md shadow-md overflow-hidden">
            <img
              src={product.images?.[0] || "https://via.placeholder.com/100"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</span>
            <span className="text-xs text-gray-600">
              ₹{product.discountedPrice}{" "}
              {product.discountedPrice !== product.actualPrice && (
                <span className="line-through ml-1 text-gray-400">
                  ₹{product.actualPrice}
                </span>
              )}
            </span>
          </div>
        </div>
      ))
    )}
  </div>
)}

    </div>
  );
};

export default SearchBar;
