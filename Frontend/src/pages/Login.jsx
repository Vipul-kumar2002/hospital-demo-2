import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config"; // 👈 Importing your existing config

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Using your dynamic API_BASE_URL
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      if (response.data.success) {
        // 🔐 Save credentials for the Deosoft Panel
        localStorage.setItem("deosoftToken", response.data.token);
        localStorage.setItem("adminData", JSON.stringify(response.data.admin));

        // 🚀 Move to the admin dashboard
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unauthorized Access");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6]">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-700">Deosoft IT</h1>
          <p className="text-gray-500 mt-2">Partner Portal Management</p>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Admin Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Vipul@Deosoft"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Access Key
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-bold rounded-lg transition-all ${
              loading
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-200"
            }`}
          >
            {loading ? "Verifying..." : "Launch Admin Panel"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-8">
          © 2026 Deosoft IT Services Private Limited
        </p>
      </div>
    </div>
  );
};

export default Login;
