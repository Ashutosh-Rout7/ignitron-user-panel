import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthShell } from "@/components/ui/AuthShell";
import { FormField } from "../components/ui/formField"
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { login, getProfile } from "../services/AllServices";
import { toast } from "sonner";
import { useApp } from "../lib/app-store";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Message passed from Header when admin approves organizer/volunteer role
  const approvalMessage = location.state?.message;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { loginUser } = useApp();
  
  async function onSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    try {
      setLoading(true);

      // 1. login (sets cookie/token)
      await login({ email, password });

      const user = await getProfile();

      loginUser(user);

      if (user.profileComplete) {
        navigate("/pass-selection");
      } else {
        navigate("/complete-profile");
      }
    } catch (error) {
  console.error(error);

  if (error.response?.status === 401) {
    toast.error(error.response.data.message);
  } else if (error.response?.status === 400) {
    toast.error("Please check your input");
  } else {
    toast.error("Something went wrong");
  }
} finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Login to continue your Ignitron journey."
      footer={
        <>
          New here?{" "}
          <Link to="/register" className="font-medium text-gradient-brand">
            Create an account
          </Link>
        </>
      }
    >
      {/* Show approval message when redirected after role upgrade */}
      {approvalMessage && (
        <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          🎉 {approvalMessage}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          label="Email"
          type="email"
          placeholder="you@college.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormField
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          }
        />

        <PrimaryButton
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </PrimaryButton>
      </form>
    </AuthShell>
  );
}

export default Login;