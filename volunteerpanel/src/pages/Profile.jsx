import { useEffect, useState } from "react";
import { Mail, Building2, ShieldCheck, GraduationCap, Phone, Hash } from "lucide-react";
import { getVolunteerProfile } from "../services/AllServices.js";

function ProfilePage() {
  const [volunteer, setVolunteer] = useState(null);

  useEffect(() => {
    getVolunteerProfile().then(setVolunteer).catch(console.error);
  }, []);

  if (!volunteer) return <div className="text-center py-20 text-muted-foreground">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">View your volunteer profile.</p>
      </div>

      <div className="rounded-3xl glass overflow-hidden">
        <div className="relative h-32 bg-gradient-to-br from-navy via-navy-2 to-purple-900">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, oklch(0.72 0.18 48 / 0.6), transparent 50%)",
            }}
          />
        </div>

        <div className="px-6 sm:px-8 pb-8 -mt-16">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
            <div className="h-28 w-28 rounded-3xl ring-4 ring-white shadow-xl bg-gradient-to-br from-orange to-orange-hover flex items-center justify-center text-white text-5xl font-bold">
              {volunteer?.fullname?.charAt(0).toUpperCase() || "V"}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold">{volunteer.fullname}</h2>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-br from-orange to-orange-hover text-white text-xs font-semibold shadow-md shadow-orange/30">
                  <ShieldCheck className="h-3 w-3" />
                  Volunteer
                </span>
                <span className="text-xs text-muted-foreground">{volunteer.department}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field icon={Mail} label="Email Address" value={volunteer.email} />
            <Field icon={Building2} label="Department" value={volunteer.department || "N/A"} />
            <Field icon={GraduationCap} label="Degree & Year" value={`${volunteer.degree || "N/A"} · ${volunteer.year || "N/A"}`} />
            <Field icon={Hash} label="Registration No" value={volunteer.regdNo || "N/A"} />
            <Field icon={ShieldCheck} label="Role" value="Volunteer" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/60 border border-border hover:border-orange/40 hover:bg-white transition-all">
      <div className="h-10 w-10 rounded-xl bg-orange/10 text-orange flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-medium truncate">{value}</div>
      </div>
    </div>
  );
}

export default ProfilePage;