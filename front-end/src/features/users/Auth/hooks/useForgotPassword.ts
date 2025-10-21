import { useState } from "react";
import { toast } from "sonner";
import api from "../../../../api/axios";
import { extractErrorMessages } from "../../../../utils/helpers/extractErrorMessages";
import { validatePassword, type PasswordErrors } from "../utils/Validators";

export const useForgotPassword = () => {
  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpExpiresAt, setOtpExpiresAt] = useState<string | null>(null);
  const [errors, setErrors] = useState<PasswordErrors>({});

  // Send OTP
  const sendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return false;
    }

    try {
      setLoading(true);
      const response = await api.post("/otp/generate-otp", {
        email,
        purpose: "forgot-password",
      });

      if (response.data.expiresAt) {
        setOtpExpiresAt(response.data.expiresAt);
      }
      toast.success("OTP sent to your email!");

      setStep("otp");
      return true;
    } catch (err: unknown) {
      toast.error(extractErrorMessages(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification success
  const handleOtpVerified = () => {
    setStep("password");
  };

  // Change Password
  const changePassword = async () => {
    const validationErrors = validatePassword(newPassword, confirmPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors ");
      return;
    }

    setErrors({});

    try {
      setLoading(true);
      await api.post("/auth/change-password", { email, newPassword });
      toast.success("Password changed successfully!");
      return true;
    } catch (err: unknown) {
      toast.error(extractErrorMessages(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Reset all states
  const reset = () => {
    setStep("email");
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setOtpExpiresAt(null);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  return {
    step,
    email,
    setEmail,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    loading,
    errors,
    otpExpiresAt,
    sendOtp,
    handleOtpVerified,
    changePassword,
    reset,
  };
};
