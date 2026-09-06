import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useApp } from "../lib/app-store";
import { verifyPayment } from "../services/AllServices";
import confetti from "canvas-confetti";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { confirmPayment } = useApp();
  const [status, setStatus] = useState("verifying"); // verifying | success | failed
  useEffect(() => {
    if (!orderId) return;

    verifyPayment(orderId)
      .then((success) => {
        if (success) {
          confirmPayment();
          setStatus("success");
          confetti({
            particleCount: 160,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#ff8a3d", "#a366ff", "#ffffff"],
          });
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("failed"));
  }, [orderId]);

  if (status === "verifying") {
    return (
      <div className="grid min-h-[calc(100vh-4rem)] place-items-center">
        <p className="text-muted-foreground">Verifying payment...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="grid min-h-[calc(100vh-4rem)] place-items-center text-center px-4">
        <div>
          <h1 className="text-2xl font-semibold">Payment verification failed</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your payment may have gone through. Please contact support.
          </p>
          <Link to="/events" className="mt-6 inline-flex rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-16 text-center">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl glass-strong p-10 shadow-glow">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-2xl shadow-glow">
          🎉
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          Booking Confirmed!
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Welcome to Ignitron 2027. Your digital pass is now in your account.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/my-registrations"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            View my pass
          </Link>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium"
          >
            Back to events
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;