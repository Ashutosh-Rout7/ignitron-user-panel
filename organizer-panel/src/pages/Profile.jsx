import { useState } from "react";

import {
  Pencil,
  Mail,
  GraduationCap,
  Shield,
  Calendar,
  Save,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { toast } from "sonner";

export default function Profile() {
  const [profile, setProfile] = useState({
    fullName: "Rahul Sharma",
    email: "rahul@ignitron.edu",
    department: "Computer Science & Engineering",
    role: "Organizer",
    joined: "Aug 2024",
  });

  const [open, setOpen] = useState(false);

  const [draft, setDraft] = useState(profile);

  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    setSaving(true);

    await new Promise((r) => setTimeout(r, 700));

    setProfile(draft);

    setSaving(false);

    setOpen(false);

    toast.success("Profile updated");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-navy">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your organizer profile and account details.
        </p>
      </header>

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        <div className="relative h-32 bg-gradient-navy">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange/30 blur-3xl" />
        </div>

        <div className="relative px-6 pb-6 md:px-8 md:pb-8">
          <div className="-mt-12 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex items-end gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-card bg-gradient-orange text-2xl font-bold text-white shadow-glow">
                {profile.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div className="pb-2">
                <h2 className="text-xl font-bold text-navy">
                  {profile.fullName}
                </h2>

                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange/10 px-2.5 py-0.5 text-[11px] font-semibold text-orange">
                    <Shield className="h-3 w-3" />
                    {profile.role}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    Joined {profile.joined}
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="orange"
              className="rounded-full"
              onClick={() => {
                setDraft(profile);
                setOpen(true);
              }}
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <InfoRow
              icon={Mail}
              label="Email Address"
              value={profile.email}
            />

            <InfoRow
              icon={GraduationCap}
              label="Department"
              value={profile.department}
            />

            <InfoRow
              icon={Shield}
              label="Role"
              value={profile.role}
            />

            <InfoRow
              icon={Calendar}
              label="Joined"
              value={profile.joined}
            />
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>

            <DialogDescription>
              Update your profile details.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Field
              label="Full Name"
              value={draft.fullName}
              onChange={(v) =>
                setDraft({
                  ...draft,
                  fullName: v,
                })
              }
            />

            <Field
              label="Email"
              value={draft.email}
              onChange={(v) =>
                setDraft({
                  ...draft,
                  email: v,
                })
              }
            />

            <Field
              label="Department"
              value={draft.department}
              onChange={(v) =>
                setDraft({
                  ...draft,
                  department: v,
                })
              }
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="orange"
              className="rounded-full"
              onClick={onSave}
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="hover-lift rounded-2xl border border-border bg-muted/30 p-4">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>

      <div className="mt-1.5 text-sm font-semibold text-navy">
        {value}
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition-all focus:border-orange focus:ring-2 focus:ring-orange/20"
      />
    </label>
  );
}

