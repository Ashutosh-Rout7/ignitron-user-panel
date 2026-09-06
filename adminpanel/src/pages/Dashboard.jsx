import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Users,
  UserCog,
  Heart,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  IndianRupee,
} from "lucide-react";

import {
  getCompletedStudentsCount,
  getEventsCount,
  getOrganizersCount,
  getVolunteersCount,
  getAllBookings,
  getTotalRevenue,
} from "../services/allService";

const statConfig = [
  {
    key: "totalStudents",
    label: "Total Students",
    icon: Users,
    color: "from-blue-500 to-blue-600",
  },
  {
    key: "totalEvents",
    label: "Total Events",
    icon: CalendarCheck,
    color: "from-violet-500 to-violet-600",
  },
  {
    key: "totalOrganizers",
    label: "Total Organizers",
    icon: UserCog,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    key: "totalVolunteers",
    label: "Total Volunteers",
    icon: Heart,
    color: "from-rose-500 to-rose-600",
  },
  {
    key: "totalRevenue",
    label: "Total Revenue",
    icon: IndianRupee,
    color: "from-amber-500 to-amber-600",
    isRevenue: true,
  },
  {
    key: "totalBookings",
    label: "Confirmed Bookings",
    icon: CheckCircle2,
    color: "from-teal-500 to-teal-600",
  },
];

const statusConfig = {
  CONFIRMED: {
    label: "Confirmed",
    icon: CheckCircle2,
    cls: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
  PENDING: {
    label: "Pending",
    icon: Clock,
    cls: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    cls: "bg-red-50 text-red-700 border border-red-200",
  },
};

function StatCard({ config, value, loading }) {
  const Icon = config.icon;

  return (
    <div className="glass-card p-5 flex items-center gap-4 group hover:shadow-lg transition-all duration-300">
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-md flex-shrink-0`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
          {config.label}
        </p>

        {loading ? (
          <div className="h-8 w-16 bg-muted animate-pulse rounded-lg" />
        ) : (
          <p className="text-3xl font-bold text-foreground tabular-nums">
            {value !== null
              ? config.isRevenue
                ? `₹${Number(value).toLocaleString("en-IN")}`
                : Number(value).toLocaleString()
              : "—"}
          </p>
        )}
      </div>

      <div
        className={`w-2 h-12 rounded-full bg-gradient-to-b ${config.color} opacity-30 group-hover:opacity-70 transition-opacity`}
      />
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: null,
    totalEvents: null,
    totalOrganizers: null,
    totalVolunteers: null,
    totalRevenue: null,
    totalBookings: null,
  });

  const [statsLoading, setStatsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState(null);

  // Load statistics
  useEffect(() => {
    const loadStats = async () => {
      try {
        const [
          students,
          events,
          organizers,
          volunteers,
          revenue,
        ] = await Promise.all([
          getCompletedStudentsCount(),
          getEventsCount(),
          getOrganizersCount(),
          getVolunteersCount(),
          getTotalRevenue(),
        ]);

        setStats({
          totalStudents: students,
          totalEvents: events,
          totalOrganizers: organizers,
          totalVolunteers: volunteers,
          totalRevenue: revenue.totalRevenue,
          totalBookings: revenue.totalBookings,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setStatsLoading(false);
      }
    };

    loadStats();
  }, []);

  // Load bookings
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await getAllBookings();
        setBookings(data || []);
      } catch (error) {
        console.log(error);
        setBookingsError(error.response?.data || error.message);
      } finally {
        setBookingsLoading(false);
      }
    };

    loadBookings();
  }, []);

  const recentBookings = bookings.slice(0, 8);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back, Admin. Here's your overview.
          </p>
        </div>
        <div className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Stat Cards — 6 cards in 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {statConfig.map((config) => (
          <StatCard
            key={config.key}
            config={config}
            value={stats[config.key]}
            loading={statsLoading}
          />
        ))}
      </div>

      {/* Recent Registrations */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Recent Registrations
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Latest booking activity
            </p>
          </div>
          {!bookingsLoading && (
            <span className="text-xs font-medium bg-accent/10 text-accent px-2.5 py-1 rounded-full">
              {bookings.length} total
            </span>
          )}
        </div>

        {bookingsLoading && (
          <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading bookings...</span>
          </div>
        )}

        {bookingsError && (
          <div className="flex items-center justify-center py-16 text-destructive text-sm gap-2">
            <XCircle className="w-4 h-4" />
            {bookingsError}
          </div>
        )}

        {!bookingsLoading && !bookingsError && bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
            <CalendarCheck className="w-10 h-10 opacity-20" />
            <p className="text-sm">No bookings yet</p>
          </div>
        )}

        {!bookingsLoading && !bookingsError && bookings.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40">
                  {["#", "Name", "Pass Type", "Booked At", "Status"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {recentBookings.map((b, i) => {
                  const s = statusConfig[b.status] || statusConfig["PENDING"];
                  const StatusIcon = s.icon;

                  return (
                    <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-muted-foreground text-xs font-mono">
                        {i + 1}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center text-accent font-bold text-xs flex-shrink-0">
                            {b.userName?.charAt(0)?.toUpperCase() ?? "?"}
                          </div>
                          <span className="font-medium text-foreground">
                            {b.userName ?? "—"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-block bg-muted text-foreground text-xs font-medium px-2.5 py-1 rounded-lg">
                          ₹{b.passType}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-muted-foreground text-xs">
                        {b.booking_AT
                          ? new Date(b.booking_AT).toLocaleString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.cls}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {s.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!bookingsLoading && bookings.length > 8 && (
          <div className="px-6 py-3 border-t border-border text-center">
            <span className="text-xs text-muted-foreground">
              Showing 8 of {bookings.length} bookings
            </span>
          </div>
        )}
      </div>
    </div>
  );
}