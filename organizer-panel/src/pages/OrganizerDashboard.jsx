import {
  Users,
  ClipboardCheck,
  TicketCheck,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  HeartHandshake,
  UserCheck,
  Heart,
  
  CheckCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getOrganizerCount,
  getVolunteerCount,
  getCompletedProfilesCount,
  getAttendanceCount,
} from "../services/AllServices";

const quickActions = [
  {
    title: "Manage students",
    desc: "View, search and filter all registered students with attendance details.",
    icon: Users,
    color: "bg-blue-50 text-blue-700",
    link: "/organizer/students",
  },
  {
    title: "Verify ticket",
    desc: "Scan or enter a ticket ID to verify student entry at the event gate.",
    icon: TicketCheck,
    color: "bg-emerald-50 text-emerald-700",
    link: "/organizer/verify-tickets",
  },
  {
    title: "Attendance",
    desc: "Track and update attendance records for all departments and years.",
    icon: ClipboardCheck,
    color: "bg-amber-50 text-amber-700",
    link: "/organizer/attendance",
  },
];

const deptAttendance = [
  { dept: "CSE", pct: 87, color: "bg-blue-500" },
  { dept: "ECE", pct: 79, color: "bg-blue-400" },
  { dept: "MECH", pct: 65, color: "bg-destructive" },
  { dept: "CIVIL", pct: 72, color: "bg-warning" },
  { dept: "EEE", pct: 81, color: "bg-green-500" },
  { dept: "ENTC", pct: 76, color: "bg-purple-500" },
  { dept: "MBA", pct: 84, color: "bg-pink-500" },
  { dept: "MCA", pct: 78, color: "bg-indigo-500" },
  { dept: "BCA", pct: 82, color: "bg-cyan-500" },
  { dept: "ITM", pct: 74, color: "bg-orange-500" },
  { dept: "BBA", pct: 80, color: "bg-emerald-500" },
];

export default function OrganizerDashboard() {
  const navigate = useNavigate();

  const [organizerCount, setOrganizerCount] = useState(0);
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [completedProfiles, setCompletedProfiles] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const organizers = await getOrganizerCount();
        const volunteers = await getVolunteerCount();
        const profiles = await getCompletedProfilesCount();
        const attendance = await getAttendanceCount();

        setOrganizerCount(organizers);
        setVolunteerCount(volunteers);
        setCompletedProfiles(profiles);
        setAttendanceCount(attendance);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboardData();
  }, []);

const stats = [
  {
    label: "Organizers",
    value: organizerCount,
    icon: UserCheck,
    up: true,
    accent: "bg-gradient-to-r from-slate-700 to-slate-900",
  },
  {
    label: "Volunteers",
    value: volunteerCount,
    icon: Heart,
    up: true,
    accent: "bg-gradient-to-r from-red-500 to-pink-500",
  },
  {
    label: "Attendance",
    value: attendanceCount,
    icon: CheckCheck,
    up: true,
    accent: "bg-gradient-to-r from-green-500 to-emerald-600",
  },
  {
    label: "Students",
    value: completedProfiles,
    icon: Users,
    up: false,
    accent: "bg-gradient-to-r from-amber-400 to-yellow-500",
  },
];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />
            ORGANIZER PANEL
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">
            Welcome, Organizer 👋
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Here's what's happening with your events today.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card px-5 py-3 shadow-soft">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Today
          </div>

          <div className="text-sm font-semibold text-navy">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </section>

    {/* Stats */}
<section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
  {stats.map((s) => (
    <div
      key={s.label}
      className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-orange-100 opacity-30 blur-3xl group-hover:scale-150 transition-all duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div
            className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg ${s.accent}`}
          >
            <s.icon className="h-7 w-7 text-white" />
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              s.up
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {s.up ? (
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12%
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                -3%
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-5xl font-extrabold text-slate-800 tracking-tight">
            {s.value}
          </h2>

          <p className="mt-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">
            {s.label}
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-orange-500 group-hover:w-full transition-all duration-500"></div>
    </div>
  ))}
</section>

      {/* Quick Actions */}
      <section className="grid gap-4 sm:grid-cols-3">
        {quickActions.map((a) => (
          <div
            key={a.title}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${a.color}`}
              >
                <a.icon className="h-5 w-5" />
              </div>

              <span className="font-semibold text-navy">{a.title}</span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {a.desc}
            </p>

            <button
              onClick={() => navigate(a.link)}
              className="mt-auto flex items-center gap-1 text-sm font-medium text-orange hover:underline"
            >
              Go <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </section>

      {/* Attendance Overview */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Attendance overview by department
        </p>

        <div className="flex flex-col gap-3">
          {deptAttendance.map((d) => (
            <div key={d.dept} className="flex items-center gap-3">
              <span className="w-12 text-sm text-muted-foreground">
                {d.dept}
              </span>

              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full ${d.color}`}
                  style={{ width: `${d.pct}%` }}
                />
              </div>

              <span className="w-9 text-right text-xs font-semibold text-navy">
                {d.pct}%
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}