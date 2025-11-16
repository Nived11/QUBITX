import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/slices/authSlice"; // ✅ Changed from setAuthUser
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import api from "@/api/axios";
import { type RootState } from "@/store";

const BecomeSeller = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  
  const [companyName, setCompanyName] = useState("");
  const [companyProof, setCompanyProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName || !companyProof) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("companyProof", companyProof);

      const response = await api.post("/user/request-seller", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update auth state with new seller status (persisted)
      if (response.data.user) {
        dispatch(setUser(response.data.user)); // ✅ Changed from setAuthUser
      }

      toast.success(response.data.message || "Seller request submitted successfully!");
      
      // Clear form
      setCompanyName("");
      setCompanyProof(null);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to submit request";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Show different UI based on seller status
  if (user?.userType === "seller") {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center max-w-lg mx-auto">
        <div className="text-green-600 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          You're a Seller!
        </h2>
        <p className="text-gray-600">
          Your seller account is active. You can now list and sell products on QUBITX Marketplace.
        </p>
      </div>
    );
  }

  if (user?.sellerStatus === "pending") {
    return (
      <div className=" p-6 text-center max-w-lg mx-auto">
        <div className="text-blue-800 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Request Pending
        </h2>
        <p className="text-gray-600 mb-4">
          Your seller request is currently under review. Our admin team will verify your documents and approve your request soon.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Company Name:</strong> {user.companyName}
          </p>
        </div>
      </div>
    );
  }

  if (user?.sellerStatus === "rejected") {
    return (
      <div className="p-6 text-center max-w-lg mx-auto">
        <div className="text-red-600 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Request Rejected
        </h2>
        <p className="text-gray-600 mb-6">
          Unfortunately, your previous seller request was not approved. You can submit a new request with updated documents.
        </p>
        <button
          onClick={() => {
            // Reset using auth slice
            dispatch(setUser({ ...user, sellerStatus: "none" })); // ✅ Changed from setAuthUser
          }}
          className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-900"
        >
          Submit New Request
        </button>
      </div>
    );
  }

  // Default form for users with no seller request
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Want to become a seller?
      </h2>
      <p className="text-gray-600 mb-6">
        Start your own store and sell your products on QUBITX Marketplace!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-700 outline-none"
            placeholder="Enter your company name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Company Proof (PDF/Image)
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setCompanyProof(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload business license, tax certificate, or company registration document
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && <Spinner className="w-4 h-4 mr-2" />}
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default BecomeSeller;