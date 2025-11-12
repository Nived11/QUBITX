import AppName from "./AppName";
import {
  FiUser,
  FiShoppingCart,
  FiSearch,
  FiLogOut,
  FiMapPin,
  FiPackage,
  FiShoppingBag,
  FiHeart,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutUser } from "@/utils/logout";
import type { RootState } from "@/store";
import { useFetchCart } from "@/features/users/Cart/hooks/useFetchCart";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
 const { cart } = useFetchCart();

const cartCount = cart?.items?.length || 0;



  // detect click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await handleLogoutUser(dispatch);
    setIsDropdownOpen(false);
  };

  const userInitial =
    user?.email || user?.name ? (user?.name?.[0] || "").toUpperCase() : "";

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="px-4 py-3 sm:py-4">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-4">
          <div
            onClick={() => navigate("/")}
            className="logo text-3xl sm:text-3xl md:text-3xl bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text font-bold text-blue-900 cursor-pointer"
          >
            {AppName}
          </div>
          <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-md order-3 sm:order-2">
            <FiSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900"
            />
            <input
              type="text"
              placeholder="Search..."
              className="placeholder:text-gray-900 w-full rounded-full border-2 border-blue-800 text-gray-900 py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-300 text-sm sm:text-base md:text-base md:py-1.5"
            />
          </div>

          <div className="flex items-center gap-5 sm:gap-4 md:gap-6 order-2 sm:order-3">
            {isAuthenticated && (
              <>
                <button
                  onClick={() => navigate("/wishlist")}
                  className="relative p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-red-100 transform transition hover:scale-105"
                >
                  <FiHeart className="text-gray-800 text-xl sm:text-xl md:text-xl" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    3
                  </span>
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  className="relative p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-blue-100 transform transition hover:scale-105"
                >
                  <FiShoppingCart className="text-gray-900 text-xl sm:text-xl md:text-xl" />
                  {cartCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-700 text-xs text-white">
          {cartCount}
        </span>
      )}
                </button>
              </>
            )}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-900 to-blue-600 shadow-md border-2 border-white hover:opacity-95 transform transition hover:scale-105"
              >
                {userInitial ? (
                  <span className="text-white font-semibold ">
                    {userInitial}
                  </span>
                ) : (
                  <FiUser className="text-white text-xl sm:text-2xl" />
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-3 mt-2 w-[150px] text-sm text-gray-900 font-semibold bg-white rounded-br-[30px] rounded-tl-[30px] border border-l-[4px] border-r-[4px] border-l-blue-700 border-r-blue-700 border-blue-500 shadow-lg py-1 z-50">
                  {!isAuthenticated ? (
                    <button
                      onClick={() => {
                        navigate("/login");
                        setIsDropdownOpen(false);
                      }}
                      className="group relative w-full px-4 py-2 mb-1 rounded-tl-[30px] rounded-br-[28px] border border-l-[4px] border-r-[4px] text-left overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                      <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-400">
                        <FiUser className="text-lg" />
                        <span>Login</span>
                      </span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => { navigate("/profile"); setIsDropdownOpen(false); }}
                        className="group relative w-full px-4 py-2 mb-1 rounded-tl-[30px] border border-l-[4px] border-r-[4px] text-left overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-400">
                          <FiUser className="text-lg" />
                          <span>Profile</span>
                        </span>
                      </button>
                      <button
                         onClick={() => { navigate("/profile/orders"); setIsDropdownOpen(false); }}
                        className="group relative w-full px-4 py-2 mb-1  border border-l-[4px] border-r-[4px] text-left overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-400">
                          <FiShoppingBag className="text-xl" />
                          <span>My Orders</span>
                        </span>
                      </button>
                      <button
                       onClick={() => { navigate("/profile/user-address"); setIsDropdownOpen(false); }}
                        className="group relative w-full px-4 py-2 mb-1  border border-l-[4px] border-r-[4px] text-left overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-400">
                          <FiMapPin className="text-xl" />
                          <span>Address</span>
                        </span>
                      </button>

                        <button
                           onClick={() => { navigate("/profile/sell-products"); setIsDropdownOpen(false); }}
                          className="group relative w-full px-4 py-2 mb-1  border border-l-[4px] border-r-[4px] text-left overflow-hidden"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                          <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-400">
                            <FiPackage className="text-xl" />
                            <span>Sell Items</span>
                          </span>
                        </button>
                      <button
                        onClick={handleLogout}
                        className="group relative w-full px-4 py-2 rounded-br-[30px] border border-l-[4px] border-r-[4px] text-left overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-red-300 to-red-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-400">
                          <FiLogOut className="text-lg" />
                          <span>Logout</span>
                        </span>
                      </button>
                    </>
                  )}
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
