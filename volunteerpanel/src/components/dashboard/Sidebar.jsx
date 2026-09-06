import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  User,
  Flame,
  X,
} from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/students", label: "Registered Students", icon: Users },
  { to: "/dashboard/profile", label: "Profile", icon: User },
];

export function Sidebar({ open, onClose }) {
  const { pathname } = useLocation();

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[280px] glass-dark text-white transition-transform duration-300 ease-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/5">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-orange/40 blur-xl" />
              <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-orange to-orange-hover flex items-center justify-center shadow-lg">
                <Flame className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <div className="text-sm font-bold tracking-wider">IGNITRON</div>
              <div className="text-[11px] text-white/50 -mt-0.5">Volunteer Panel</div>
            </div>
          </Link>

          <button onClick={onClose} className="lg:hidden text-white/70 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-3 py-6 space-y-1">
          {nav.map(({ to, label, icon: Icon }) => {
            const active =
              pathname === to ||
              (to !== "/dashboard" && pathname.startsWith(to));

            return (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-orange to-orange-hover text-white shadow-lg shadow-orange/20"
                    : "text-white/70 hover:text-white hover:bg-white/5 hover:scale-[1.02]"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white/90" />
                )}
                <Icon className="h-[18px] w-[18px] shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="rounded-2xl p-4 bg-gradient-to-br from-orange/20 to-orange/5 border border-orange/20">
            <div className="text-xs font-semibold text-orange mb-1">Ignitron 2027</div>
            <div className="text-xs text-white/60 leading-relaxed">
              Powering campus events with volunteers like you.
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}