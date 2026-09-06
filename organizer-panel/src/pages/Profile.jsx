import { useEffect, useState } from "react";
import {
  Mail, GraduationCap, Hash,
  Calendar, Loader2, Shield, BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { getOrganizerProfile } from "../services/AllServices";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getOrganizerProfile();
      setProfile(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-orange" />
      </div>
    );
  }

  if (!profile) return null;

  const initials = profile.fullname
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mx-auto max-w-2xl animate-fade-in">

      {/* Main Card */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">

        {/* Banner */}
        <div className="relative h-28 bg-gradient-navy">
          <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-orange/20 blur-2xl" />
          <div className="absolute -left-4 bottom-0 h-24 w-24 rounded-full bg-white/5 blur-xl" />
          <div className="absolute right-4 bottom-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-orange px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              <Shield className="h-2.5 w-2.5" />
              Organizer
            </span>
          </div>
        </div>

        {/* Avatar + Name Row */}
        <div className="flex items-end gap-4 px-6 -mt-8 pb-5 border-b border-border">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-4 border-card bg-gradient-orange text-lg font-bold text-white shadow-glow">
            {initials}
          </div>
          <div className="pb-1 min-w-0">
            <h2 className="text-lg font-bold text-navy truncate">
              {profile.fullname || "Not Updated"}
            </h2>
            <p className="text-xs text-muted-foreground truncate">
              {profile.email}
            </p>
          </div>
        </div>

        {/* Info List */}
        <div className="divide-y divide-border">
          <InfoItem icon={Mail} label="Email" value={profile.email} />
          <InfoItem icon={Hash} label="Registration No" value={profile.regdNo} mono />
          <InfoItem icon={GraduationCap} label="Department" value={profile.department} />
          <InfoItem icon={BookOpen} label="Degree" value={profile.degree} />
          <InfoItem icon={Calendar} label="Year" value={profile.year} />
        </div>

      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value, mono }) {
  return (
    <div className="flex items-center justify-between px-6 py-3.5 hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <Icon className="h-4 w-4 shrink-0" />
        {label}
      </div>
      <span className={`text-sm font-semibold text-navy ${mono ? "font-mono" : ""}`}>
        {value || "Not Updated"}
      </span>
    </div>
  );
}