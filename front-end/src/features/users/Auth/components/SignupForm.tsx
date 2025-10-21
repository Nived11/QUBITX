import { Eye, EyeOff } from "lucide-react";
import {
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaLock,
  FaFileAlt,
  FaShoppingBag,
  FaStore,
} from "react-icons/fa";
import { Spinner } from "@/components/ui/spinner";
import AuthSidePanel from "../components/AuthSidePanel";
import { useSignup } from "../hooks/useSignup";
import OTPModal from "./OTPModal";
import TermsAndConditions from "./TermsAndConditions";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpShowModal from "./OtpShowModal";

const SignupForm = () => {
  const {
    accountType,
    setAccountType,
    formData,
    handleChange,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    loading,
    errors,
    handleSubmit,
    handlePhoneChange,
    handleSignIn,
    otpEmail,
    otpExpiresAt,
    testOtp,
    setTestOtp,
    handleOtpVerified,
    handleOtpClose,
  } = useSignup();
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <>
      <div className="lg:h-screen sm:min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
        {/* Left Section */}
        <AuthSidePanel
          title="Join the Qubitx Community!"
          subtitle="Create your account to start exploring, connecting, and growing with us."
        />

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-4 lg:py-4 bg-white">
          <div className="w-full max-w-xl lg:overflow-y-auto lg:max-h-screen py-8 px-2 bg-white scrollbar-hide">
            <div className="mb-4 lg:mb-6 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-1">
                Create Account
              </h1>
              <p className="text-sm sm:text-base text-blue-900">
                Sign up to get started
              </p>
            </div>

            <div className="space-y-3 lg:space-y-3.5 ">
              {/* Account Type */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-blue-900 mb-2">
                  Account Type
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType("buyer")}
                    className={`flex-1 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all text-sm sm:text-base ${
                      accountType === "buyer"
                        ? "bg-blue-800 text-white shadow-md"
                        : "bg-gray-300 text-blue-900 hover:bg-gray-400 hover:text-white"
                    }`}
                  >
                    <FaShoppingBag /> Buyer
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType("seller")}
                    className={`flex-1 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all text-sm sm:text-base ${
                      accountType === "seller"
                        ? "bg-blue-800 text-white shadow-md"
                        : "bg-gray-300 text-blue-900 hover:bg-gray-400 hover:text-white"
                    }`}
                  >
                    <FaStore /> Seller
                  </button>
                </div>
              </div>

              {/* Name */}
              <div className="mb-3">
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none placeholder:text-gray-500"
                  />
                </div>
                {errors.name && (
                  <span className="text-red-600 text-xs mt-1 block">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none placeholder:text-gray-500"
                />
              </div>
              {errors.email && (
                  <span className="text-red-600 text-xs mt-1 block">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Phone */}
 <div className="mb-3">
              <div className="relative">
                <PhoneInput
                  country={"in"}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: false,
                  }}
                  containerClass="w-full"
                  inputClass="w-full !pl-12 pr-3 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none placeholder:text-gray-500"
                  buttonClass="!border !border-gray-400 !bg-white !rounded-l-md "
                  dropdownClass="!z-50"
                  enableSearch={true}
                  searchPlaceholder="Search country"
                  containerStyle={{ width: "100%" }}
                  inputStyle={{
                    width: "100%",
                    height: "42px",
                    fontSize: "14px",
                    paddingLeft: "48px",
                  }}
                  buttonStyle={{
                    border: "1px solid rgb(156, 163, 175)",
                    borderRadius: "0.5rem 0 0 0.5rem",
                    backgroundColor: "white",
                  }}
                />
              </div>
              {errors.phone && (
                  <span className="text-red-600 text-xs mt-1 block">
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                 <div className="mb-3">
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none placeholder:text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-900"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none placeholder:text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-900"
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
              
              </div>

              {/* Seller Fields */}
              {accountType === "seller" && (
                <>
                <div className="mb-3">
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900" />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none placeholder:text-gray-500"
                    />
                  </div>
                  {errors.companyName && (
                  <span className="text-red-600 text-xs mt-1 block">
                    {errors.companyName}
                  </span>
                )}
                  </div>
                  <div className="mb-3">
                  <div className="relative">
                    <FaFileAlt className="absolute left-3 top-3 text-blue-900" />
                    <label
                      htmlFor="proofDocument"
                      className="w-full pl-10 pr-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none flex items-center justify-between cursor-pointer bg-white hover:bg-blue-50"
                    >
                      <span
                        className={`${
                          formData.proofDocument
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {formData.proofDocument?.name ||
                          "Upload proof document"}
                      </span>
                      <span className="text-blue-700 font-semibold text-sm">
                        Browse
                      </span>
                    </label>
                    <input
                      type="file"
                      id="proofDocument"
                      name="proofDocument"
                      accept="image/*,.pdf"
                      onChange={handleChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  {errors.proofDocument && (
                  <span className="text-red-600 text-xs mt-1 block">
                    {errors.proofDocument}
                  </span>
                )}
                  </div>
                </>
              )}

              {/* Terms */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-blue-800 border-gray-400 rounded focus:ring-blue-800 cursor-pointer"
                />
                <label className="text-xs sm:text-sm text-gray-800">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                  >
                    Terms and Conditions
                  </button>
                </label>
                {errors.termsAccepted && (
                  <span className="text-red-600 text-xs mt-1 block">
                    {errors.termsAccepted}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-colors shadow-sm text-sm sm:text-base mt-2 flex justify-center items-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <Spinner />
                    <span>Sending OTP</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>

              {/* Sign In */}
              <p className="text-center text-sm sm:text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <button
                  onClick={handleSignIn}
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      {showTermsModal && (
        <TermsAndConditions onClose={() => setShowTermsModal(false)} />
      )}
      {testOtp && (
  <OtpShowModal otp={testOtp} onClose={() => setTestOtp(null)} />
)}
      {otpEmail && (
        
        <OTPModal
          email={otpEmail}
          purpose="signup"
          expiresAt={otpExpiresAt}
          onVerified={handleOtpVerified}
          onClose={handleOtpClose}
        />
      )}
    </>
  );
};

export default SignupForm;
