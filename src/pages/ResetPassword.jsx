import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthShell } from "../components/ui/AuthShell";
import { FormField } from "../components/ui/formField";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/auth/reset-password`, {
        token,
        newPassword,
      });

      toast.success("Password reset successful! Please login.", { duration: 5000 });
      setTimeout(() => navigate("/login"), 2000);

    } catch (error) {
      toast.error(
        error.response?.data || "Invalid or expired link. Please request a new one.",
        { duration: 6000 }
      );
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <AuthShell title="Invalid Link" subtitle="This reset link is invalid.">
        <div className="text-center py-6">
          <div className="text-5xl mb-4">❌</div>
          <a href="/forgot-password" className="text-gradient-brand">
            Request a new reset link
          </a>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Reset Password"
      subtitle="Enter your new password below."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          label="New Password"
          type={showPassword ? "text" : "password"}
          placeholder="Min 8 characters"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
        />

        <FormField
          label="Confirm Password"
          type="password"
          placeholder="Re-enter password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <PrimaryButton
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Resetting...
            </span>
          ) : (
            "Reset Password"
          )}
        </PrimaryButton>
      </form>
    </AuthShell>
  );
}

export default ResetPassword;