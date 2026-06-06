import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Sparkles,Calendar,Ticket,TrendingUp,Award,ArrowRight,Flame,CheckCircle2,Loader2,} from "lucide-react";
import { Button } from "@/components/ui/button";
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function HomePage() {
const [open, setOpen] = useState(false);
const [loading, setLoading] = useState(false);

const navigate = useNavigate();

const handleConfirm = async () => {
setLoading(true);

await new Promise((r) => setTimeout(r, 800));

toast.success("You are now an Organizer", {
  description: "Welcome to the Organizer Panel.",
});

setLoading(false);

setOpen(false);

navigate("/organizer");

};

return ( 
<div className="min-h-screen bg-background">
{/* Top Bar */} <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white/70 px-4 backdrop-blur-xl md:px-8"> <div className="flex items-center gap-2"> <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500"> <Flame className="h-5 w-5 text-white" strokeWidth={2.5} /> </div>

      <div className="flex flex-col leading-tight">
        <span className="text-sm font-bold tracking-tight">
          Ignitron
        </span>

        <span className="text-[10px] font-medium uppercase tracking-widest text-orange-500">
          Student Panel
        </span>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-muted-foreground sm:inline">
        Hi, <span className="font-medium text-foreground">Rahul</span>
      </span>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
        RS
      </div>
    </div>
  </header>

  <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
    {/* Hero Section */}
    <section className="relative overflow-hidden rounded-3xl bg-black p-8 text-white md:p-12">
      <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-orange-400" />
            Welcome back, Rahul
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            Manage your campus{" "}
            <span className="text-orange-400">events</span> with ease.
          </h1>

          <p className="mt-4 max-w-lg text-sm text-white/70 md:text-base">
            Track event registrations, attendance and verified
            tickets.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => setOpen(true)}
              className="rounded-full bg-orange-500 hover:bg-orange-600"
            >
              <Sparkles className="h-4 w-4" />
              Become Organizer
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            {
              icon: Calendar,
              label: "Events Joined",
              value: "12",
            },
            {
              icon: Ticket,
              label: "Active Tickets",
              value: "3",
            },
            {
              icon: Award,
              label: "Attendance",
              value: "92%",
            },
            {
              icon: TrendingUp,
              label: "This Month",
              value: "+4",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white p-4 text-black"
            >
              <s.icon className="h-5 w-5 text-orange-500" />

              <div className="mt-3 text-2xl font-bold">
                {s.value}
              </div>

              <div className="text-xs font-medium text-gray-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Upcoming Events */}
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-xl font-bold">
          Upcoming Events
        </h2>

        <p className="text-sm text-muted-foreground">
          Events you might want to attend
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            name: "TechFest 2026",
            date: "Mar 14",
            tag: "Technology",
          },
          {
            name: "HackNight",
            date: "Mar 22",
            tag: "Coding",
          },
          {
            name: "Cultural Eve",
            date: "Apr 02",
            tag: "Cultural",
          },
        ].map((e) => (
          <div
            key={e.name}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-orange-500 px-2 py-1 text-[10px] text-white">
                {e.tag}
              </span>

              <span className="text-xs text-muted-foreground">
                {e.date}
              </span>
            </div>

            <h3 className="mt-4 text-lg font-bold">
              {e.name}
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Auditorium · 10:00 AM
            </p>
          </div>
        ))}
      </div>
    </section>
  </main>

  {/* Dialog */}
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="bg-[#0f172a] border border-slate-700 text-white round-xl">
      <DialogHeader>
        <DialogTitle>
          Become Organizer
        </DialogTitle>

        <DialogDescription className="text-blue-500">
          Upgrade your role
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-2 text-sm text-white">
        {[
          "Manage student attendance",
          "Verify tickets",
          "View registrations",
        ].map((b) => (
          <div
            key={b}
            className="flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            {b}
          </div>
        ))}
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>

        <Button
          onClick={handleConfirm}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              Confirm
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>

);
}
