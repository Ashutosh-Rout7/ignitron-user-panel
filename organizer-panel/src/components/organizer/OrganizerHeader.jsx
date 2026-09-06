import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Bell, ChevronDown, Menu,
  User as UserIcon, Flame,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import OrganizerSidebar from "./OrganizerSidebar";
import { getOrganizerProfile } from "../../services/AllServices";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const playSound = () => {
  const audio = new Audio("/notification.mp3");
  audio.volume = 1.0;
  audio.play().catch(() => {});
};

const OrganizerHeader = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [profile, setProfile] = useState(null);
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


  // Load organizer profile
  useEffect(() => {
    getOrganizerProfile()
      .then((data) => setProfile(data))
      .catch(() => {});
  }, []);

  // Load past notifications from DB
  useEffect(() => {
    axios
      .get(`${BASE_URL}/notifications`, { withCredentials: true })
      .then((res) => {
        // Show only notifications meant for organizers
        const filtered = res.data.filter(
          (n) => n.targetAudience === "ORGANIZERS"
        );
        setNotifications(filtered);
        setUnreadCount(filtered.length);
      })
      .catch(console.error);
  }, []);

  // Live WebSocket — Organizer subscribes only to organizer topic
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${BASE_URL}/ws`),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe("/topic/notifications/organizers", (msg) => {
          const n = JSON.parse(msg.body);
          setNotifications((prev) => [n, ...prev]);
          setUnreadCount((prev) => prev + 1);
           playSound(); // ← add this
        });
      },
    });
    client.activate();
    return () => client.deactivate();
  }, []);

  const fullname = profile?.fullname || "Organizer";
  const initials = fullname
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-white/70 px-4 backdrop-blur-xl md:px-6">

      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Trigger */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 border-0 bg-transparent p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <OrganizerSidebar onNavigate={() => setSheetOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="hidden items-center gap-2 md:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
            <Flame className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-slate-800">Ignitron</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-orange-500">Organizer Panel</span>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">

        {/* Notifications Bell */}
        <DropdownMenu onOpenChange={(open) => { if (open) setUnreadCount(0); }}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80 border border-gray-200 bg-white p-0 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <div>
                <div className="text-sm font-semibold">Notifications</div>
                <div className="text-xs text-gray-500">{notifications.length} total</div>
              </div>
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-600">
                LIVE
              </span>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-400">
                  No notifications yet
                </p>
              ) : (
                notifications.slice(0, 10).map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 border-b border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    <div className="flex-1">
                      <div className="text-sm font-medium leading-snug">{n.title}</div>
                      <div className="mt-0.5 text-xs text-gray-500">{n.message}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-wide text-gray-400">
                        {n.sender} · {new Date(n.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 bg-gray-50 px-4 py-2 text-center">
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-1.5 py-1 pr-3 shadow-sm transition-colors hover:bg-gray-50">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-slate-800 text-xs font-semibold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:inline">{fullname}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 border border-gray-200 bg-white shadow-xl">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{fullname}</span>
                <span className="text-xs font-normal text-gray-500">{profile?.email || ""}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/organizer/profile" className="cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                View Profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
};

export default OrganizerHeader;