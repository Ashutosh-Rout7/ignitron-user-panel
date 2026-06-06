import { useState } from "react";

import { Link } from "react-router-dom";

import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  User as UserIcon,
  Flame,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import OrganizerSidebar from "./OrganizerSidebar";

const notifications = [
  {
    id: 1,
    title: "New student registration",
    desc: "Aarav Kumar registered for TechFest 2026.",
    time: "2m ago",
    type: "registration",
  },
  {
    id: 2,
    title: "Attendance updated",
    desc: "CSE-3rd year attendance synced (42 records).",
    time: "18m ago",
    type: "attendance",
  },
  {
    id: 3,
    title: "Admin announcement",
    desc: "Verification deadline extended to Friday.",
    time: "1h ago",
    type: "admin",
  },
  {
    id: 4,
    title: "New student registration",
    desc: "Priya Singh registered for HackNight.",
    time: "3h ago",
    type: "registration",
  },
];

const OrganizerHeader = () => {

  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-white/70 px-4 backdrop-blur-xl md:px-6">

      <div className="flex items-center gap-3">

        {/* Mobile Sidebar Trigger */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>

          <SheetTrigger asChild>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-64 border-0 bg-transparent p-0"
          >

            <SheetTitle className="sr-only">
              Navigation
            </SheetTitle>

            <OrganizerSidebar
              onNavigate={() => setSheetOpen(false)}
            />

          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="hidden items-center gap-2 md:flex">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">

            <Flame
              className="h-5 w-5 text-white"
              strokeWidth={2.5}
            />

          </div>

          <div className="flex flex-col leading-tight">

            <span className="text-sm font-bold tracking-tight text-slate-800">
              Ignitron
            </span>

            <span className="text-[10px] font-medium uppercase tracking-widest text-orange-500">
              Organizer Panel
            </span>

          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">

        {/* Notifications */}
        <DropdownMenu>

          <DropdownMenuTrigger asChild>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
            >

              <Bell className="h-5 w-5" />

              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">

                4

              </span>
            </Button>

          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-80 border border-gray-200 bg-white p-0 shadow-xl"
          >

            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">

              <div>

                <div className="text-sm font-semibold">
                  Notifications
                </div>

                <div className="text-xs text-gray-500">
                  4 unread
                </div>

              </div>

              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-600">

                LIVE

              </span>
            </div>

            <div className="max-h-80 overflow-y-auto">

              {notifications.map((n) => (

                <div
                  key={n.id}
                  className="flex items-start gap-3 border-b border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50"
                >

                  <div
                    className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                      n.type === "registration"
                        ? "bg-orange-500"
                        : n.type === "attendance"
                        ? "bg-green-500"
                        : "bg-slate-700"
                    }`}
                  />

                  <div className="flex-1">

                    <div className="text-sm font-medium leading-snug">
                      {n.title}
                    </div>

                    <div className="mt-0.5 text-xs text-gray-500">
                      {n.desc}
                    </div>

                    <div className="mt-1 text-[10px] uppercase tracking-wide text-gray-400">
                      {n.time}
                    </div>

                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 bg-gray-50 px-4 py-2 text-center text-xs font-medium text-slate-700 hover:text-orange-500">

              <button>
                View all notifications
              </button>

            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>

          <DropdownMenuTrigger asChild>

            <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-1.5 py-1 pr-3 shadow-sm transition-colors hover:bg-gray-50">

              <Avatar className="h-7 w-7">

                <AvatarFallback className="bg-slate-800 text-xs font-semibold text-white">

                  RS

                </AvatarFallback>

              </Avatar>

              <span className="hidden text-sm font-medium sm:inline">
                Rahul Sharma
              </span>

              <ChevronDown className="h-4 w-4 text-gray-500" />

            </button>

          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 border border-gray-200 bg-white shadow-xl"
          >

            <DropdownMenuLabel>

              <div className="flex flex-col">

                <span className="text-sm font-semibold">
                  Rahul Sharma
                </span>

                <span className="text-xs font-normal text-gray-500">
                  rahul@ignitron.edu
                </span>

              </div>

            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>

              <Link
                to="/organizer/profile"
                className="cursor-pointer"
              >

                <UserIcon className="mr-2 h-4 w-4" />

                View Profile

              </Link>

            </DropdownMenuItem>

            <DropdownMenuItem asChild>

              <Link
                to="/"
                className="cursor-pointer text-red-500 focus:text-red-500"
              >

                <LogOut className="mr-2 h-4 w-4" />

                Logout

              </Link>

            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default OrganizerHeader;