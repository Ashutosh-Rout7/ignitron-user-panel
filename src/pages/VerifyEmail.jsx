import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../services/AllServices";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    verifyEmail(token)
      .then((msg) => {
        setStatus("success");
        setMessage(msg);
        // Auto redirect to login after 3 seconds
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.response?.data || "Invalid or expired link.");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 rounded-xl border border-white/10 bg-white/5 max-w-md w-full mx-4">

        {status === "loading" && (
          <>
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-white border-t-transparent mx-auto mb-4" />
            <p className="text-gray-400">Verifying your email...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-white mb-2">Email Verified!</h2>
            <p className="text-gray-400 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to login in 3 seconds...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-xl font-bold text-white mb-2">Verification Failed</h2>
            <p className="text-gray-400 mb-6">{message}</p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
            >
              Go to Login
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default VerifyEmail;