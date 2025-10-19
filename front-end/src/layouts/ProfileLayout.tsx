import { Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import SidebarContent from "../components/common/SidebarContent";

const ProfileLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex min-h-screen  ">
      {!isMobileMenuOpen && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className=" md:hidden absolute top-[8rem] left-2  p-2.5 bg-gradient-to-br from-blue-600 to-blue-900 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Open menu"
        >
          <FiMenu className="text-sm" />
        </button>
      )}

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-[70]"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <aside
        className={` md:hidden fixed top-0 left-0 h-full w-[280px] bg-gradient-to-br from-[#102362] to-[#140b5b] shadow-xl overflow-y-auto z-[80] transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 relative">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 text-white hover:bg-white/10 rounded-lg transition-all"
            aria-label="Close menu"
          >
            <FiX className="text-2xl" />
          </button>
          <SidebarContent setIsMobileMenuOpen={setIsMobileMenuOpen} />
        </div>
      </aside>

      <aside className="mt-1 mb-1 rounded-r-lg hidden md:block w-[250px] h-[] flex-shrink-0 bg-gradient-to-br from-[#102362] to-[#140b5b] p-6 shadow-xl relative overflow-hidden">
        <SidebarContent />
      </aside>

      <main className="w-full md:flex-1 mt-12 md:mt-0   overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
