import { useEffect, useMemo, useState } from "react";

import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  UserX,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { registeredStd } from "../services/AllServices.js";
import { toast } from "sonner";

export default function Students() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("name");
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await registeredStd();
      setStudents(data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return students;
    return students.filter((s) =>
      filter === "name"
        ? s?.name?.toLowerCase().includes(q)
        : s?.regdNo?.toLowerCase().includes(q)
    );
  }, [query, filter, students]);

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6 animate-fade-in">

      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy">
            All Registered Students
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} students · sorted by recent activity
          </p>
        </div>
      </header>

      {/* Search */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder={`Search by ${filter === "name" ? "student name" : "registration no"}...`}
            className="h-11 w-full rounded-xl border border-input bg-background pl-9 pr-4 text-sm outline-none transition-all focus:border-orange focus:ring-2 focus:ring-orange/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filter} onValueChange={(v) => setFilter(v)}>
              <SelectTrigger className="h-11 w-36 border-0 bg-transparent shadow-none focus:ring-0">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">By Name</SelectItem>
                <SelectItem value="regd">By Regd No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="orange" className="h-11 rounded-xl">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Regd No</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Year</th>
                <th className="px-6 py-3">Attendance</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-t border-border">
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} className="px-6 py-4">
                          <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                        </td>
                      ))}
                    </tr>
                  ))
                : paged.map((s) => (
                    <tr
                      key={s.regdNo}
                      className="border-t border-border transition-colors hover:bg-muted/40"
                    >
                      {/* Name */}
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-navy text-xs font-semibold text-white">
                            {s?.name
                              ? s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                              : "S"}
                          </div>
                          <span className="font-medium">{s?.name || "Not Updated"}</span>
                        </div>
                      </td>

                      {/* Regd No */}
                      <td className="px-6 py-3.5 font-mono text-xs text-muted-foreground">
                        {s?.regdNo || "N/A"}
                      </td>

                      {/* Department */}
                      <td className="px-6 py-3.5">
                        <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-navy">
                          {s?.department || "N/A"}
                        </span>
                      </td>

                      {/* Year */}
                      <td className="px-6 py-3.5 text-muted-foreground">
                        {s?.year || "N/A"}
                      </td>

                      {/* Attendance */}
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                            <div
                              className={`h-full ${
                                (s?.attendancePercentage ?? 0) >= 50
                                  ? "bg-success"
                                  : "bg-destructive"
                              }`}
                              style={{ width: `${s?.attendancePercentage ?? 0}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold">
                            {s?.attendancePercentage ?? 0}%
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-3.5">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                            (s?.attendancePercentage ?? 0) >= 50
                              ? "bg-success/15 text-success"
                              : "bg-destructive/15 text-destructive"
                          }`}
                        >
                          {(s?.attendancePercentage ?? 0) >= 50 ? "Eligible" : "Low Attendance"}
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {!loading && paged.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <UserX className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-navy">No students found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border bg-muted/30 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Page <span className="font-semibold text-foreground">{page}</span> of{" "}
            <span className="font-semibold text-foreground">{totalPages}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="rounded-lg"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-lg"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}