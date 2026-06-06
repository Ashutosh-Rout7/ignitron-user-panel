import { useState } from "react";
import { Send } from "lucide-react";

const CreateNotification = () => {
  const [form, setForm] = useState({
    title: "",
    message: "",
    target: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Send notification:", form);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Create Notification
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Send announcements to your audience.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass-card p-8 space-y-5"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Notification Title
          </label>

          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            placeholder="Enter notification title"
            className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Message
          </label>

          <textarea
            value={form.message}
            onChange={(e) =>
              setForm({
                ...form,
                message: e.target.value,
              })
            }
            placeholder="Write your notification message..."
            rows={4}
            className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Target Audience
          </label>

          <select
            value={form.target}
            onChange={(e) =>
              setForm({
                ...form,
                target: e.target.value,
              })
            }
            className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="">Select audience...</option>
            <option value="all">All Students</option>
            <option value="organizers">Organizers</option>
            <option value="volunteers">Volunteers</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full h-10 rounded-lg bg-accent text-accent-foreground font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send Notification
        </button>
      </form>

      <div className="text-center">
        <button className="text-sm font-medium text-accent hover:underline">
          See All Notifications →
        </button>
      </div>
    </div>
  );
};

export default CreateNotification;