import api from "@/api/axios";
import { setUser } from "@/slices/authSlice";
import type { AppDispatch } from "@/store";


export const syncUserData = async (dispatch: AppDispatch) => {
  try {
    const response = await api.get("/user/me");    
    if (response.data) {
      dispatch(setUser(response.data));
      return response.data;
    }
    return null;
  } catch (error) {
    return null;
  }
};