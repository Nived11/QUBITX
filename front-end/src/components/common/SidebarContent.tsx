import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiUser,
  FiMapPin,
  FiPackage,
  FiLogOut,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { handleLogoutUser } from "@/utils/logout";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

interface SidebarContentProps {
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const SidebarContent = ({ setIsMobileMenuOpen }: SidebarContentProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = async () => {
    await handleLogoutUser(dispatch, navigate);
    setIsMobileMenuOpen?.(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen?.(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-white/40 text-white shadow-md scale-105"
        : "text-white bg-white/10 hover:bg-white/20"
    }`;

  return (
    <>
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.15) 10px,
              rgba(255, 255, 255, 0) 20px
            )`,
          }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col items-center mb-8 mt-4">
        <div className="w-25 h-25 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
          <img
            src="https://img.freepik.com/premium-photo/cartoon-logo-penguin_643934-1347.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
        </div>
        <h2 className="text-white text-xl font-bold"> 
          Hello {user?.name ? user.name.split(" ")[0].charAt(0).toUpperCase() + user.name.split(" ")[0].slice(1) : ""}{" "}!
          </h2>
      </div>

      {/* sidebar nav */}
      <nav className="flex flex-col gap-3 relative z-10 pb-6">
        <NavLink to="/" onClick={handleNavClick} className={navLinkClass}>
          <FiHome className="text-xl" />
          <span className="font-medium">Home</span>
        </NavLink>

        <NavLink
          to="/profile"
          end
          onClick={handleNavClick}
          className={navLinkClass}
        >
          <FiUser className="text-xl" />
          <span className="font-medium">Profile Info</span>
        </NavLink>

        <NavLink to="orders" onClick={handleNavClick} className={navLinkClass}>
          <FiShoppingBag className="text-xl" />
          <span className="font-medium">My Orders</span>
        </NavLink>

        <NavLink
          to="user-address"
          onClick={handleNavClick}
          className={navLinkClass}
        >
          <FiMapPin className="text-xl" />
          <span className="font-medium">Address</span>
        </NavLink>

          <NavLink
            to="sell-products"
            onClick={handleNavClick}
            className={navLinkClass}
          >
            <FiPackage className="text-xl" />
            <span className="font-medium">My Products</span>
          </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white bg-red-500/60 hover:bg-red-500/80 transition-all duration-300 mt-10"
        >
          <FiLogOut className="text-xl" />
          <span className="font-medium">Logout</span>
        </button>
      </nav>
    </>
  );
};

export default SidebarContent;
