import { FaEnvelope, FaLock } from "react-icons/fa";
import { Eye, EyeOff, X } from "lucide-react";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { useOtp } from "../hooks/useOtp";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  const {
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
  } = useForgotPassword();

  const {
    otp,
    loading: otpLoading,
    timer,
    resendAllowed,
    inputRefs,
    handleChange,
    handleKeyDown,
    verifyOtp,
    resendOtp,
    setInitialTimer,
  } = useOtp(email, "forgot-password");

  // Set initial timer when OTP is sent
  useEffect(() => {
    if (otpExpiresAt && step === "otp") {
      setInitialTimer(otpExpiresAt);
    }
  }, [otpExpiresAt, step]);

  // Handle modal close
  const handleClose = () => {
    reset();
    onClose();
  };

  // Handle password change and close modal
  const handlePasswordChange = async () => {
    const success = await changePassword();
    if (success) {
      handleClose();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-1">
              Forgot Password
            </h2>
            <p className="text-sm text-gray-600">
              {step === "email" && "Enter your email to receive OTP"}
              {step === "otp" && "Enter the OTP sent to your email"}
              {step === "password" && "Create a new password"}
            </p>
          </div>

          {/* Step 1: Email Input */}
          {step === "email" && (
            <div className="space-y-4">
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3.5 text-blue-900" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <button
                onClick={sendOtp}
                disabled={loading}
                className={`w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-colors shadow-sm text-sm sm:text-base flex items-center justify-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <Spinner />
                    <span>Sending OTP</span>
                  </>
                ) : (
                  <>
                    <span>Send OTP</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === "otp" && (
            <>
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-gray-600 mb-4 text-center">
                  We've sent an OTP to{"  "}
                  <span className="font-semibold text-blue-900   mt-1 sm:mt-0">
                    {email}
                  </span>
                </p>

                {/* OTP Input - Responsive Grid */}
                <div className="flex justify-between gap-2 mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 text-lg sm:text-xl font-semibold outline-none transition-all"
                    />
                  ))}
                </div>

                {/* Timer */}
                <div className="text-center mb-4">
                  {timer > 0 ? (
                    <p className="text-xs sm:text-sm text-gray-800">
                      OTP expires in{" "}
                      <span className="font-semibold text-blue-900">
                        {formatTime(timer)}
                      </span>
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm text-red-600 font-medium">
                      OTP expired
                    </p>
                  )}
                </div>

                {/* Verify Button */}
                <button
                  onClick={() => verifyOtp(handleOtpVerified, () => {})}
                  disabled={loading || timer === 0}
                  className={`w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-colors shadow-sm text-sm sm:text-base flex items-center justify-center gap-2 ${
                    loading || timer === 0
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <Spinner />
                      <span>Verifying</span>
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </button>

                {/* Resend Button */}
                <button
                  onClick={resendOtp}
                  disabled={!resendAllowed || otpLoading}
                  className="w-full py-2 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline disabled:text-gray-400 disabled:no-underline transition-colors"
                >
                  Resend OTP
                </button>

                {/* Cancel Button */}
                <button
                  onClick={handleClose}
                  className="w-full text-xs sm:text-sm text-gray-600 hover:text-gray-800 hover:underline transition-colors"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {/* Step 3: New Password */}
          {step === "password" && (
            <div className="space-y-4">
              <div className="mb-3">
                <div className="relative">
                  <FaLock className="absolute left-3 top-3.5 text-blue-900" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="w-full pl-10 pr-10 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3.5 text-blue-900"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-600 text-xs mt-1 block">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="mb-3">
                <div className="relative">
                  <FaLock className="absolute left-3 top-3.5 text-blue-900" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full pl-10 pr-10 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-blue-900"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-600 text-xs mt-1 block">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <button
                onClick={handlePasswordChange}
                disabled={loading}
                className={`w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-colors shadow-sm text-sm sm:text-base flex items-center justify-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <Spinner />
                    <span>Changing Password</span>
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
