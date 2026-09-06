import { useEffect, useState } from "react";
import {
  Users,
  CalendarDays,
  Bell,
  BarChart3,
  User,
  ArrowUpRight,
  Heart,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  registeredStd,
  getVolunteerCount,
} from "../services/AllServices.js";

function useCounter(target, duration = 900) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return val;
}

function Stat({ icon: Icon, label, value, gradient, suffix = "" }) {
  const v = useCounter(value);

  return (
    <div className="group relative rounded-2xl glass p-5 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div
        className={`absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-20 blur-2xl ${gradient}`}
      />

      <div
        className={`relative h-11 w-11 rounded-xl ${gradient} flex items-center justify-center shadow-lg`}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>

      <div className="mt-4 text-3xl font-bold tracking-tight">
        {v}
        {suffix}
      </div>

      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function QuickAction({ to, icon: Icon, title, desc }) {
  return (
    <Link
      to={to}
      className="group rounded-2xl glass p-5 hover:scale-[1.03] hover:orange-glow transition-all duration-300 flex flex-col"
    >
      <div className="flex items-start justify-between">
        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-navy to-navy-2 flex items-center justify-center">
          <Icon className="h-5 w-5 text-white" />
        </div>

        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-orange transition-colors" />
      </div>

      <div className="mt-4 font-semibold">{title}</div>

      <div className="text-xs text-muted-foreground mt-1">{desc}</div>
    </Link>
  );
}

export default function DashboardHome() {
  const [students, setStudents] = useState([]);
  const [volunteerCount, setVolunteerCount] = useState(0);

  useEffect(() => {
    registeredStd()
      .then(setStudents)
      .catch(console.error);

    getVolunteerCount()
      .then(setVolunteerCount)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6 animate-fade-up">
      <section
        className="relative overflow-hidden rounded-3xl p-8 sm:p-10 text-white"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, oklch(0.72 0.18 48 / 0.4), transparent 40%), radial-gradient(circle at 80% 80%, oklch(0.5 0.22 295 / 0.4), transparent 40%)",
          }}
        />

        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-medium border border-white/20">
              <Sparkles className="h-3 w-3 text-orange" />
              Volunteer Console
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Welcome Back, Volunteer 👋
            </h1>

            <p className="mt-3 text-white/70 text-sm sm:text-base">
              Manage registrations, student records, and event activities
              efficiently.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/dashboard/students"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-orange to-orange-hover px-5 py-2.5 text-sm font-semibold shadow-lg shadow-orange/30 hover:scale-105 transition-transform"
              >
                <Users className="h-4 w-4" />
                View Students
              </Link>

              <Link
                to="/dashboard/profile"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/15 transition-colors"
              >
                <User className="h-4 w-4" />
                My Profile
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative h-44 w-44">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange/40 to-purple-500/30 blur-3xl" />

              <div className="relative h-full w-full rounded-3xl glass-dark border border-white/10 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-2 p-4">
                  {[
                    Users,
                    CalendarDays,
                    Bell,
                    BarChart3,
                    Sparkles,
                    User,
                    CalendarDays,
                    Bell,
                    Users,
                  ].map((Icon, i) => (
                    <div
                      key={i}
                      className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                        i % 3 === 1
                          ? "bg-orange/30 text-orange"
                          : "bg-white/5 text-white/60"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <QuickAction
          to="/dashboard/students"
          icon={Users}
          title="Registered Students"
          desc="View & manage records"
        />

        <QuickAction
          to="/dashboard"
          icon={Bell}
          title="Notifications"
          desc="View latest updates"
        />

        <QuickAction
          to="/dashboard/profile"
          icon={User}
          title="Profile"
          desc="Manage your account"
        />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Stat
          icon={Users}
          label="Total Students"
          value={students.length}
          gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
        />

        <Stat
          icon={Heart}
          label="Total Volunteers"
          value={volunteerCount}
          gradient="bg-gradient-to-br from-red-500 to-pink-600"
        />

        <Stat
          icon={BarChart3}
          label="Attendance Average"
          value={85}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
          suffix="%"
        />
      </section>
    </div>
  );
}