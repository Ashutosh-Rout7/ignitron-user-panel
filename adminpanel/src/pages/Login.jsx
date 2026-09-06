import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import {
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // Login API
 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);

    const response = await axios.post(
      `${BASE_URL}/api/login`,
      { email: username, password: password },
      { withCredentials: true }
    );

    if (response.status === 200) {
      console.log(response.data);

      if (response.data.roles.includes("ADMIN")) {
        toast.success("Admin Login Successful");
        // ✅ small delay to ensure cookie is saved before ProtectedRoute checks it
        setTimeout(() => navigate("/dashboard"), 100);
      } else {
        toast.error("You are not an admin");
      }
    }
  } catch (error) {
  console.log(error);

  if (error.response?.status === 401) {
    toast.error(error.response.data.message);
  } else {
    toast.error("Something went wrong");
  }
} finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-cyan-500/30 blur-3xl rounded-full" />

      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-purple-500/30 blur-3xl rounded-full" />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">

        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">

          {/* Logo */}
          <div className="flex justify-center mb-6">

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/40">

              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">

            <h1 className="text-4xl font-extrabold text-white tracking-wide">
              IGNITRON
            </h1>

            <p className="text-gray-300 mt-2 text-sm">
              Event Management Admin Panel
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="text-sm text-gray-300 block mb-2">
                Email
              </label>

              <input
                type="email"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="Enter admin email"
                className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              />
            </div>

            {/* Password */}
            <div>

              <label className="text-sm text-gray-300 block mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter password"
                  className="w-full h-12 px-4 pr-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-lg shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
            >
              {loading
                ? "Logging In..."
                : "Login to Dashboard"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm mt-8">
            Secure access for administrators only.
          </p>
        </div>
      </div>
    </div>
  );
}