import api from "@/api/axios";
import { logout } from "@/slices/authSlice";
import type { AppDispatch } from "@/store";
import { toast } from "sonner";
import { persistor } from "@/store";
import { resetSellerProducts } from "@/slices/sellerProductSlice";

export const handleLogoutUser = async (dispatch: AppDispatch) => {
  try {
    await api.post("/auth/logout");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.setItem("manualLogout", "true");
    dispatch(logout());
    dispatch(resetSellerProducts());
    persistor.purge();
    toast.success("Logged out successfully");

    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  } catch (error) {
    console.error("Logout error:", error);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.setItem("manualLogout", "true");
    dispatch(logout());

    toast.info("Logged out");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  }
};

export const handleSilentLogout = (
  dispatch: AppDispatch,
  showToast = false
) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  dispatch(logout());
  dispatch(resetSellerProducts());
  persistor.purge();

  if (showToast) {
    toast.info("Session expired. Please login again.");
  }
  setTimeout(() => {
    window.location.href = "/login";
  }, 2000);
};

export const isAuthenticated = (): boolean => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return !!(accessToken || refreshToken);
};
