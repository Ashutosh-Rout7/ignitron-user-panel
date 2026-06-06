import React, { useState } from "react";
import { Save, User, Hash,GraduationCap, Calendar, Percent, Loader2,} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function FloatingInput({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  type = "text",
  error,
}) {
  return (
    <div className="relative">
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          className={`peer h-14 w-full rounded-xl border bg-white px-10 pb-2 pt-5 text-sm text-foreground outline-none transition-all focus:border-orange focus:ring-2 focus:ring-orange/20 ${
            error ? "border-red-500" : "border-input"
          }`}
        />

        <label
          htmlFor={id}
          className="pointer-events-none absolute left-10 top-2 text-[11px] font-medium text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-orange"
        >
          {label}
        </label>
      </div>

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Attendance() {
  const [form, setForm] = useState({
    name: "",
    regd: "",
    dept: "",
    year: "",
    attendance: "",
  });

  const [errors, setErrors] = useState({});

  const [saving, setSaving] = useState(false);

  const att = Number(form.attendance) || 0;

  const pct = Math.max(0, Math.min(100, att));

  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Name is required";

    if (!form.regd.trim())
      e.regd = "Registration number is required";

    if (!form.dept.trim())
      e.dept = "Department is required";

    if (!form.year.trim())
      e.year = "Year is required";

    if (!form.attendance.trim())
      e.attendance = "Attendance is required";
    else if (att < 0 || att > 100)
      e.attendance = "Must be between 0 and 100";

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const onSave = async () => {
    if (!validate()) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    setSaving(true);

    await new Promise((r) => setTimeout(r, 900));

    setSaving(false);

    toast.success("Attendance saved successfully", {
      description: `${form.name} · ${pct}%`,
    });

    setForm({
      name: "",
      regd: "",
      dept: "",
      year: "",
      attendance: "",
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-navy">
          Add / Update Student Attendance
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Record or update attendance percentage for a registered student.
        </p>
      </header>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <FloatingInput
            id="name"
            label="Student Name"
            icon={User}
            value={form.name}
            onChange={(v) =>
              setForm({ ...form, name: v })
            }
            error={errors.name}
          />

          <FloatingInput
            id="regd"
            label="Registration Number"
            icon={Hash}
            value={form.regd}
            onChange={(v) =>
              setForm({
                ...form,
                regd: v.toUpperCase(),
              })
            }
            error={errors.regd}
          />

          <FloatingInput
            id="dept"
            label="Department"
            icon={GraduationCap}
            value={form.dept}
            onChange={(v) =>
              setForm({ ...form, dept: v })
            }
            error={errors.dept}
          />

          <FloatingInput
            id="year"
            label="Year"
            icon={Calendar}
            value={form.year}
            onChange={(v) =>
              setForm({ ...form, year: v })
            }
            error={errors.year}
          />

          <div className="md:col-span-2">
            <FloatingInput
              id="att"
              label="Attendance Percentage"
              icon={Percent}
              value={form.attendance}
              onChange={(v) =>
                setForm({
                  ...form,
                  attendance: v,
                })
              }
              type="number"
              error={errors.attendance}
            />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Attendance Preview
              </div>

              <div className="mt-1 text-2xl font-bold text-navy">
                {pct}
                <span className="text-base font-medium text-muted-foreground">
                  %
                </span>
              </div>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                pct >= 75
                  ? "bg-green-100 text-green-600"
                  : pct >= 50
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {pct >= 75
                ? "Eligible"
                : pct >= 50
                ? "At Risk"
                : "Low Attendance"}
            </span>
          </div>

          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                pct >= 75
                  ? "bg-green-500"
                  : pct >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() =>
              setForm({
                name: "",
                regd: "",
                dept: "",
                year: "",
                attendance: "",
              })
            }
          >
            Reset
          </Button>

          <Button
            variant="orange"
            className="rounded-full px-6"
            onClick={onSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Attendance
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

