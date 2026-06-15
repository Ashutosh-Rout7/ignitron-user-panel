import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "../components/ui/AuthShell";
import { FormField } from "../components/ui/formField";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { register } from "../services/AllServices";
import { Eye, EyeOff } from "lucide-react";

function Register() {

   //audio setting
  const clickSound = new Audio("/sound/thank.mp3");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await register({
        fullname: name,
        email,
        password,
      });
      clickSound.play().catch((err) => {
          console.log(err);
        });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.log("FULL ERROR:", error);

      const data = error?.response?.data;

      let backendMessage = "Registration Failed";

      if (typeof data === "string") {
        backendMessage = data;
      } else if (data?.message) {
        backendMessage = data.message;
      } else if (data?.errors) {
        backendMessage = Object.values(data.errors)[0];
      } else if (error?.message) {
        backendMessage = error.message;
      }

      toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Two minutes to your Ignitron pass."
      footer={
        <>
          Already have one?{" "}
          <Link to="/login" className="font-medium text-gradient-brand">
            Login instead
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          label="Name"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          placeholder="Min 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

        <PrimaryButton
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Registering...
            </span>
          ) : (
            "Register"
          )}
        </PrimaryButton>
      </form>
    </AuthShell>
  );
}

export default Register;