import {
Users,
ClipboardCheck,
TicketCheck,
AlertCircle,
TrendingUp,
TrendingDown,
ArrowUpRight,
} from "lucide-react";

const stats = [
{
label: "Registered Students",
value: "1,284",
icon: Users,
trend: "+12.4%",
up: true,
accent: "bg-navy text-white",
},
{
label: "Attendance Records",
value: "9,432",
icon: ClipboardCheck,
trend: "+5.2%",
up: true,
accent: "bg-gradient-orange text-white",
},
{
label: "Verified Tickets",
value: "742",
icon: TicketCheck,
trend: "+18.0%",
up: true,
accent: "bg-success text-white",
},
{
label: "Pending Verifications",
value: "38",
icon: AlertCircle,
trend: "-3.1%",
up: false,
accent: "bg-warning text-navy",
},
];

const recentStudents = [
{ name: "Aarav Kumar", regd: "21CSE001", dept: "CSE", att: 94, time: "2m ago" },
{ name: "Priya Singh", regd: "21ECE042", dept: "ECE", att: 88, time: "12m ago" },
{ name: "Ravi Patel", regd: "21MECH018", dept: "MECH", att: 64, time: "27m ago" },
{ name: "Sneha Verma", regd: "21IT005", dept: "IT", att: 91, time: "44m ago" },
{ name: "Karthik Iyer", regd: "21CIVIL022", dept: "CIVIL", att: 72, time: "1h ago" },
{ name: "Meera Joshi", regd: "21CSE067", dept: "CSE", att: 81, time: "2h ago" },
];

export default function OrganizerDashboard() {
return ( <div className="space-y-8 animate-fade-in">

  {/* Welcome */}
  <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />
        ORGANIZER PANEL
      </div>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">
        Welcome, Organizer 👋
      </h1>

      <p className="mt-1 text-sm text-muted-foreground">
        Here's what's happening with your events today.
      </p>
    </div>

    <div className="rounded-2xl border border-border bg-card px-5 py-3 shadow-soft">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Today
      </div>

      <div className="text-sm font-semibold text-navy">
        {new Date().toLocaleDateString(undefined, {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    </div>
  </section>

  {/* Stats */}
  <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {stats.map((s) => (
      <div
        key={s.label}
        className="hover-lift group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft"
      >
        <div className="flex items-start justify-between">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.accent}`}>
            <s.icon className="h-5 w-5" />
          </div>

          <div
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              s.up
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {s.up ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}

            {s.trend}
          </div>
        </div>

        <div className="mt-5 text-3xl font-bold tracking-tight text-navy">
          {s.value}
        </div>

        <div className="mt-1 text-sm text-muted-foreground">
          {s.label}
        </div>

        <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-orange/5 transition-transform group-hover:scale-150" />
      </div>
    ))}
  </section>

  {/* Recent students table */}
  <section className="rounded-2xl border border-border bg-card shadow-soft">
    
    <div className="flex items-center justify-between border-b border-border px-6 py-4">
      <div>
        <h2 className="text-base font-bold text-navy">
          Recently Updated Students
        </h2>

        <p className="text-xs text-muted-foreground">
          Latest attendance updates across departments
        </p>
      </div>

      <button className="inline-flex items-center gap-1 text-sm font-medium text-orange hover:underline">
        View all <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        
        <thead className="bg-muted/50">
          <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Regd No</th>
            <th className="px-6 py-3">Department</th>
            <th className="px-6 py-3">Attendance %</th>
            <th className="px-6 py-3 text-right">Updated</th>
          </tr>
        </thead>

        <tbody>
          {recentStudents.map((s) => (
            <tr
              key={s.regd}
              className="border-t border-border transition-colors hover:bg-muted/40"
            >
              
              <td className="px-6 py-3.5">
                <div className="flex items-center gap-3">
                  
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                    {s.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <span className="font-medium text-foreground">
                    {s.name}
                  </span>
                </div>
              </td>

              <td className="px-6 py-3.5 font-mono text-xs text-muted-foreground">
                {s.regd}
              </td>

              <td className="px-6 py-3.5">
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-navy">
                  {s.dept}
                </span>
              </td>

              <td className="px-6 py-3.5">
                <div className="flex items-center gap-3">
                  
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full ${
                        s.att >= 75
                          ? "bg-success"
                          : "bg-destructive"
                      }`}
                      style={{ width: `${s.att}%` }}
                    />
                  </div>

                  <span
                    className={`text-xs font-semibold ${
                      s.att >= 75
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {s.att}%
                  </span>
                </div>
              </td>

              <td className="px-6 py-3.5 text-right text-xs text-muted-foreground">
                {s.time}
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>

  </section>
</div>

);
}
