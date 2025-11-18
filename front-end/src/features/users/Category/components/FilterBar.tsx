import { useState } from "react";
import { FiFilter, FiX, FiDollarSign } from "react-icons/fi";

interface FilterBarProps {
  minPrice: string;
  maxPrice: string;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  onApply: () => void;  
  onReset: () => void;  
}


const FilterBar = ({ minPrice, maxPrice, setMinPrice, setMaxPrice , onApply, onReset}: FilterBarProps) => {
  const [showFilter, setShowFilter] = useState(false);

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setShowFilter(false);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        className="md:hidden flex items-center gap-1 bg-white border border-blue-800 text-blue-800 px-2 py-2 rounded-md shadow text-sm"
        onClick={() => setShowFilter(true)}
      >
        <FiFilter className="text-blue-800" />
      </button>

      {/* Mobile Dim Background */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setShowFilter(false)}
        />
      )}

      {/* Filter Sidebar */}
      <div
        className={`
          bg-white
           border-r-2 border-blue-800 md:border-r-2 md:border-blue-800/50  
          shadow-xl md:shadow-none
          h-full md:h-screen
          w-72 md:w-80
          fixed md:relative top-[116px]  md:top-0 left-0 md:z-0 z-50
          transform md:transform-none transition-transform duration-300
          ${showFilter ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Mobile Header */}
        <div className="flex justify-between items-center border-b p-4 md:hidden">
          <h2 className="text-lg font-semibold text-blue-800">Filters</h2>
          <button onClick={() => setShowFilter(false)}>
            <FiX className="text-xl text-blue-800 hover:text-red-500" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block border-b border-blue-800/50 px-4 py-3">
          <h2 className="flex items-center  text-lg font-semibold text-blue-800">
        <FiFilter className="text-blue-800 mr-2" />
            
            Filters</h2>
        </div>

        {/* Body */}
        <div className="p-4 space-y-5">
          {/* Min Price */}
          <div>
            <label className="flex items-center text-sm font-medium text-blue-800 mb-1 gap-1">
              <FiDollarSign className="text-blue-800" /> Min Price
            </label>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border  border-gray-400 rounded-md px-2 py-2 text-sm focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="flex items-center text-sm font-medium text-blue-800 mb-1 gap-1">
              <FiDollarSign className="text-blue-800" /> Max Price
            </label>
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-gray-400 rounded-md px-2 py-2 text-sm focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 flex flex-col gap-2">
       <button
  onClick={() => {
    setShowFilter(false);
    onApply();
  }}
  className="w-full bg-blue-800 text-white py-2 rounded-md font-medium hover:bg-blue-700"
>
  Apply Filters
</button>
<button
  onClick={() => {
    resetFilters();
    onReset();
  }}
  className="w-full bg-white border-2 border-gray-400 text-blue-800 py-2 rounded-md font-medium"
>
  Reset
</button>
        </div>
      </div>
    </>
  );
};

export default FilterBar;
