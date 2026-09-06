import {
  Search,
  Bell,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TopNavbar = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load past notifications from DB
  useEffect(() => {
    axios
      .get(`${BASE_URL}/notifications`, { withCredentials: true })
      .then((res) => {
        setNotifications(res.data);
        setUnreadCount(res.data.length);
      })
      .catch(console.error);
  }, []);

  // Live WebSocket — Admin subscribes to ALL topics
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${BASE_URL}/ws`),
      reconnectDelay: 5000,
      onConnect: () => {
        const handler = (msg) => {
          const n = JSON.parse(msg.body);
          setNotifications((prev) => [n, ...prev]);
          setUnreadCount((prev) => prev + 1);
        };
        client.subscribe("/topic/notifications/students", handler);
        client.subscribe("/topic/notifications/organizers", handler);
        client.subscribe("/topic/notifications/volunteers", handler);
      },
    });
    client.activate();
    return () => client.deactivate();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post(
       `${BASE_URL}/api/login/admin/logout`,
        {},
        { withCredentials: true }
      );
      toast.success("Logout Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Logout Failed");
    }
  };

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-6 shadow-sm">

      {/* Left — Brand */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800 tracking-wide">IGNITRON</h1>
          <p className="text-[11px] text-gray-500 -mt-1">Event Management System</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotifOpen((o) => !o);
              setUnreadCount(0);
            }}
            className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-full mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">

              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 text-sm">Notifications</h3>
                <span className="text-xs text-gray-400">{notifications.length} total</span>
              </div>

              {/* List */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-8">
                    No notifications yet
                  </p>
                ) : (
                  notifications.slice(0, 10).map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-sm font-medium text-gray-800">{n.title}</p>
                        <span className="text-[10px] text-white bg-orange-400 rounded-full px-2 py-0.5 shrink-0">
                          {n.targetAudience}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{n.message}</p>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {n.sender} · {new Date(n.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-gray-100 text-center">
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center shadow-md">
              <span className="text-white text-sm font-bold">AD</span>
            </div>
            <div className="hidden sm:block text-left">
              <h3 className="text-sm font-semibold text-gray-800 leading-none">Admin</h3>
              <p className="text-[11px] text-gray-500 mt-1">Super Administrator</p>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-3 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in duration-200">

              {/* Header */}
              <div className="px-4 py-4 bg-gradient-to-r from-blue-900 to-indigo-900">
                <h2 className="text-white font-semibold text-sm">Admin Panel</h2>
                <p className="text-blue-100 text-xs mt-1">admin@ignitron.com</p>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  View Profile
                </button>

                <div className="border-t border-gray-200 my-2" />

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;