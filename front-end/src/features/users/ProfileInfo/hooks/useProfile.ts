import { useState, useEffect, type ChangeEvent } from "react";
import { toast } from "sonner";
import api from "../../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../../store";
import { loginSuccess } from "../../../../slices/authSlice";
import { setUser } from "../../../../slices/userSlice";
import { extractErrorMessages } from "@/utils/helpers/extractErrorMessages";

interface ProfileData {
  name: string;
  phone: string;
  email: string;
}

export const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const userProfile = useSelector((state: RootState) => state.user.user);

  const [formData, setFormData] = useState<ProfileData>({
    name: authUser?.name || "",
    phone: authUser?.phone || userProfile?.phone || "",
    email: authUser?.email || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  // Fetch user info with retry logic for cold starts
  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;

    const fetchUser = async () => {
      // If we already have user data, skip the loading state
      if (authUser?.email && userProfile) {
        setFormData({
          name: authUser.name || "",
          phone: authUser.phone || userProfile.phone || "",
          email: authUser.email || "",
        });
        setInitialLoading(false);
        return;
      }

      try {
        setInitialLoading(true);
        const res = await api.get("/user/me");
        
        if (!isMounted) return;
        
        const userData = res.data;

        // Update auth slice (name/email/userType)
        dispatch(loginSuccess({
          _id: userData._id || userData.id,
          email: userData.email,
          name: userData.name,
          userType: userData.userType,
          phone: userData.phone,
          companyName: userData.companyName,
          companyProof: userData.companyProof,
        }));

        // Update user slice (full user data)
        dispatch(setUser({
          _id: userData._id || userData.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone || "",
          userType: userData.userType,
          companyName: userData.companyName,
          companyProof: userData.companyProof,
        }));

        setFormData({
          name: userData.name || "",
          phone: userData.phone || "",
          email: userData.email || "",
        });
        
        setInitialLoading(false);
      } catch (error: any) {
        if (!isMounted) return;

        // Handle 401 (token expired) - try to refresh
        if (error.response?.status === 401) {
          console.log("Token expired, will be handled by axios interceptor");
          setInitialLoading(false);
          return;
        }

        // Handle network errors (cold start) with retry
        if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Retrying fetch (${retryCount}/${maxRetries}) - backend may be waking up...`);
            toast.info(`Connecting to server... (attempt ${retryCount}/${maxRetries})`);
            
            // Exponential backoff: 2s, 4s, 8s
            const delay = Math.pow(2, retryCount) * 1000;
            setTimeout(() => {
              if (isMounted) fetchUser();
            }, delay);
            return;
          } else {
            toast.error("Unable to connect to server. Please refresh the page.");
          }
        } else {
          console.error("Failed to load user info:", error);
          const errorMessage = error.response?.data?.message || "Failed to load user info";
          toast.error(errorMessage);
        }
        
        setInitialLoading(false);
      }
    };
    
    // Only fetch if user is authenticated
    if (authUser?.email) {
      fetchUser();
    } else {
      setInitialLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, authUser?.email]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);
  
  const handleCancel = () => {
    // Reset form data to current user data
    setFormData({
      name: authUser?.name || "",
      phone: authUser?.phone || userProfile?.phone || "",
      email: authUser?.email || "",
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await api.put(
        "/user/update",
        { name: formData.name, phone: formData.phone },
      );

      const updatedUser = res.data.user;

      // Update auth slice
      dispatch(loginSuccess({
        _id: updatedUser._id || updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        userType: updatedUser.userType,
        phone: updatedUser.phone,
        companyName: updatedUser.companyName,
        companyProof: updatedUser.companyProof,
      }));

      // Update user slice
      dispatch(setUser({
        _id: updatedUser._id || updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone || "",
        userType: updatedUser.userType,
        companyName: updatedUser.companyName,
        companyProof: updatedUser.companyProof,
      }));

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(extractErrorMessages(error) || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    isEditing,
    loading,
    initialLoading, // Add this to show loading state in UI
    handleChange,
    handleEdit,
    handleCancel,
    handleSave,
    handlePhoneChange
  };
};