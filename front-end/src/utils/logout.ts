import api from "@/api/axios"; // your axios instance
import { logout } from "@/slices/authSlice";
import type { AppDispatch } from "@/store";
import { toast } from "sonner";

export const handleLogoutUser = async (dispatch: AppDispatch, navigate: any) => {
  try {
    await api.post("/auth/logout", {}, { withCredentials: true });
    toast.success("Logged out successfully");
  } catch (error) {
    toast.error("Logout failed");
    console.error("Logout error:", error);
  } finally {
    dispatch(logout());
    navigate("/login");
  }
};
