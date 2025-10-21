import { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../../slices/authSlice";
import api from "../../../../api/axios";
import { toast } from "sonner";
import { extractErrorMessages } from "../../../../utils/helpers/extractErrorMessages";

interface FormData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", formData, {
        withCredentials: true,
      });
      dispatch(loginSuccess(res.data.user));
      toast.success("Login successful");
      navigate("/");
    } catch (error: unknown) {
      toast.error(extractErrorMessages(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => navigate("/signup");

  return {
    formData,
    showPassword,
    loading,
    handleChange,
    handleSubmit,
    handleSignUp,
    setShowPassword,
  };
};
