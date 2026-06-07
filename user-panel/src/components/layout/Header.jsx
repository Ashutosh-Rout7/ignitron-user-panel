import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Logo } from "./Logo";
import { Modal } from "./Modal";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";
import { useApp } from "@/lib/app-store";
import { cn } from "@/lib/utils";
import { logoutApi } from "../../services/AllServices";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "My Registrations", to: "/my-registrations" },
];

export function Header() {
  const {
    role,
    user,
    logout,
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

  // When approval fires, store the role label here.
  // The JSX uses this to render a full-page blur overlay.
  const [approvedRole, setApprovedRole] = useState(null); // "Organizer" | "Volunteer" | null

  const navigate = useNavigate();
  const isGuest = role === "guest";

  const handleLogoutRef = useRef(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 5000);
  }

  async function handleLogout() {
    try {
      await logoutApi();
    } catch (err) {
      console.log("Logout API failed (ignored):", err);
    }
    logout();
    setMobileOpen(false);
    navigate("/login");
  }

  useEffect(() => {
    handleLogoutRef.current = handleLogout;
  });

  // ---------------- LISTEN FOR APPROVAL EVENTS ----------------
  useEffect(() => {
    const handleOrgApproved = () => {
      // 1. Clear all state + localStorage RIGHT NOW before any re-render
      localStorage.removeItem("ignitron-app-state-v1");
      logout();
      // 2. Show blur overlay with the role name
      setApprovedRole("Organizer");
    };

    const handleVolApproved = () => {
      localStorage.removeItem("ignitron-app-state-v1");
      logout();
      setApprovedRole("Volunteer");
    };

    window.addEventListener("organizer-approved", handleOrgApproved);
    window.addEventListener("volunteer-approved", handleVolApproved);
    return () => {
      window.removeEventListener("organizer-approved", handleOrgApproved);
      window.removeEventListener("volunteer-approved", handleVolApproved);
    };
  }, []);

  async function handleOrgRequest() {
    try {
      await requestOrganizer();
      setOrgModal(false);
      showToast("Organizer request sent to admin.");
    } catch (err) {
      setOrgModal(false);
      const msg = err?.response?.data || "";
      if (msg.includes("final year")) {
        showToast("Only final year students can become organizer.");
      } else {
        showToast("Failed to send request. Try again.");
      }
    }
  }

  async function handleVolRequest() {
    try {
      await requestVolunteer();
      setVolModal(false);
      showToast("Volunteer request sent to admin.");
    } catch (err) {
      setVolModal(false);
      showToast("Failed to send request. Try again.");
    }
  }

  return (
    <>
      {/* ---- APPROVAL BLUR OVERLAY ---- */}
      {/* Sits on top of the ENTIRE page. The page behind is blurred and
          non-interactive. User must click "Login Now" to proceed.
          We do NOT auto-navigate — that was causing the flash because
          navigate() triggered re-renders before state was fully cleared. */}
      {approvedRole && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "1rem",
              padding: "2.5rem 2rem",
              maxWidth: "380px",
              width: "90%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(34,197,94,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
              }}
            >
              🎉
            </div>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "#fff",
                margin: 0,
              }}
            >
              You are now an {approvedRole}!
            </h2>
            <p
              style={{
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.6)",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Your role has been approved. Please login again to access your{" "}
              {approvedRole} panel.
            </p>
           // Find this button in Header.jsx (~line 120)
            <button
              onClick={() => {
                setApprovedRole(null); // ✅ ADD THIS LINE
                navigate("/login", {
                  state: {
                    message: `You are now an ${approvedRole}. Please login again to access your ${approvedRole} panel.`,
                  },
                });
              }}
              style={{
                marginTop: "0.5rem",
                padding: "0.6rem 2rem",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #f97316, #a855f7)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.9rem",
                border: "none",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Login Now
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 border-b border-white/5 glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
          <Logo />

          {/* DESKTOP NAV */}
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

          {/* DESKTOP RIGHT */}
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
                        {organizerRequested ? "Organizer Requested ⏳" : "Become Organizer"}
                      </button>
                    )}

                    {volunteerApproved ? (
                      <a
                        href="http://localhost:3003"
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
                        {volunteerRequested ? "Volunteer Requested ⏳" : "Become Volunteer"}
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
                    href="http://localhost:3003"
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-foreground transition hover:bg-white/10"
                  >
                    Switch To Volunteer Panel
                  </a>
                )}

                <ProfileDropdown />
              </>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className="grid h-10 w-10 place-items-center rounded-full glass md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* MOBILE MENU */}
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
                    onClick={() => { setMobileOpen(false); navigate("/login"); }}
                    className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); navigate("/register"); }}
                    className="flex-1 rounded-lg bg-gradient-brand px-3 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {user && (
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <p className="text-sm font-semibold">{user.fullname}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  )}

                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
                  >
                    View Profile
                  </Link>

                  <Link
                    to="/my-registrations"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
                  >
                    My Registrations
                  </Link>

                  {role === "student" && (
                    <>
                      {organizerApproved ? (
                        <a
                          href="http://localhost:3001"
                          className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
                        >
                          Switch To Organizer Panel
                        </a>
                      ) : (
                        <button
                          onClick={() => { setMobileOpen(false); setOrgModal(true); }}
                          disabled={organizerRequested}
                          className="rounded-lg border border-white/10 px-3 py-2 text-sm text-left disabled:opacity-60 hover:bg-white/5"
                        >
                          {organizerRequested ? "Organizer Requested ⏳" : "Become Organizer"}
                        </button>
                      )}

                      {volunteerApproved ? (
                        <a
                          href="http://localhost:3003"
                          className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
                        >
                          Switch To Volunteer Panel
                        </a>
                      ) : (
                        <button
                          onClick={() => { setMobileOpen(false); setVolModal(true); }}
                          disabled={volunteerRequested}
                          className="rounded-lg border border-white/10 px-3 py-2 text-sm text-left disabled:opacity-60 hover:bg-white/5"
                        >
                          {volunteerRequested ? "Volunteer Requested ⏳" : "Become Volunteer"}
                        </button>
                      )}
                    </>
                  )}

                  {role === "organizer" && (
                    <a
                      href="http://localhost:3001"
                      className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
                    >
                      Switch To Organizer Panel
                    </a>
                  )}

                  {role === "volunteer" && (
                    <a
                      href="http://localhost:3003"
                      className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
                    >
                      Switch To Volunteer Panel
                    </a>
                  )}

                  <div className="h-px bg-white/5" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-left text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* MODALS */}
      <Modal
        open={orgModal}
        onClose={() => setOrgModal(false)}
        title="Become an Organizer"
        description="As an organizer you'll be able to manage events, mark attendance, and access the organizer panel. Your request will be reviewed by an admin."
        confirmLabel="Send Request"
        onConfirm={handleOrgRequest}
      />

      <Modal
        open={volModal}
        onClose={() => setVolModal(false)}
        title="Become a Volunteer"
        description="As a volunteer you'll assist in event coordination and access the volunteer panel. Your request will be reviewed by an admin."
        confirmLabel="Send Request"
        onConfirm={handleVolRequest}
      />

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 rounded-full glass-strong px-5 py-3 text-sm shadow-glow animate-in fade-in slide-in-from-bottom-4">
          {toast}
        </div>
      )}
    </>
  );
}
