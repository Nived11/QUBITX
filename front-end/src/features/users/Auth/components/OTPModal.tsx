import { useEffect } from "react";
import { useOtp } from "../hooks/useOtp";
import { Spinner } from "@/components/ui/spinner";


interface OTPModalProps {
  email: string;
  purpose: "signup" | "forgot-password";
  expiresAt?: string | null;
  onClose: () => void;
  onVerified: () => void;
   setTestOtp?: (otp: string) => void;
}

const OTPModal = ({ email, purpose, expiresAt, onClose, onVerified, setTestOtp }: OTPModalProps) => {
  const {
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
  } = useOtp(email, purpose);

  // Set initial timer from backend expiresAt
  useEffect(() => {
    if (expiresAt) {
      setInitialTimer(expiresAt);
    }
  }, [expiresAt]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };


  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-100 sm:w-96 text-center">
        <h2 className="text-lg font-semibold mb-2">Enter OTP</h2>
        <p className="text-sm mb-4">
          We've sent an OTP to <span className="font-semibold">{email}</span>
        </p>

        <div className="flex justify-between gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => { inputRefs.current[index] = el; }}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 text-center border border-gray-400 rounded-md focus:ring-1 focus:ring-blue-500 text-lg outline-none"
            />
          ))}
        </div>

        <div className="mb-4 text-sm text-gray-800">
          {timer > 0 ? (
            <>OTP expires in <span className="font-semibold text-blue-900">{formatTime(timer)}</span></>
          ) : (
            <span className="text-red-600 font-medium">OTP expired</span>
          )}
        </div>

        <button
          onClick={() => verifyOtp(onVerified, onClose)}
          disabled={loading}
              className={`w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-colors shadow-sm text-sm sm:text-base flex items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ?
          <>
                  <Spinner />
                  <span>Verifying</span>
                </>:
          "Verify OTP"
        }
        </button>

        <button
         onClick={() => resendOtp((newOtp) => setTestOtp?.(newOtp))}
          disabled={!resendAllowed || loading}
          className="mt-2 w-full py-2 text-sm text-blue-600 hover:underline disabled:text-gray-400"
        >
          Resend OTP
        </button>

        <button
          onClick={onClose}
          className="mt-2 text-sm text-gray-800 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OTPModal;