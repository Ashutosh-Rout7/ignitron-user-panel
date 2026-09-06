import { Link, useNavigate } from "react-router-dom";
import { Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { useApp } from "../lib/app-store";
import { toast } from "sonner";
import { bookingapi, createPayment, getMyBooking } from "../services/AllServices";

function Payment() {
  const { resolvedPass, selectedEventIds, paid } = useApp();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  async function onPay() {
    try {
      setProcessing(true);

      // ✅ Check if booking already exists (student came back from Stripe)
      let existingBooking = null;
      try {
        existingBooking = await getMyBooking();
      } catch (_) {}

      if (existingBooking?.status === "CONFIRMED") {
        // Already paid — just send them to registrations
        navigate("/my-registrations");
        return;
      }

      // ✅ Only call bookingapi if no booking exists yet
      if (!existingBooking) {
        await bookingapi(selectedEventIds);
      }
      // if existingBooking.status === "PENDING" → skip bookingapi, go straight to payment

      const res = await createPayment();
      window.location.href = res.payment_link_url;

    } catch (err) {
  console.error("Payment failed:", err);
  const msg = err.response?.data;
  if (typeof msg === "string" && msg.includes("Attendance below 50%")) {
    toast.error("You are not eligible to book. Attendance below 50%.");
  } else if (typeof msg === "string" && msg.includes("already made a booking")) {
    toast.error("You have already booked. Check My Registrations.");
  } else {
    toast.error("Payment failed. Please try again.");
  }
} finally {
      setProcessing(false);
    }
  }

  // ✅ If already paid (from context), redirect to registrations
  if (paid) {
    return (
      <div className="grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-16 text-center">
        <div className="relative w-full max-w-lg overflow-hidden rounded-3xl glass-strong p-10 shadow-glow">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-2xl shadow-glow">
            🎉
          </span>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            Already Booked!
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You have already completed your booking for Ignitron 2027.
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