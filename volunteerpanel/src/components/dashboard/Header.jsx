import { useEffect, useState } from "react";
import { Bell, Menu, User as UserIcon, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getVolunteerProfile } from "../../services/AllServices.js";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const playSound = () => {
  const audio = new Audio("/notification.mp3");
  audio.volume = 1.0;
  audio.play().catch(() => {});
};

export function Header({ onMenu }) {
  const [volunteer, setVolunteer] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  //notification
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


  useEffect(() => {
    getVolunteerProfile().then(setVolunteer).catch(console.error);
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/notifications`, { withCredentials: true })
      .then((res) => {
        const filtered = res.data.filter(
          (n) => n.targetAudience === "VOLUNTEERS"
        );
        setNotifications(filtered);
        setUnreadCount(filtered.length);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const client = new Client({
     webSocketFactory: () => new SockJS(`${BASE_URL}/ws`),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe("/topic/notifications/volunteers", (msg) => {
          const n = JSON.parse(msg.body);

          setNotifications((prev) => [n, ...prev]);
          setUnreadCount((prev) => prev + 1);
          playSound();
        });
      },
    });

    client.activate();
    return () => client.deactivate();
  }, []);

  const initial =
    volunteer?.fullname?.charAt(0).toUpperCase() || "V";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-violet-100 bg-gradient-to-r from-white via-violet-50/60 to-orange-50/50 backdrop-blur-xl px-4 md:px-6 shadow-[0_1px_20px_-5px_rgba(99,102,241,0.15)] transition-all duration-300 relative">

      {/* subtle gradient accent line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-orange-400/50 via-violet-500/50 to-indigo-500/50" />

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenu}
          className="lg:hidden p-2 rounded-xl hover:bg-violet-50 hover:text-violet-600 active:scale-95 transition-all duration-200"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:block group">
          <div className="flex items-center gap-1.5 text-xs font-medium text-violet-400 tracking-wide">
            Welcome back
            <Sparkles className="h-3 w-3 text-orange-400 transition-transform duration-300 group-hover:rotate-12 group-hover:text-orange-500" />
          </div>
          <div className="text-sm font-bold bg-gradient-to-r from-violet-700 via-indigo-600 to-orange-500 bg-clip-text text-transparent">
            {volunteer?.fullname?.split(" ")[0] || "..."} 👋
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATIONS */}
        <DropdownMenu
          onOpenChange={(open) => open && setUnreadCount(0)}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-violet-50 hover:shadow-inner active:scale-95 transition-all duration-200 group"
            >
              <Bell className="h-5 w-5 text-gray-700 transition-transform duration-300 group-hover:text-violet-600 group-hover:-rotate-6" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-red-500 px-1 text-[10px] font-bold text-white shadow-md ring-2 ring-white animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-80 p-0 rounded-2xl border border-gray-100 shadow-2xl bg-white/95 backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          >

            {/* HEADER */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-violet-50 via-indigo-50 to-white">
              <div className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Bell className="h-4 w-4 text-violet-500" />
                Notifications
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {notifications.length} total
              </div>
            </div>

            {/* LIST */}
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-8 w-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">
                    No notifications yet
                  </p>
                </div>
              ) : (
                notifications.slice(0, 10).map((n) => (
                  <div
                    key={n.id}
                    className="px-4 py-3 hover:bg-violet-50/60 transition-colors duration-150 cursor-pointer relative group"
                  >
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-violet-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center" />
                    <div className="text-sm font-medium text-gray-800">
                      {n.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {n.message}
                    </div>
                  </div>
                ))
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* PROFILE */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-violet-50 active:scale-95 transition-all duration-200">
              <Avatar className="h-8 w-8 ring-2 ring-transparent hover:ring-violet-200 transition-all duration-200">
               <AvatarFallback className="bg-slate-700 text-white text-xs font-semibold">
                {initial}
              </AvatarFallback>
              </Avatar>

              <span className="hidden sm:inline text-sm font-medium text-gray-800">
                {volunteer?.fullname}
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 rounded-2xl shadow-2xl border border-gray-100 bg-white/95 backdrop-blur-xl p-1.5 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700 rounded-xl transition-all duration-150"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                <UserIcon className="h-4 w-4" />
              </div>
              View Profile
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}
