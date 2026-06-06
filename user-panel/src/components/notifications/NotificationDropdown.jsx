import { AnimatePresence, motion } from "framer-motion";
import { Bell, Calendar, Megaphone, Ticket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/lib/app-store";
import { cn } from "@/lib/utils";

function iconFor(type) {
  if (type === "booking") return Ticket;
  if (type === "reminder") return Calendar;
  return Megaphone;
}

export function NotificationDropdown() {
  const { notifications, markNotificationRead, markAllRead } = useApp();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function onClick(e) {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onClick);

    return () => {
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative grid h-10 w-10 place-items-center rounded-full glass transition hover:bg-white/10"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4 text-foreground" />

        {unread > 0 && (
          <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gradient-brand px-1 text-[10px] font-semibold text-primary-foreground">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-[340px] overflow-hidden rounded-2xl glass-strong shadow-glow"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <p className="text-sm font-semibold">Notifications</p>

              <button
                onClick={markAllRead}
                className="text-xs text-muted-foreground transition hover:text-foreground"
              >
                Mark all read
              </button>
            </div>

            <div className="max-h-[360px] overflow-y-auto">
              {notifications.map((n) => {
                const Icon = iconFor(n.type);

                return (
                  <button
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={cn(
                      "flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-white/5",
                      !n.read && "bg-white/[0.03]"
                    )}
                  >
                    <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand-soft">
                      <Icon className="h-4 w-4" />
                    </span>

                    <span className="flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {n.title}
                        </span>

                        {!n.read && (
                          <span className="h-2 w-2 rounded-full bg-gradient-brand" />
                        )}
                      </span>

                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {n.description}
                      </span>

                      <span className="mt-1 block text-[10px] uppercase tracking-wide text-muted-foreground/70">
                        {n.timestamp}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-white/5 px-4 py-2 text-center">
              <button className="text-xs font-medium text-gradient-brand">
                View all
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}