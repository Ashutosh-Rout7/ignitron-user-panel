import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthShell } from "@/components/ui/AuthShell";
import { FormField } from "@/components/ui/FormField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { login, getProfile } from "../services/AllServices";
import { toast } from "sonner";
import { useApp } from "../lib/app-store";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useApp();

async function onSubmit(e) {
  e.preventDefault();

  if (!email || !password) return;

  try {
    setLoading(true);

    // 1. login (sets cookie/token)
   await login({ email, password });

    const user = await getProfile();   // MUST

    loginUser(user);

    if (user.profileComplete) {
      navigate("/pass-selection");
    } else {
      navigate("/complete-profile");
    }

  } catch (error) {
    toast.error("Login Failed");
    console.error(error);
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
          <Link
            to="/register"
            className="font-medium text-gradient-brand"
          >
            Create an account
          </Link>
        </>
      }
    >
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
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

       <PrimaryButton type="submit" className="w-full" disabled={loading}>
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