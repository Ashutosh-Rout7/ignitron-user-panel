import { Link } from "react-router-dom";
import { CalendarDays, Download, MapPin, QrCode, Ticket } from "lucide-react";
import { useApp } from "../lib/app-store";
import { downloadTicket } from "../services/AllServices";
import { toast } from "sonner";
import { useState } from "react";

function MyRegistrations() {
  const { paid, resolvedPass, selectedEventIds, user, allEvents } = useApp();
  const [downloading, setDownloading] = useState(false);

  const selected = allEvents.filter((event) =>
    selectedEventIds.includes(event.id)
  );

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadTicket();
      toast.success("Ticket downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download ticket");
    } finally {
      setDownloading(false);
    }
  };

  if (!paid) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <span className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand-soft">
          <Ticket className="h-6 w-6 text-[color:var(--ignitron-orange)]" />
        </span>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          No registrations yet
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Once you complete a booking, your pass and events will show up here.
        </p>

        <Link
          to="/pass-selection"
          className="mt-6 inline-flex rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Get your pass
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        My <span className="text-gradient-brand">registrations</span>
      </h1>

      <p className="mt-1 text-sm text-muted-foreground">
        Show your QR code at the venue to check in.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.4fr]">

        {/* PASS CARD */}
        <div className="relative overflow-hidden rounded-3xl glass-strong p-6 shadow-glow">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-brand opacity-30 blur-3xl" />

          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Ignitron 2027
          </p>

          <h2 className="mt-1 text-2xl font-semibold">
            Ignitron ₹{resolvedPass?.price} Pass
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {resolvedPass?.maxevents === 4 ? "Standard access" : "Premium access"}
          </p>

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4">
            <div>
              <p className="text-xs text-muted-foreground">Pass holder</p>
              <p className="text-sm font-medium">{user?.fullname}</p>
              <p className="text-xs text-muted-foreground">
                {user?.regdNo || user?.email}
              </p>
            </div>

            <div className="grid h-20 w-20 place-items-center rounded-xl bg-white text-black">
              <QrCode className="h-14 w-14" />
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Paid ₹{resolvedPass?.price} · {selected.length} events
          </p>

          {/* DOWNLOAD TICKET */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Downloading..." : "Download Ticket"}
          </button>
        </div>

        {/* EVENTS */}
        <div className="rounded-3xl glass p-6">
          <h3 className="text-base font-semibold">Your events</h3>

          <ul className="mt-4 divide-y divide-white/5">
            {selected.length === 0 ? (
              <p className="text-sm text-muted-foreground">No events selected.</p>
            ) : (
              selected.map((event) => (
                <li key={event.id} className="flex items-start gap-3 py-4">
                  <img
                    src={event.eventImage}
                    alt={event.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.name}</p>
                    <p className="text-xs text-muted-foreground">{event.type}</p>
                    <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {event.date || "TBA"}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.venue || "TBA"}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyRegistrations;