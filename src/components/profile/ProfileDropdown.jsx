import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Ticket, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/lib/app-store";
import { logoutApi } from "../../services/AllServices";


export function ProfileDropdown() {
  const { user, logout } = useApp();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  const initials = (user?.fullname || "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();


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
        className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-sm font-semibold text-primary-foreground shadow-glow ring-1 ring-white/10 transition hover:scale-105"
      >
        {initials}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl glass-strong shadow-glow"
          >
            <div className="border-b border-white/5 px-4 py-3">
              <p className="text-sm font-semibold leading-tight">
                {user?.fullname}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user?.email}
              </p>
            </div>

            <div className="p-1">
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-white/5"
              >
                <User className="h-4 w-4" />
                View Profile
              </Link>

              <Link
                to="/my-registrations"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-white/5"
              >
                <Ticket className="h-4 w-4" />
                My Registrations
              </Link>

              <button
              onClick={async () => {
                try {
                  await logoutApi();   // 1. clear backend session (cookie)
                } catch (err) {
                  console.log("Logout API failed (ignored):", err);
                }

                logout();              // 2. clear frontend context state
                setOpen(false);
                navigate("/");
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-destructive transition hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}