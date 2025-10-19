import { useEffect, useRef, useState } from "react";
import { toast } from "sonner"
import api from "../../../../api/axios";

export const useOtp = (email: string, purpose: "signup" | "forgot-password") => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [resendAllowed, setResendAllowed] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Calculate remaining time from backend expiresAt
  const calculateRemainingTime = (expiresAt: string) => {
    const expiryTime = new Date(expiresAt).getTime();
    const currentTime = Date.now();
    const remainingSeconds = Math.floor((expiryTime - currentTime) / 1000);
    return remainingSeconds > 0 ? remainingSeconds : 0;
  };

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) {
      setResendAllowed(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP input change
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace focus
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const verifyOtp = async (onVerified: () => void, onClose: () => void) => {
    const otpCode = otp.join("");
    if (otpCode.length < 6) return toast.error("Enter 6-digit OTP");

    try {
      setLoading(true);
      await api.post("/otp/verify-otp", { email, otp: otpCode, purpose });
      toast.success("OTP verified successfully!");
      onVerified();
      onClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    try {
      setLoading(true);
      const response = await api.post("/otp/generate-otp", { email, purpose });
      
      // Use backend expiresAt to set timer
      if (response.data.expiresAt) {
        const remainingTime = calculateRemainingTime(response.data.expiresAt);
        setTimer(remainingTime);
      }
      
      toast.success("OTP resent to email!");
      setResendAllowed(false);
      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // Function to set initial timer (call this from component)
  const setInitialTimer = (expiresAt: string) => {
    const remainingTime = calculateRemainingTime(expiresAt);
    setTimer(remainingTime);
    setResendAllowed(false);
  };

  return {
    otp,
    loading,
    timer,
    resendAllowed,
    inputRefs,
    handleChange,
    handleKeyDown,
    verifyOtp,
    resendOtp,
    setInitialTimer,
  };
};