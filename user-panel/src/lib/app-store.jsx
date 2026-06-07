import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getpass,
  getProfile,
  getMyBooking,
  requestOrganizerApi,
  requestVolunteerApi,
} from "../services/AllServices";

const AppCtx = createContext(null);
const STORAGE_KEY = "ignitron-app-state-v1";

const seedNotifications = [
  {
    id: "n1",
    type: "announcement",
    title: "Ignitron 2027 is live",
    description: "Early-bird passes are now open. Grab them before they're gone.",
    timestamp: "2m ago",
    read: false,
  },
];

export function AppProvider({ children }) {
  const [role, setRole] = useState("guest");
  const [user, setUser] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [pass, setPassState] = useState(null);
  const [allPasses, setAllPasses] = useState([]);
  const [selectedEventIds, setSelected] = useState([]);
  const [paid, setPaid] = useState(false);
  const [notifications, setNotifications] = useState(seedNotifications);
  const [hydrated, setHydrated] = useState(false);

  const [organizerRequested, setOrganizerRequested] = useState(false);
  const [volunteerRequested, setVolunteerRequested] = useState(false);
  const [organizerApproved, setOrganizerApproved] = useState(false);
  const [volunteerApproved, setVolunteerApproved] = useState(false);

  // ---------------- LOAD PASSES ----------------
  useEffect(() => {
    if (!user) return;
    getpass()
      .then((data) => setAllPasses(data || []))
      .catch(() => {});
  }, [user]);

  // ---------------- SYNC FULL PROFILE ----------------
  useEffect(() => {
    if (!user) return;
    getProfile()
      .then((fullUser) => {
        if (fullUser.id === user.id || fullUser._id === user._id) {
          setUser(fullUser);
          setPassState(fullUser.passId || null);
        }
      })
      .catch(() => {});
  }, [user?.id]);

  // ---------------- REFETCH ON TAB FOCUS ----------------
  useEffect(() => {
    if (!user) return;

    const handleFocus = async () => {
      try {
        const fullUser = await getProfile();
        if (fullUser.id === user.id || fullUser._id === user._id) {
          setUser(fullUser);
        }
      } catch (e) {}
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [user?.id]);

  // ---------------- SYNC BOOKING STATE ----------------
  // ✅ paid is NEVER stored in localStorage — always derived from backend
  useEffect(() => {
    if (!user) return;
    getMyBooking()
      .then((booking) => {
        if (booking) {
          setSelected(booking.event_ids || []);
          setPaid(booking.status === "CONFIRMED");
        } else {
          setPaid(false);
        }
      })
      .catch(() => {
        setPaid(false);
      });
  }, [user?.id]);

  // ---------------- SYNC ROLES ----------------
  useEffect(() => {
    if (!user) return;
    const roles = user.roles || [];
    setOrganizerApproved(roles.includes("ORGANIZER"));
    setVolunteerApproved(roles.includes("VOLUNTEER"));
    setOrganizerRequested(user.organizerRequested || false);
    setVolunteerRequested(user.volunteerRequested || false);
  }, [user]);

  // ---------------- POLL FOR APPROVAL ----------------
  useEffect(() => {
    if (!user) return;
    if (!organizerRequested && !volunteerRequested) return;

    const currentUserId = user.id || user._id;

    const interval = setInterval(async () => {
      try {
        const freshUser = await getProfile();
        const freshId = freshUser.id || freshUser._id;
        if (freshId !== currentUserId) return;

        const roles = freshUser.roles || [];

        if (organizerRequested && roles.includes("ORGANIZER")) {
          clearInterval(interval);
          window.dispatchEvent(new CustomEvent("organizer-approved"));
        }

        if (volunteerRequested && roles.includes("VOLUNTEER")) {
          clearInterval(interval);
          window.dispatchEvent(new CustomEvent("volunteer-approved"));
        }
      } catch (e) {}
    }, 5000);

    return () => clearInterval(interval);
  }, [user?.id, organizerRequested, volunteerRequested]);

  // ---------------- RESTORE ----------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setHydrated(true);
        return;
      }
      const p = JSON.parse(raw);
      setRole(p.role || "guest");
      setUser(p.user || null);
      setPassState(p.pass || null);
      setSelected(p.selectedEventIds || []);
      // ✅ paid is NOT restored from localStorage
    } catch (e) {
      console.log("storage error", e);
    } finally {
      setHydrated(true);
    }
  }, []);

  // ---------------- SAVE ----------------
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        role,
        user,
        pass,
        selectedEventIds,
        // ✅ paid is NOT saved to localStorage
      })
    );
  }, [role, user, pass, selectedEventIds, hydrated]);

  // ---------------- RESOLVE PASS OBJECT ----------------
  const resolvedPass =
    typeof pass === "string"
      ? allPasses.find((p) => p.id === pass || p._id === pass)
      : pass;

  // ---------------- CONTEXT VALUE ----------------
  const value = useMemo(
    () => ({
      role,
      user,
      pass,
      resolvedPass,
      selectedEventIds,
      paid,
      allEvents,
      hydrated,
      setAllEvents,
      notifications,
      organizerRequested,
      volunteerRequested,
      organizerApproved,
      volunteerApproved,

      // LOGIN
      loginUser: (userData) => {
        setUser(userData);
        setRole(userData.role || "student");
        setPassState(userData.passId || null);
      },

      // UPDATE PROFILE
      updateProfile: (updatedData) => {
        setUser((prev) => ({ ...prev, ...updatedData }));
      },

      // LOGOUT
      logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        setRole("guest");
        setUser(null);
        setPassState(null);
        setSelected([]);
        setPaid(false);
        setOrganizerRequested(false);
        setVolunteerRequested(false);
        setOrganizerApproved(false);
        setVolunteerApproved(false);
      },

      // SET PASS
      setPass: (p) => {
        setPassState(p);
        setSelected([]);
      },

      // EVENT TOGGLE
      toggleEvent: (id) => {
        setSelected((cur) => {
          const isSelected = cur.includes(id);
          if (isSelected) return cur.filter((x) => x !== id);
          const max = resolvedPass?.maxevents || 0;
          if (cur.length >= max) return cur;
          return [...cur, id];
        });
      },

      clearSelection: () => setSelected([]),

      // PAYMENT
      confirmPayment: () => {
        setPaid(true);
        setNotifications((n) => [
          {
            id: `n${Date.now()}`,
            type: "booking",
            title: "Booking Confirmed",
            description: `Your Ignitron ₹${resolvedPass?.price} pass is ready.`,
            timestamp: "Just now",
            read: false,
          },
          ...n,
        ]);
      },

      // REQUEST ORGANIZER
      requestOrganizer: async () => {
        const res = await requestOrganizerApi();
        setOrganizerRequested(true);
        setUser((prev) => ({ ...prev, organizerRequested: true }));
        return res;
      },

      // REQUEST VOLUNTEER
      requestVolunteer: async () => {
        const res = await requestVolunteerApi();
        setVolunteerRequested(true);
        setUser((prev) => ({ ...prev, volunteerRequested: true }));
        return res;
      },
    }),
    [
      role,
      user,
      pass,
      resolvedPass,
      selectedEventIds,
      paid,
      notifications,
      allEvents,
      hydrated,
      organizerRequested,
      volunteerRequested,
      organizerApproved,
      volunteerApproved,
    ]
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return ctx;
}