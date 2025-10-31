import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/slices/userSlice";
import { Spinner } from "@/components/ui/spinner";

const BecomeSeller = () => {
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [companyProof, setCompanyProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName || !companyProof) return alert("All fields required!");

    setLoading(true);
    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("companyProof", companyProof);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/become-seller`, formData,);

      setSuccessMsg(data.message);
      dispatch( setUser(data.user));
    } catch (error: any) {
      alert(error.response?.data?.message || "Error updating seller status");
    } finally {
      setLoading(false);
    }
  };

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
            className="w-full text-sm text-gray-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 flex items-center justify-center"
        >
          {loading ? <Spinner className="w-4 h-4 mr-2" /> : "Submit Request"}
          {loading && "Submitting..."}
        </button>

        {successMsg && (
          <p className="text-green-600 text-sm font-medium text-center">
            {successMsg}
          </p>
        )}
      </form>
    </div>
  );
};

export default BecomeSeller;
