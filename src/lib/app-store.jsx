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
   getallEvents,  // ← add this
} from "../services/AllServices";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AppCtx = createContext(null);
const STORAGE_KEY = "ignitron-app-state-v1";

const playSound = () => {
  const audio = new Audio("/notification.mp3");
  audio.volume = 1.0;
  audio.play().catch(() => {});
};

export function AppProvider({ children }) {
  const [role, setRole] = useState("guest");
  const [user, setUser] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [pass, setPassState] = useState(null);
  const [allPasses, setAllPasses] = useState([]);
  const [selectedEventIds, setSelected] = useState([]);
  const [paid, setPaid] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  const [organizerRequested, setOrganizerRequested] = useState(false);
  const [volunteerRequested, setVolunteerRequested] = useState(false);
  const [organizerApproved, setOrganizerApproved] = useState(false);
  const [volunteerApproved, setVolunteerApproved] = useState(false);

  // ---------------- UNLOCK AUDIO ----------------
  useEffect(() => {
    const unlock = () => {
      const audio = new Audio("/notification.mp3");
      audio.volume = 0;
      audio.play().then(() => audio.pause()).catch(() => {});
      document.removeEventListener("click", unlock);
    };
    document.addEventListener("click", unlock);
    return () => document.removeEventListener("click", unlock);
  }, []);

  // ---------------- LOAD PASSES ----------------
  useEffect(() => {
    if (!user) return;
    getpass()
      .then((data) => setAllPasses(data || []))
      .catch(() => {});
  }, [user]);


  // ---------------- LOAD ALL EVENTS ----------------
useEffect(() => {
  if (!user) return;
  getallEvents()
    .then((data) => setAllEvents(data || []))
    .catch(() => {});
}, [user?.id]);

  // ---------------- SYNC FULL PROFILE ----------------
  useEffect(() => {
    if (!user) return;
    getProfile()
      .then((fullUser) => {
        if (fullUser.id === user.id || fullUser._id === user._id) {
          setUser(fullUser);
          setPassState(fullUser.passId || null);
          // ← sync roles on profile fetch too
          const roles = fullUser.roles || [];
          setOrganizerApproved(roles.includes("ORGANIZER"));
          setVolunteerApproved(roles.includes("VOLUNTEER"));
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
          const roles = fullUser.roles || [];
          setOrganizerApproved(roles.includes("ORGANIZER"));
          setVolunteerApproved(roles.includes("VOLUNTEER"));
        }
      } catch (e) {}
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [user?.id]);

  // ---------------- SYNC BOOKING STATE ----------------
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
      .catch(() => { setPaid(false); });
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
          setTimeout(() => {   // ← delay to avoid race condition
            window.dispatchEvent(new CustomEvent("organizer-approved"));
          }, 500);
        }
        if (volunteerRequested && roles.includes("VOLUNTEER")) {
          clearInterval(interval);
          setTimeout(() => {   // ← delay to avoid race condition
            window.dispatchEvent(new CustomEvent("volunteer-approved"));
          }, 500);
        }
      } catch (e) {}
    }, 5000);
    return () => clearInterval(interval);
  }, [user?.id, organizerRequested, volunteerRequested]);

  // ---------------- LOAD PAST NOTIFICATIONS ----------------
  useEffect(() => {
    if (!user) return;
    axios
      .get(`${BASE_URL}/notifications`, { withCredentials: true })
      .then((res) => {
        const filtered = res.data.filter((n) => n.targetAudience === "ALL_STUDENTS");
        setNotifications(filtered.map((n) => ({
          id: n.id,
          type: "announcement",
          title: n.title,
          description: n.message,
          timestamp: new Date(n.createdAt).toLocaleString(),
          read: false,
        })));
      })
      .catch(console.error);
  }, [user?.id]);

  // ---------------- LIVE WEBSOCKET ----------------
  useEffect(() => {
    if (!user) return;
    const client = new Client({
      webSocketFactory: () => new SockJS(`${BASE_URL}/ws`),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe("/topic/notifications/students", (msg) => {
          const n = JSON.parse(msg.body);
          setNotifications((prev) => [
            {
              id: n.id,
              type: "announcement",
              title: n.title,
              description: n.message,
              timestamp: new Date(n.createdAt).toLocaleString(),
              read: false,
            },
            ...prev,
          ]);
          playSound();
        });
      },
    });
    client.activate();
    return () => client.deactivate();
  }, [user?.id]);

  // ---------------- RESTORE ----------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) { setHydrated(true); return; }
      const p = JSON.parse(raw);
      setRole(p.role || "guest");
      setUser(p.user || null);
      setPassState(p.pass || null);
      setSelected(p.selectedEventIds || []);
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
      JSON.stringify({ role, user, pass, selectedEventIds })
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

      // ← loginUser now sets both approved states immediately
      loginUser: (userData) => {
        setUser(userData);
        const roles = userData.roles || [];
        let derivedRole = "student";
        if (roles.includes("ORGANIZER") && roles.includes("VOLUNTEER")) {
          derivedRole = "organizer";
        } else if (roles.includes("ORGANIZER")) {
          derivedRole = "organizer";
        } else if (roles.includes("VOLUNTEER")) {
          derivedRole = "volunteer";
        } else if (roles.includes("ADMIN")) {
          derivedRole = "admin";
        }
        setRole(derivedRole);
        setOrganizerApproved(roles.includes("ORGANIZER")); // ← sync immediately
        setVolunteerApproved(roles.includes("VOLUNTEER"));  // ← sync immediately
        setPassState(userData.passId || null);
      },

      updateProfile: (updatedData) => {
        setUser((prev) => ({ ...prev, ...updatedData }));
      },

      logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        setRole("guest");
        setUser(null);
        setPassState(null);
        setSelected([]);
        setPaid(false);
        setNotifications([]);
        setOrganizerRequested(false);
        setVolunteerRequested(false);
        setOrganizerApproved(false);
        setVolunteerApproved(false);
      },

      setPass: (p) => {
        setPassState(p);
        setSelected([]);
      },

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

      markNotificationRead: (id) => {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
      },

      markAllRead: () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      },

      requestOrganizer: async () => {
        const res = await requestOrganizerApi();
        setOrganizerRequested(true);
        setUser((prev) => ({ ...prev, organizerRequested: true }));
        return res;
      },

      requestVolunteer: async () => {
        const res = await requestVolunteerApi();
        setVolunteerRequested(true);
        setUser((prev) => ({ ...prev, volunteerRequested: true }));
        return res;
      },
    }),
    [
      role, user, pass, resolvedPass, selectedEventIds,
      paid, notifications, allEvents, hydrated,
      organizerRequested, volunteerRequested,
      organizerApproved, volunteerApproved,
    ]
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}