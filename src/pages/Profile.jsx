import { Link } from "react-router-dom";
import {Mail, Phone, GraduationCap, Building2, IdCard, CalendarRange} from "lucide-react";
import { useApp } from "../lib/app-store";

function Profile() {
  const {
    user,
    role,
    organizerApproved,
    volunteerApproved,
  } = useApp();

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">
          You're not logged in
        </h1>

        <Link
          to="/login"
          className="mt-6 inline-flex rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Login
        </Link>
      </div>
    );
  }

  const initials = user.fullname
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const items = [
    {
      icon: Mail,
      label: "Email",
      value: user.email,
    },
    {
      icon: Phone,
      label: "Phone",
      value: user.phno || "—",
    },
    {
      icon: IdCard,
      label: "Reg No.",
      value: user.regdNo || "—",
    },
    {
      icon: GraduationCap,
      label: "Degree",
      value: user.degree || "—",
    },
    {
      icon: Building2,
      label: "Department",
      value: user.department || "—",
    },
    {
      icon: CalendarRange,
      label: "Year",
      value: user.year || "—",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="relative overflow-hidden rounded-3xl glass-strong p-6 shadow-glow md:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-brand opacity-30 blur-3xl" />

        <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center">
         {user.image ? (
          <img
            src={user.image}
            alt={user.fullname}
            className="h-20 w-20 rounded-2xl object-cover ring-1 ring-white/10"
          />
        ) : (
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-brand text-2xl font-semibold text-primary-foreground shadow-glow">
            {initials}
          </div>
        )}

          <div className="flex-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              {user.fullname}
            </h1>

            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                {role}
              </span>

              {organizerApproved && (
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-wider">
                  Organizer
                </span>
              )}

              {volunteerApproved && (
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-wider">
                  Volunteer
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl glass p-4"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand-soft">
              <Icon className="h-4 w-4" />
            </span>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {label}
              </p>

              <p className="text-sm font-medium">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;