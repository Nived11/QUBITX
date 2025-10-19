import AppName from "./AppName";
import { FiUser, FiShoppingCart, FiSearch } from "react-icons/fi";
import { MdSell } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    setIsDropdownOpen(false);
  };

  const handleProfile = () => {
    navigate("/profile");
    setIsDropdownOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="px-4 py-3 sm:py-4">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-4">
          <div
            onClick={() => navigate("/")}
            className="logo text-3xl sm:text-3xl md:text-3xl font-bold text-blue-800 cursor-pointer"
          >
            {AppName}
          </div>
          <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-md order-3 sm:order-2">
            <FiSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-800"
            />
            <input
              type="text"
              placeholder="Search..."
              className="placeholder:text-blue-800 w-full rounded-full border-2 border-blue-800 text-blue-800 py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-300 text-sm sm:text-base md:text-base md:py-1.5"
            />
          </div>

          <div className="flex items-center gap-5 sm:gap-4 md:gap-6 order-2 sm:order-3">
            <button className="group relative flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 py-1 sm:py-1.5 md:px-3 md:py-1 rounded-full text-white font-medium shadow-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 transform transition hover:scale-105 text-xs sm:text-sm md:text-base overflow-hidden">
              <span className="relative z-20 flex items-center gap-1">
                <MdSell className="sm:!w-4 sm:!h-4 md:!w-4 md:!h-4" />
                <p className="text-xs sm:text-xs md:text-sm">Sell</p>
              </span>
              <span className="absolute inset-0 z-10 bg-gradient-to-r from-blue-600 to-blue-800 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
            </button>

            <button 
            onClick={() => navigate("/cart")}
            className="relative p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-blue-100 transform transition hover:scale-105">
              <FiShoppingCart className="text-blue-800 text-xl sm:text-xl md:text-xl" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                2
              </span>
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2.5 sm:p-3 md:p-3 rounded-full bg-gradient-to-r from-blue-800 to-blue-600 shadow-md border-2 border-white hover:opacity-90 transform transition hover:scale-105"
              >
                <FiUser className="text-white text-xl sm:text-xl md:text-xl" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-3 mt-2 w-[150px] text-base text-gray-900 font-semibold bg-white rounded-br-[30px] rounded-tl-[30px] border border-l-[4px] border-r-[4px] border-l-blue-700 border-r-blue-700 border-blue-500 shadow-lg py-1 z-50">
                  <button
                    onClick={handleProfile}
                    className="group relative w-full px-4 py-2 mb-1 rounded-tl-[30px] border border-l-[4px] border-r-[4px] text-left overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-400">
                      <FiUser className="text-lg" />
                      <span>Profile</span>
                    </span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="group relative w-full px-4 py-2 rounded-br-[30px] border border-l-[4px] border-r-[4px] text-left overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-red-300 to-red-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Logout</span>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;