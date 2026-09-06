import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { AuthShell } from "../components/ui/AuthShell";
import { FormField } from "../components/ui/formField";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/auth/forgot-password`, { email });
      setSent(true);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ After sending — show success message
  if (sent) {
    return (
      <AuthShell
        title="Check your email"
        subtitle="We sent a password reset link to your email."
        footer={
          <Link to="/login" className="font-medium text-gradient-brand">
            Back to Login
          </Link>
        }
      >
        <div className="text-center py-6">
          <div className="text-5xl mb-4">📧</div>
          <p className="text-gray-400 text-sm">
            If this email is registered, you'll receive a reset link shortly.
            Check your spam folder too!
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Forgot Password?"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <Link to="/login" className="font-medium text-gradient-brand">
          Back to Login
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          label="Email"
          type="email"
          placeholder="you@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
              Sending...
            </span>
          ) : (
            "Send Reset Link"
          )}
        </PrimaryButton>
      </form>
    </AuthShell>
  );
}

export default ForgotPassword;