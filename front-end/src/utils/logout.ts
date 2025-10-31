import api from "@/api/axios";
import { logout } from "@/slices/authSlice";
import type { AppDispatch } from "@/store";
import { toast } from "sonner";
import { resetSellerProducts } from "@/slices/sellerProductSlice";


export const handleLogoutUser = async (dispatch: AppDispatch, navigate: any) => {
  try {
    await api.post("/auth/logout");
    
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.setItem("manualLogout", "true");
    dispatch(logout());
    dispatch(resetSellerProducts());
    toast.success("Logged out successfully");
    
    navigate("/login");
  } catch (error) {
    console.error("Logout error:", error);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.setItem("manualLogout", "true");
    dispatch(logout());
    
    toast.info("Logged out");
    navigate("/login");
  }
};


export const handleSilentLogout = (dispatch: AppDispatch, showToast = false) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  
  
  dispatch(logout());
  dispatch(resetSellerProducts());
  
  if (showToast) {
    toast.info("Session expired. Please login again.");
  }
  window.location.href = "/login";
};

export const isAuthenticated = (): boolean => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return !!(accessToken || refreshToken);
};