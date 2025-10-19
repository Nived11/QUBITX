import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // fake login: set token in localStorage
    setTimeout(() => {
      localStorage.setItem("isAdmin", "1");
      setLoading(false);
      navigate("/admin");
    }, 700);
  };

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleLogin} disabled={loading}>
        {loading ? "Signing in..." : "Sign in as Admin"}
      </button>
    </div>
  );
}
