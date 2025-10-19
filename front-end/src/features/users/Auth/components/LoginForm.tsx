import AuthSidePanel from "../components/AuthSidePanel";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "../hooks/useLogin";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const LoginForm = () => {
  const {
    formData,
    showPassword,
    loading,
    handleChange,
    handleSubmit,
    handleSignUp,
    setShowPassword,
  } = useLogin();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
      {/* Left Side - Blue Section */}
      <AuthSidePanel
        title="Welcome back!"
        subtitle=" Enter your credentials to access your account and continue your journey with us."
      />

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-6 lg:mb-8 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-2">
              Welcome Back!
            </h1>
            <p className="text-sm sm:text-base text-blue-900">
              Login to continue
            </p>
          </div>

          <div className="space-y-4 lg:space-y-5">
            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3.5 text-blue-900" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 sm:pl-10 sm:pr-4 py-2.5 sm:py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm sm:text-base placeholder:text-gray-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-blue-900" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 sm:pl-10 sm:pr-10 py-2.5 sm:py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm sm:text-base placeholder:text-gray-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-blue-900"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-end text-xs sm:text-sm">
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button with Loading */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-colors shadow-sm text-sm sm:text-base flex items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span>Logging in</span>
                </>
              ) : (
                "Log In"
              )}
            </button>

            <p className="text-center text-sm sm:text-sm text-gray-600 mt-5 lg:mt-6">
              Don't have an account?{" "}
              <button
                onClick={handleSignUp}
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
};

export default LoginForm;
