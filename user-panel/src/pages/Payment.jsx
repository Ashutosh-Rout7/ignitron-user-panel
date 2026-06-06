import { Link, useNavigate } from "react-router-dom";
import { Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { useApp } from "../lib/app-store";
import { toast } from "sonner";
import { bookingapi, createPayment } from "../services/AllServices";

function Payment() {
  const { resolvedPass, selectedEventIds, confirmPayment, paid } = useApp();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [success] = useState(paid);

 async function onPay() {
  try {
    setProcessing(true);

    // 1. create booking
    await bookingapi(selectedEventIds);  // ← backend will throw if already booked

    // 2. create payment
    const res = await createPayment();
    confirmPayment();
    window.location.href = res.payment_link_url;

  } catch (err) {
    console.error("Payment failed:", err);
    // ← show specific message
    if (err.response?.data?.message?.includes("already made a booking")) {
      toast.error("You have already booked. Check My Registrations.");
    } else {
      toast.error("Payment failed. Please try again.");
    }
  } finally {
    setProcessing(false);
  }
}

  if (success) {
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

  if (!resolvedPass) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">
          No pass selected
        </h1>
        <button
          onClick={() => navigate("/pass-selection")}
          className="mt-6 rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          Choose a pass
        </button>
      </div>
    );
  }

  return (
    <div className="grid min-h-[calc(100vh-4rem)] place-items-center px-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl glass-strong p-8 shadow-glow">
        <h1 className="text-2xl font-semibold tracking-tight">
          Secure <span className="text-gradient-brand">Checkout</span>
        </h1>

        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-3 w-3" />
          You'll be redirected to Stripe's secure payment page.
        </p>

        <div className="mt-6 rounded-2xl glass p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Pass</span>
            <span className="font-semibold">₹{resolvedPass.price}</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
            <span className="font-medium">Total</span>
            <span className="text-xl font-semibold text-gradient-brand">
              ₹{resolvedPass.price}
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3 w-3" />
          Powered by Stripe — PCI compliant
        </div>

        <PrimaryButton
          onClick={onPay}
          className="mt-6 w-full"
          disabled={processing}
        >
          {processing ? "Redirecting to Stripe..." : `Pay ₹${resolvedPass.price} via Stripe`}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default Payment;