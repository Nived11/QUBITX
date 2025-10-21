import { useState } from "react";
import { X, Info } from "lucide-react";

interface OtpShowModalProps {
  otp: string | null;
  onClose: () => void;
}

const OtpShowModal = ({ otp, onClose }: OtpShowModalProps) => {
  const [showInfo, setShowInfo] = useState(false);

  if (!otp) return null;

  return (
    <div className="fixed top-5 right-5 z-20 bg-white border border-gray-300 rounded-lg shadow-md p-3 w-[280px]">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInfo((prev) => !prev)}
            className="text-blue-600 hover:text-blue-800 ml-2"
            title="Why OTP is shown?"
          >
            <Info size={16}  />
          </button>
        </div>
        <h2 className="text-sm font-semibold text-blue-800">OTP {"->"}</h2>
        <p className="text-lg font-bold tracking-widest text-blue-600">
          {otp.split("").join(" ")}
        </p>

        {/* Info button */}

        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          title="Close"
        >
          <X size={16} />
        </button>
      </div>

      {/* Info text */}
      {showInfo && (
        <p className="text-xs text-gray-800 text-center mt-1">
          OTP is shown because email is not working on free host
        </p>
      )}
    </div>
  );
};

export default OtpShowModal;
