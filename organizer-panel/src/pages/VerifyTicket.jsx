import { useState } from "react";
import {ScanLine,QrCode,CheckCircle2,XCircle,Ticket,Loader2,User,Hash,GraduationCap,Calendar,ShieldCheck,} from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_TICKETS = {
"IGN-2026-001": {
name: "Aarav Kumar",
regd: "21CSE001",
dept: "Computer Science",
event: "TechFest 2026",
ticketId: "IGN-2026-001",
passType: "VIP Pass",
attendance: 94,
},

"IGN-2026-042": {
name: "Priya Singh",
regd: "21ECE042",
dept: "Electronics",
event: "HackNight",
ticketId: "IGN-2026-042",
passType: "Standard Pass",
attendance: 88,
},
};

export default function VerifyTicket() {
const [ticketId, setTicketId] = useState("");

const [loading, setLoading] = useState(false);

const [result, setResult] = useState(null);

const verify = async () => {
if (!ticketId.trim()) return;

setLoading(true);

setResult(null);

await new Promise((r) => setTimeout(r, 900));

const data = MOCK_TICKETS[ticketId.trim().toUpperCase()];

if (data) {
  setResult({
    valid: true,
    data,
  });
} else {
  setResult({
    valid: false,
    ticketId: ticketId.trim(),
  });
}

setLoading(false);

};

return ( <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">

  <header>
    <h1 className="text-3xl font-bold tracking-tight text-navy">
      Verify Student Ticket
    </h1>

    <p className="mt-1 text-sm text-muted-foreground">
      Scan or enter a ticket ID to validate event passes.
    </p>
  </header>

  {/* Scanner Card */}
  <div className="relative overflow-hidden rounded-3xl bg-gradient-navy p-6 text-white shadow-card md:p-8">
    
    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange/30 blur-3xl" />

    <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
      
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
          <ScanLine className="h-3.5 w-3.5 text-orange" />
          Ticket Scanner
        </div>

        <h2 className="mt-3 text-xl font-bold md:text-2xl">
          Enter Ticket ID
        </h2>

        <p className="mt-1 text-sm text-white/70">
          Try{" "}
          <span className="font-mono text-orange">
            IGN-2026-001
          </span>{" "}
          or{" "}
          <span className="font-mono text-orange">
            IGN-2026-042
          </span>
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          
          <div className="relative flex-1">
            <Ticket className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />

            <input
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && verify()}
              placeholder="e.g. IGN-2026-001"
              className="h-12 w-full rounded-xl border border-white/15 bg-white/10 pl-9 pr-4 font-mono text-sm text-white placeholder:text-white/40 outline-none backdrop-blur transition-all focus:border-orange focus:bg-white/15 focus:ring-2 focus:ring-orange/40"
            />
          </div>

          <Button
            variant="orange"
            className="h-12 rounded-xl px-6"
            onClick={verify}
            disabled={loading || !ticketId.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                Verify
              </>
            )}
          </Button>
        </div>
      </div>

      {/* QR Box */}
      <div className="relative flex h-40 w-40 items-center justify-center rounded-2xl border-2 border-dashed border-white/30 bg-white/5 backdrop-blur">
        
        <QrCode className="h-20 w-20 text-white/40" />

        <span className="absolute -top-2 right-3 rounded-full bg-orange px-2 py-0.5 text-[10px] font-bold text-white shadow-glow">
          SCAN
        </span>

        {loading && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute left-0 right-0 h-1 animate-[scan_1.2s_ease-in-out_infinite] bg-orange shadow-glow" />
          </div>
        )}
      </div>
    </div>
  </div>

  {/* VALID RESULT */}
  {result && result.valid && (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card animate-scale-in">
      
      <div className="flex items-center gap-3 border-b border-border bg-success/10 px-6 py-4">
        
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success text-white shadow-glow">
          <CheckCircle2 className="h-5 w-5" />
        </div>

        <div>
          <div className="text-sm font-bold text-success">
            Ticket Verified Successfully
          </div>

          <div className="text-xs text-muted-foreground">
            Ticket is valid and eligible for entry.
          </div>
        </div>

        <span className="ml-auto rounded-full bg-success px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-glow">
          Valid
        </span>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto]">
        
        <div className="grid gap-4 sm:grid-cols-2">
          
          <Detail icon={User} label="Student Name" value={result.data.name} />

          <Detail
            icon={Hash}
            label="Registration No"
            value={result.data.regd}
            mono
          />

          <Detail
            icon={GraduationCap}
            label="Department"
            value={result.data.dept}
          />

          <Detail
            icon={Calendar}
            label="Event"
            value={result.data.event}
          />

          <Detail
            icon={Ticket}
            label="Ticket ID"
            value={result.data.ticketId}
            mono
          />

          <Detail
            icon={ShieldCheck}
            label="Pass Type"
            value={result.data.passType}
          />

          <div className="sm:col-span-2">
            
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Attendance Eligibility
            </div>

            <div className="mt-2 flex items-center gap-3">
              
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full ${
                    result.data.attendance >= 75
                      ? "bg-success"
                      : "bg-destructive"
                  }`}
                  style={{
                    width: `${result.data.attendance}%`,
                  }}
                />
              </div>

              <span className="text-sm font-bold">
                {result.data.attendance}%
              </span>

              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  result.data.attendance >= 75
                    ? "bg-success/15 text-success"
                    : "bg-destructive/15 text-destructive"
                }`}
              >
                {result.data.attendance >= 75
                  ? "Eligible"
                  : "Not Eligible"}
              </span>
            </div>
          </div>
        </div>

        {/* Ticket Stub */}
        <div className="relative w-full max-w-[220px] rounded-2xl bg-gradient-navy p-5 text-white shadow-card md:w-56">
          
          <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-background" />

          <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-background" />

          <div className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
            Ignitron Event Pass
          </div>

          <div className="mt-1 font-bold">
            {result.data.event}
          </div>

          <div className="my-4 flex h-24 items-center justify-center rounded-lg bg-white/10">
            <QrCode className="h-16 w-16 text-white" />
          </div>

          <div className="text-[10px] uppercase tracking-widest text-white/60">
            Ticket ID
          </div>

          <div className="font-mono text-xs font-semibold text-orange">
            {result.data.ticketId}
          </div>
        </div>
      </div>
    </div>
  )}

  {/* INVALID RESULT */}
  {result && !result.valid && (
    <div className="overflow-hidden rounded-3xl border border-destructive/30 bg-card shadow-card animate-scale-in">
      
      <div className="flex items-center gap-3 border-b border-destructive/20 bg-destructive/10 px-6 py-4">
        
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive text-white">
          <XCircle className="h-5 w-5" />
        </div>

        <div>
          <div className="text-sm font-bold text-destructive">
            Invalid Ticket ID
          </div>

          <div className="text-xs text-muted-foreground">
            We couldn't find this ticket in our system.
          </div>
        </div>

        <span className="ml-auto rounded-full bg-destructive px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          Invalid
        </span>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
        
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
          <XCircle className="h-8 w-8 text-destructive" />
        </div>

        <p className="mt-4 text-sm">
          Ticket{" "}
          <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs">
            {result.ticketId}
          </span>{" "}
          is not recognized.
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          Double-check the ID or ask the student to regenerate it.
        </p>
      </div>
    </div>
  )}

  <style>{`
    @keyframes scan {
      0% { top: 10%; }
      50% { top: 85%; }
      100% { top: 10%; }
    }
  `}</style>
</div>


);
}

function Detail({ icon: Icon, label, value, mono }) {
return ( <div className="rounded-xl border border-border bg-muted/30 p-3">

  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
    <Icon className="h-3.5 w-3.5" />
    {label}
  </div>

  <div
    className={`mt-1 text-sm font-semibold text-navy ${
      mono ? "font-mono" : ""
    }`}
  >
    {value}
  </div>
</div>

);
}
