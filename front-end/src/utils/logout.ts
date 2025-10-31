import api from "@/api/axios";
import { logout } from "@/slices/authSlice";
import type { AppDispatch } from "@/store";
import { toast } from "sonner";

/**
 * Regular logout - Called by user action (logout button)
 */
export const handleLogoutUser = async (dispatch: AppDispatch, navigate: any) => {
  try {
    // Call logout endpoint to clear server-side cookies
    await api.post("/auth/logout", {});
    
    // Clear local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
    // Clear Redux state
    dispatch(logout());
    
    // Show success message
    toast.success("Logged out successfully");
    
    // Navigate to login (replace to prevent back button)
    navigate("/login", { replace: true });
  } catch (error) {
    console.error("Logout error:", error);
    
    // Even if API call fails, still clear everything locally
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(logout());
    
    // Show info instead of error - logout always succeeds from user perspective
    toast.info("Logged out");
    navigate("/login", { replace: true });
  }
};

/**
 * Silent logout - Called automatically when tokens are invalid
 * Use this in axios interceptor or when detecting invalid auth state
 */
export const handleSilentLogout = (dispatch: AppDispatch, showToast = false) => {
  // Clear storage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  
  // Clear Redux state
  dispatch(logout());
  
  // Optional toast notification
  if (showToast) {
    toast.info("Session expired. Please login again.");
  }
  
  // Use window.location for hard refresh to clear any app state
  window.location.href = "/login";
};

/**
 * Check if user is authenticated (has valid tokens)
 */
export const isAuthenticated = (): boolean => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return !!(accessToken || refreshToken);
};