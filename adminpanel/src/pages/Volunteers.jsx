import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Users, Clock, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default function Volunteers() {
  const [requests, setRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(null);

  useEffect(() => {
    fetchRequests();
    fetchVolunteers();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await API.get("/api/admin/volunteer-requests");
      setRequests(response.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch volunteer requests");
    } finally {
      setLoading(false);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const response = await API.get("/api/admin/volunteers");
      setVolunteers(response.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirm = async (user) => {
    try {
      setConfirming(user.id);
      await API.put(`/api/admin/user/${user.id}/make-volunteer`);
      toast.success(`${user.fullname} is now a Volunteer!`);
      setRequests((prev) => prev.filter((r) => r.id !== user.id));
      // ✅ refresh volunteers list after approval
      fetchVolunteers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve volunteer");
    } finally {
      setConfirming(null);
    }
  };

  const handleReject = async (user) => {
    try {
      setRequests((prev) => prev.filter((r) => r.id !== user.id));
      toast.success(`Request from ${user.fullname} rejected.`);
    } catch (err) {
      toast.error("Failed to reject request");
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Volunteer Requests
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Review and approve students requesting volunteer access.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2">
          <Clock className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium">
            {requests.length} Pending
          </span>
        </div>
      </div>

      {/* Pending Requests */}
      {loading ? (
        <div className="glass-card p-12 text-center text-muted-foreground">
          Loading requests...
        </div>
      ) : requests.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-green-500/10">
            <Users className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold">No pending requests</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            No students have requested volunteer access yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 hover:border-green-500/30 transition"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-lg font-bold text-white">
                  {user.fullname?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold text-foreground">{user.fullname}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>

                  <div className="mt-1 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-600">
                      <GraduationCap className="h-3 w-3" />
                      {user.regdNo || "N/A"}
                    </span>
                    <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                      {user.department || "N/A"}
                    </span>
                    <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-medium text-orange-600">
                      {user.year || "N/A"}
                    </span>
                    <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium text-purple-600">
                      {user.degree || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReject(user)}
                  className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition"
                >
                  <XCircle className="h-4 w-4" />
                  Reject
                </button>

                <button
                  onClick={() => handleConfirm(user)}
                  disabled={confirming === user.id}
                  className="flex items-center gap-1.5 rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 transition disabled:opacity-60"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {confirming === user.id ? "Approving..." : "Confirm"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Approved Volunteers List */}
      {volunteers.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                All Volunteers
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Students with volunteer access.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2">
              <Users className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">
                {volunteers.length} Total
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            {volunteers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 hover:border-green-500/30 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-lg font-bold text-white">
                    {user.fullname?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-semibold text-foreground">{user.fullname}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>

                    <div className="mt-1 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-600">
                        <GraduationCap className="h-3 w-3" />
                        {user.regdNo || "N/A"}
                      </span>
                      <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                        {user.department || "N/A"}
                      </span>
                      <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-medium text-orange-600">
                        {user.year || "N/A"}
                      </span>
                      <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium text-purple-600">
                        {user.degree || "N/A"}
                      </span>
                      <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-600">
                        ✅ Volunteer
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
