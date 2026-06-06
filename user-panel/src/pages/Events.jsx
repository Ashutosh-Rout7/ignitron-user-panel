import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { EventCard } from "../components/events/EventCard";
import { useApp } from "../lib/app-store";
import { getallEvents } from "../services/AllServices";

function Events() {
  const { resolvedPass, selectedEventIds, toggleEvent,allEvents,setAllEvents } =useApp();

 // console.log("resolvedPass =", resolvedPass);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getallEvents();

      console.log("Events:", data);

      setAllEvents(data || []);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  const currentPass = resolvedPass;

  const limit = currentPass?.maxevents || 0;
  const price = currentPass?.price || 0;
  const type = currentPass?.type || "";

  const limitReached =
    !!currentPass && selectedEventIds.length >= limit;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-40 pt-12">
      {/* HEADER */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Pick your{" "}
            <span className="text-gradient-brand">
              events
            </span>
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {currentPass ? (
              <>
                You're on the{" "}
                <span className="font-medium text-foreground">
                  ₹{price} ({type})
                </span>{" "}
                pass — select up to{" "}
                <span className="font-medium text-foreground">
                  {limit}
                </span>{" "}
                events.
              </>
            ) : (
              <>
                You haven't picked a pass yet.{" "}
                <Link
                  to="/pass-selection"
                  className="font-medium text-gradient-brand"
                >
                  Choose a pass →
                </Link>
              </>
            )}
          </p>
        </div>

        {/* COUNTER */}
        {currentPass && (
          <div className="rounded-2xl glass px-4 py-3 text-sm">
            <span className="text-muted-foreground">
              Selected{" "}
            </span>

            <span className="font-semibold text-foreground">
              {selectedEventIds.length}/{limit}
            </span>
          </div>
        )}
      </div>

      {/* LIMIT WARNING */}
      {limitReached && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[color:var(--ignitron-orange)]/30 bg-[color:var(--ignitron-orange)]/10 px-4 py-3 text-sm">
          <AlertTriangle className="h-4 w-4 text-[color:var(--ignitron-orange)]" />
          You've hit the limit for the ₹{price} pass.
          Deselect an event to swap.
        </div>
      )}

      {/* EVENTS */}
      {loading ? (
        <div className="mt-12 text-center">
          Loading events...
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {console.log("Rendering events", allEvents)}
          {allEvents.map((e) => {
            const isSelected =
              selectedEventIds.includes(e.id);

            const disabled =
              !currentPass ||
              (limitReached && !isSelected);

            return (
              <EventCard
                key={e.id}
                event={e}
                selected={isSelected}
                disabled={disabled}
                onToggle={() => toggleEvent(e.id)}
              />
            );
          })}
        </div>
      )}

      {/* FOOTER */}
      {currentPass && selectedEventIds.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/5 glass-strong">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 md:flex-row">

            <div className="flex items-center gap-6 text-sm">
              <span>
                <span className="text-muted-foreground">
                  Selected{" "}
                </span>

                <span className="font-semibold">
                  {selectedEventIds.length}
                </span>

                <span className="text-muted-foreground">
                  /{limit}
                </span>
              </span>

              <span>
                <span className="text-muted-foreground">
                  Pass{" "}
                </span>

                <span className="font-semibold">
                  ₹{price}
                </span>
              </span>

              <span>
                <span className="text-muted-foreground">
                  Total{" "}
                </span>

                <span className="font-semibold text-gradient-brand">
                  ₹{price}
                </span>
              </span>
            </div>

            <button
              onClick={() =>
                navigate("/booking-confirmation")
              }
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              Continue to payment
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;