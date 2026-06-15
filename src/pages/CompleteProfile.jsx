import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus } from "lucide-react";
import { FormField } from "../components/ui/formfield"
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { profileupdate } from "@/services/AllServices";
import { useApp } from "../lib/app-store";
import { toast } from "sonner";

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

function CompleteProfile() {
  const { updateProfile } = useApp();
  const navigate = useNavigate();

  // form fields
  const [phone, setPhone] = useState("");
  const [regNo, setRegNo] = useState("");
  const [degree, setDegree] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState(years[0]);

  // file handling
  const [file, setFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(f);
  }

  async function onSubmit(e) {
    e.preventDefault();

    const payload = {
      regdNo: regNo,
      degree,
      department,
      year,
      phno: phone,
    };

    try {
      setLoading(true);

      const res = await profileupdate(payload, file);

      // backend is source of truth
      updateProfile(res);
       toast.success("Profile Updated!");

      navigate("/pass-selection");
    } catch (err) {
  console.error("Profile update failed:", err);
  const msg = err.response?.data?.message || err.response?.data || "Profile update failed";
  toast.error(msg);  // ← shows "Registration number already taken. Contact admin."
}finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-12">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl glass-strong p-8 shadow-glow">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-brand opacity-30 blur-3xl" />

        <div className="relative">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Step 1 of 3
          </span>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Complete your profile
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Helps organizers verify your registration on event day.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            {/* PROFILE IMAGE */}
            <div className="flex items-center gap-4">
              <label className="group relative grid h-20 w-20 cursor-pointer place-items-center overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.03] transition hover:border-white/30">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImagePlus className="h-5 w-5 text-muted-foreground" />
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onFile}
                />
              </label>

              <div>
                <p className="text-sm font-medium">Profile Photo</p>
                <p className="text-xs text-muted-foreground">
                  PNG or JPG, up to 5 MB.
                </p>
              </div>
            </div>

            {/* FIELDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                label="Phone Number"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <FormField
                label="Registration Number"
                placeholder="20BCE1234"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                required
              />

              <FormField
                label="Degree"
                placeholder="B.Tech"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />

              <FormField
                label="Department"
                placeholder="Computer Science"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />

              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Year
                </span>

                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-[color:var(--ignitron-orange)]"
                >
                  {years.map((item) => (
                    <option
                      key={item}
                      value={item}
                      className="bg-[oklch(0.18_0.025_285)]"
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* SUBMIT */}
            <PrimaryButton
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save & Continue"}
            </PrimaryButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;