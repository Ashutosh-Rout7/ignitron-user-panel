import { Link, useNavigate, useLocation } from "react-router-dom";
import {CheckCircle2, Menu, ShieldCheck,Sparkles,X,} from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { Modal } from "./Modal";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";
import { useApp } from "@/lib/app-store";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "My Registrations", to: "/my-registrations" },
];

export function Header() {
  const {
    role,
    organizerApproved,
    volunteerApproved,
    requestOrganizer,
    requestVolunteer,
    organizerRequested,
    volunteerRequested,
  } = useApp();

  const location = useLocation();
  const pathname = location.pathname;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [orgModal, setOrgModal] = useState(false);
  const [volModal, setVolModal] = useState(false);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const isGuest = role === "guest";

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }

  function handleOrgRequest() {
    requestOrganizer();
    setOrgModal(false);
    showToast("Request sent to admin.");
  }

  function handleVolRequest() {
    requestVolunteer();
    setVolModal(false);
    showToast("Request sent to admin.");
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/5 glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    active
                      ? "bg-white/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {isGuest ? (
              <>
                <Link
                  to="/login"
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <NotificationDropdown />

                {role === "student" && (
                  <>
                    {organizerApproved ? (
                      <a
                        href="http://localhost:3001"
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-foreground transition hover:bg-white/10"
                      >
                        Switch To Organizer Panel
                      </a>
                    ) : (
                      <button
                        onClick={() => setOrgModal(true)}
                        disabled={organizerRequested}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-foreground transition hover:bg-white/10 disabled:opacity-60"
                      >
                        {organizerRequested
                          ? "Organizer Requested"
                          : "Become Organizer"}
                      </button>
                    )}

                    {volunteerApproved ? (
                      <a
                        href="http://localhost:3002"
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-foreground transition hover:bg-white/10"
                      >
                        Switch To Volunteer Panel
                      </a>
                    ) : (
                      <button
                        onClick={() => setVolModal(true)}
                        disabled={volunteerRequested}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-foreground transition hover:bg-white/10 disabled:opacity-60"
                      >
                        {volunteerRequested
                          ? "Volunteer Requested"
                          : "Become Volunteer"}
                      </button>
                    )}
                  </>
                )}

                {role === "organizer" && (
                  <a
                    href="http://localhost:3001"
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-foreground transition hover:bg-white/10"
                  >
                    Switch To Organizer Panel
                  </a>
                )}

                {role === "volunteer" && (
                  <a
                    href="http://localhost:3002"
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-foreground transition hover:bg-white/10"
                  >
                    Switch To Volunteer Panel
                  </a>
                )}

                <ProfileDropdown />
              </>
            )}
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-full glass md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/5 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}

              <div className="my-2 h-px bg-white/5" />

              {isGuest ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/login");
                    }}
                    className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/register");
                    }}
                    className="flex-1 rounded-lg bg-gradient-brand px-3 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg border border-white/10 px-3 py-2 text-sm"
                  >
                    View Profile
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 rounded-full glass-strong px-5 py-3 text-sm shadow-glow">
          {toast}
        </div>
      )}
    </>
  );
}