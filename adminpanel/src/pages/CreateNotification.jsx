import { useState } from "react";
import axios from "axios";
import { Send, Bell, Users, UserCheck, Heart } from "lucide-react";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const audienceOptions = [
  { value: "", label: "Select audience...", icon: null, color: "" },
  { value: "ALL_STUDENTS", label: "All Students", icon: Users, color: "text-blue-500" },
  { value: "ORGANIZERS", label: "Organizers", icon: UserCheck, color: "text-orange-500" },
  { value: "VOLUNTEERS", label: "Volunteers", icon: Heart, color: "text-pink-500" },
];

const CreateNotification = () => {
  const [form, setForm] = useState({ title: "", message: "", target: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.message || !form.target) {
      setStatus("❌ Please fill all fields.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      await axios.post(`${BASE_URL}/send`, {
        title: form.title,
        message: form.message,
        targetAudience: form.target,
      }, {
        withCredentials: true,
      });

      setStatus("✅ Notification sent successfully!");
      setForm({ title: "", message: "", target: "" });

    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send. Check your login or backend.");
    } finally {
      setLoading(false);
    }
  };

  const selectedAudience = audienceOptions.find((o) => o.value === form.target);

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-200">
          <Bell className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Create Notification</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Send announcements to your audience.</p>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">

        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              Notification Title
              <span className="text-red-400 text-xs">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter notification title"
              className="w-full h-11 px-4 rounded-xl bg-muted/40 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400 transition-all"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              Message
              <span className="text-red-400 text-xs">*</span>
            </label>
            <div className="relative">
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Write your notification message..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400 transition-all resize-none"
              />
              <span className="absolute bottom-3 right-3 text-[10px] text-muted-foreground">
                {form.message.length} chars
              </span>
            </div>
          </div>

          {/* Target Audience */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              Target Audience
              <span className="text-red-400 text-xs">*</span>
            </label>

            {/* Audience pills */}
            <div className="grid grid-cols-3 gap-3">
              {audienceOptions.slice(1).map((opt) => {
                const Icon = opt.icon;
                const selected = form.target === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm({ ...form, target: opt.value })}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      selected
                        ? "border-orange-500 bg-orange-50 shadow-sm shadow-orange-100"
                        : "border-border bg-muted/30 hover:border-orange-300 hover:bg-orange-50/50"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${selected ? "text-orange-500" : "text-muted-foreground"}`} />
                    <span className={`text-xs font-medium ${selected ? "text-orange-600" : "text-muted-foreground"}`}>
                      {opt.label}
                    </span>
                    {selected && (
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview */}
          {(form.title || form.message) && (
            <div className="rounded-xl border border-orange-200 bg-orange-50/60 p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 uppercase tracking-wide">
                <Bell className="w-3 h-3" /> Preview
              </div>
              <div className="text-sm font-semibold text-gray-800">{form.title || "—"}</div>
              <div className="text-xs text-gray-500">{form.message || "—"}</div>
              {selectedAudience?.value && (
                <div className="text-[10px] text-orange-500 font-medium mt-1">
                  → {selectedAudience.label}
                </div>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md shadow-orange-200 active:scale-[0.98]"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Notification
              </>
            )}
          </button>
        </form>
      </div>

      {/* Status */}
      {status && (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium border ${
          status.startsWith("✅")
            ? "bg-green-50 border-green-200 text-green-700"
            : "bg-red-50 border-red-200 text-red-700"
        }`}>
          <span>{status}</span>
        </div>
      )}

      {/* Footer */}
      <div className="text-center">
      </div>
    </div>
  );
};

export default CreateNotification;