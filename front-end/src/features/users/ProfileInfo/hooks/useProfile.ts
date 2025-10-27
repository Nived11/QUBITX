import { useState, useEffect, type ChangeEvent } from "react";
import { toast } from "sonner";
import api from "../../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../../store";
import { loginSuccess } from "../../../../slices/authSlice";
import { setUser } from "../../../../slices/userSlice";

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

  const handlePhoneChange = (value: string) => {
  setFormData((prev) => ({ ...prev, phone: value }));
};

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me", { withCredentials: true });
        const userData = res.data;

        // Update auth slice (name/email/userType)
        dispatch(loginSuccess({
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
      } catch (error: any) {
        console.error("Failed to load user info:", error);
        const errorMessage = error.response?.data?.message || "Failed to load user info";
        toast.error(errorMessage);
      }
    };
    
    // Only fetch if user is authenticated
    if (authUser?.email) {
      fetchUser();
    }
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
        { withCredentials: true }
      );

      const updatedUser = res.data.user;

      // Update auth slice
      dispatch(loginSuccess({
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
      console.error("Failed to update profile:", error);
      const errorMessage = error.response?.data?.message || "Failed to update profile";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    isEditing,
    loading,
    handleChange,
    handleEdit,
    handleCancel,
    handleSave,
    handlePhoneChange
  };
};