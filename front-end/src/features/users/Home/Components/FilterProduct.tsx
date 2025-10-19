import { useState } from "react";
import { FiFilter, FiX, FiTag, FiDollarSign } from "react-icons/fi";

const FilterProduct = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setCategory("");
  };

  return (
    <>
      <button
        className=" flex items-center gap-1 sm:gap-2 bg-white border border-blue-800 text-blue-800 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md  transition cursor-pointer shadow-md text-xs sm:text-base"
        onClick={() => setShowFilter(true)}
      >
        <FiFilter className="text-sm sm:text-lg text-blue-600" />
        <span className="hidden sm:inline">Filter</span>
        <span className="sm:hidden">Filter</span>
      </button>

      {showFilter && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setShowFilter(false)}
        ></div>
      )}

      <div
        className={`mt-[120px] border border-[3px] border-r-blue-800 border-t-blue-800 sm:mt-20 fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          showFilter ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold text-blue-800">
            Filter Products
          </h2>
          <button onClick={() => setShowFilter(false)}>
            <FiX className="text-xl text-blue-800 hover:text-red-500" />
          </button>
        </div>

        <div className="p-4 space-y-5">
        <div>
            <label className="flex items-center text-sm font-medium text-blue-800 mb-1 gap-1">
              <FiTag className="text-blue-800" /> Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="Smartphones">Smartphones</option>
              <option value="Laptops">Laptops</option>
              <option value="Headphones">Headphones</option>
              <option value="Watches">Watches</option>
              <option value="Speakers">Speakers</option>
            </select>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-blue-800 mb-1 gap-1">
              <FiDollarSign className="text-blue-800" /> Min Price
            </label>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-blue-800 mb-1 gap-1">
              <FiDollarSign className="text-blue-800" /> Max Price
            </label>
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="px-4 pb-4 flex flex-col gap-2">
          <button
            onClick={() => setShowFilter(false)}
            className="w-full bg-blue-800 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="w-full bg-white border-2 border-gray-500  text-blue-800 hover:text-gray-800 py-2 rounded-md font-medium"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterProduct;
