import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getpass, getProfile ,getMyBooking} from "../services/AllServices";

const AppCtx = createContext(null);
const STORAGE_KEY = "ignitron-app-state-v1";

const seedNotifications = [
  {
    id: "n1",
    type: "announcement",
    title: "Ignitron 2027 is live",
    description:
      "Early-bird passes are now open. Grab them before they're gone.",
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
  const [hydrated, setHydrated] = useState(false);  // ← ADD THIS

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
        setUser(fullUser);
        setPassState(fullUser.passId || null);
      })
      .catch(() => {});
  }, [user?.id]);

  // ---------------- SYNC BOOKING STATE ----------------
    useEffect(() => {
      if (!user) return;

      getMyBooking()
        .then((booking) => {
          if (booking) {
            setSelected(booking.event_ids || []);
            setPaid(true);
          }
        })
        .catch(() => {});
    }, [user?.id]);
  // ---------------- RESTORE ----------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setHydrated(true);  // ← nothing to restore, still mark hydrated
        return;
      }
      const p = JSON.parse(raw);
      setRole(p.role || "guest");
      setUser(p.user || null);
      setPassState(p.pass || null);
      setSelected(p.selectedEventIds || []);
      setPaid(!!p.paid);
    } catch (e) {
      console.log("storage error", e);
    } finally {
      setHydrated(true);  // ← always mark hydrated
    }
  }, []);

  // ---------------- SAVE ----------------
  useEffect(() => {
    if (!hydrated) return;  // ← don't save before restore finishes
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        role,
        user,
        pass,
        selectedEventIds,
        paid,
      })
    );
  }, [role, user, pass, selectedEventIds, paid, hydrated]);

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
      hydrated,  // ← ADD THIS
      setAllEvents,
      notifications,

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
        setRole("guest");
        setUser(null);
        setPassState(null);
        setSelected([]);
        setPaid(false);
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
      hydrated,  // ← ADD THIS
    ]
  );

  return (
    <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return ctx;
}