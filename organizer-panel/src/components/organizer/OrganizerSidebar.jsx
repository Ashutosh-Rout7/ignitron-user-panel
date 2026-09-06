import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  ClipboardCheck,
  Users,
  TicketCheck,
  User,
  Flame,
} from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "/organizer",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    title: "Add Attendance",
    url: "/organizer/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "View Students",
    url: "/organizer/students",
    icon: Users,
  },
  {
    title: "Verify Tickets",
    url: "/organizer/verify-tickets",
    icon: TicketCheck,
  },
  {
    title: "Profile",
    url: "/organizer/profile",
    icon: User,
  },
];

const OrganizerSidebar = ({ onNavigate }) => {

  const location = useLocation();

  const pathname = location.pathname;

  const isActive = (url, exact) =>
    exact
      ? pathname === url
      : pathname === url ||
        pathname.startsWith(url + "/");

  return (
    <aside className="flex h-full w-64 flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">

      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">

          <Flame
            className="h-5 w-5 text-white"
            strokeWidth={2.5}
          />

        </div>

        <div className="flex flex-col leading-tight">

          <span className="text-sm font-bold tracking-tight text-white">
            Ignitron
          </span>

          <span className="text-[10px] uppercase tracking-widest text-white/60">
            Organizer
          </span>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">

        <div className="px-3 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">

          Main Menu

        </div>

        {items.map((item) => {

          const active = isActive(
            item.url,
            item.exact
          );

          return (
            <Link
              key={item.url}
              to={item.url}
              onClick={onNavigate}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 ${
                active
                  ? "bg-white/10 text-white shadow-lg"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >

              {/* Active Indicator */}
              {active && (
                <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-orange-500 shadow-lg" />
              )}

              <item.icon
                className={`h-5 w-5 transition-colors ${
                  active
                    ? "text-orange-400"
                    : "text-white/70 group-hover:text-white"
                }`}
              />

              <span>{item.title}</span>

            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default OrganizerSidebar;