import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { useApp } from "../lib/app-store";
import { toast } from "sonner";
import { useEffect } from "react";  // ← add this
 import { getallEvents } from "../services/AllServices";

function BookingConfirmation() {
  const { resolvedPass, selectedEventIds, allEvents, setAllEvents } = useApp();
 
// Fetch events if not loaded yet
useEffect(() => {
  if (allEvents.length === 0) {
    getallEvents()
      .then((data) => setAllEvents(data || []))
      .catch(() => {});
  }
}, []);

  console.log(allEvents)

 // console.log(events);
  const navigate = useNavigate();

  const selectedEvents = allEvents.filter((event) =>
    selectedEventIds.includes(event.id)
  );

  if (!resolvedPass || selectedEvents.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Nothing to review yet
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Pick a pass and a few events first.
        </p>

        <Link
          to="/pass-selection"
          className="mt-6 inline-flex rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Choose a pass
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Step 3 of 3
      </span>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
        Review your{" "}
        <span className="text-gradient-brand">
          booking
        </span>
      </h1>

      <p className="mt-1 text-sm text-muted-foreground">
        One last look before we head to payment.
      </p>

      <div className="mt-8 space-y-4">

        {/* PASS SUMMARY */}
        <div className="rounded-2xl glass p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Selected Pass
          </p>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-lg font-semibold">
              Ignitron ₹{resolvedPass.price} Pass
            </p>

            <span className="text-sm text-muted-foreground">
              Up to {resolvedPass.maxevents} events
            </span>
          </div>
        </div>

        {/* EVENTS */}
        <div className="rounded-2xl glass p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Selected Events ({selectedEvents.length})
          </p>

          <ul className="mt-3 divide-y divide-white/5">
            {selectedEvents.map((event) => (
              <li
                key={event.id}
                className="flex items-center gap-3 py-3"
              >
                <img
                  src={event.eventImage}
                  alt={event.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {event.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {event.type}
                  </p>
                </div>

                <CheckCircle2 className="h-4 w-4 text-[color:var(--ignitron-orange)]" />
              </li>
            ))}
          </ul>
        </div>

        {/* PRICE SUMMARY */}
        <div className="rounded-2xl glass-strong p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Subtotal
            </span>

            <span>₹{resolvedPass.price}</span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 text-base">
            <span className="font-medium">
              Total
            </span>

            <span className="text-xl font-semibold text-gradient-brand">
              ₹{resolvedPass.price}
            </span>
          </div>
        </div>

      </div>

      <div className="mt-8 flex justify-end">
       <PrimaryButton
        onClick={() => {
          navigate("/payment");
        }}
      >
          Confirm booking
          <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </div>
  );
}

export default BookingConfirmation;