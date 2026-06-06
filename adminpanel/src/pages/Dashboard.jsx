import {
  CalendarCheck,
  Users,
  UserCog,
  Heart,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const stats = [
  {
    title: "Total Events",
    value: "48",
    change: "+12%",
    icon: CalendarCheck,
    up: true,
  },
  {
    title: "Total Students",
    value: "2,847",
    change: "+8%",
    icon: Users,
    up: true,
  },
  {
    title: "Total Organizers",
    value: "124",
    change: "+3%",
    icon: UserCog,
    up: true,
  },
  {
    title: "Total Volunteers",
    value: "389",
    change: "-2%",
    icon: Heart,
    up: false,
  },
];

const barData = [
  { name: "Tech Fest", participants: 420 },
  { name: "Cultural", participants: 380 },
  { name: "Sports", participants: 290 },
  { name: "Workshop", participants: 350 },
  { name: "Hackathon", participants: 480 },
  { name: "Seminar", participants: 210 },
];

const lineData = [
  { month: "Jan", registrations: 120 },
  { month: "Feb", registrations: 210 },
  { month: "Mar", registrations: 340 },
  { month: "Apr", registrations: 280 },
  { month: "May", registrations: 450 },
  { month: "Jun", registrations: 520 },
];

const recentRegistrations = [
  {
    name: "Arjun Kumar",
    regdNo: "21BCE7890",
    event: "Tech Fest 2025",
    date: "2025-02-25",
    status: "Confirmed",
  },
  {
    name: "Priya Sharma",
    regdNo: "22BCE4521",
    event: "Hackathon 3.0",
    date: "2025-02-24",
    status: "Pending",
  },
  {
    name: "Rahul Verma",
    regdNo: "21BCE1234",
    event: "Cultural Night",
    date: "2025-02-24",
    status: "Confirmed",
  },
  {
    name: "Sneha Patel",
    regdNo: "23BCE6789",
    event: "Workshop AI/ML",
    date: "2025-02-23",
    status: "Confirmed",
  },
  {
    name: "Vikram Singh",
    regdNo: "22BCE3456",
    event: "Sports Meet",
    date: "2025-02-23",
    status: "Pending",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Dashboard
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Welcome back, Admin. Here's your overview.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.title}
            className="stat-card flex items-start justify-between"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div>
              <p className="text-sm text-muted-foreground">
                {stat.title}
              </p>

              <p className="text-2xl font-bold text-foreground mt-1">
                {stat.value}
              </p>

              <div className="flex items-center gap-1 mt-2">
                {stat.up ? (
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-destructive" />
                )}

                <span
                  className={`text-xs font-medium ${
                    stat.up
                      ? "text-emerald-500"
                      : "text-destructive"
                  }`}
                >
                  {stat.change}
                </span>

                <span className="text-xs text-muted-foreground">
                  vs last month
                </span>
              </div>
            </div>

            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <stat.icon className="w-5 h-5 text-accent" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Event Participation
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(220 20% 90%)"
              />

              <XAxis
                dataKey="name"
                tick={{
                  fontSize: 12,
                  fill: "hsl(220 10% 46%)",
                }}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "hsl(220 10% 46%)",
                }}
              />

              <Tooltip
                contentStyle={{
                  background: "hsl(0 0% 100% / 0.9)",
                  border: "1px solid hsl(220 20% 90%)",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 12px hsl(220 70% 25% / 0.08)",
                }}
              />

              <Bar
                dataKey="participants"
                fill="hsl(220 70% 25%)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Registrations Over Time
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={lineData}>
              <defs>
                <linearGradient
                  id="colorReg"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="hsl(28 95% 55%)"
                    stopOpacity={0.2}
                  />

                  <stop
                    offset="95%"
                    stopColor="hsl(28 95% 55%)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(220 20% 90%)"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 12,
                  fill: "hsl(220 10% 46%)",
                }}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "hsl(220 10% 46%)",
                }}
              />

              <Tooltip
                contentStyle={{
                  background: "hsl(0 0% 100% / 0.9)",
                  border: "1px solid hsl(220 20% 90%)",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 12px hsl(220 70% 25% / 0.08)",
                }}
              />

              <Area
                type="monotone"
                dataKey="registrations"
                stroke="hsl(28 95% 55%)"
                fill="url(#colorReg)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 pb-3">
          <h3 className="text-sm font-semibold text-foreground">
            Recent Registrations
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name
                </th>

                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Regd No
                </th>

                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Event
                </th>

                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>

                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentRegistrations.map((reg) => (
                <tr
                  key={reg.regdNo}
                  className="border-t border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-3 font-medium text-foreground">
                    {reg.name}
                  </td>

                  <td className="px-6 py-3 text-muted-foreground">
                    {reg.regdNo}
                  </td>

                  <td className="px-6 py-3 text-foreground">
                    {reg.event}
                  </td>

                  <td className="px-6 py-3 text-muted-foreground">
                    {reg.date}
                  </td>

                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        reg.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {reg.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;