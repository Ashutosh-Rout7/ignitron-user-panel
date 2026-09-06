import { useState } from "react";
import { toast } from "sonner";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
  LayoutDashboard,
  CalendarPlus,
  CalendarCog,
  Ticket,
  Users,
  UserCog,
  Heart,
  Tag,
  BarChart3,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Create Event",
    url: "/create-event",
    icon: CalendarPlus,
  },

  {
    title: "Manage Events",
    url: "/manage-events",
    icon: CalendarCog,
  },

  {
    title: "Create Pass",
    url: "/create-pass",
    icon: Ticket,
  },

  {
    title: "Registered Students",
    url: "/students",
    icon: Users,
  },

  {
    title: "Organizers",
    url: "/organizers",
    icon: UserCog,
  },

  {
    title: "Volunteers",
    url: "/volunteers",
    icon: Heart,
  },

  {
    title: "Create Notification",
    url: "/create-notification",
    icon: Bell,
  },
];

const AppSidebar = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const [collapsed, setCollapsed] =
    useState(false);

  // Logout Function
  const handleLogout = async () => {

    try {

      await axios.post(
         `${BASE_URL}/api/login/admin/logout`,
        {},
        {
          withCredentials: true,
        }
      );

     toast.success("Logout Successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Logout Failed");
    }
  };

  return (
    <aside
      className={`${
        collapsed ? "w-[70px]" : "w-[260px]"
      } h-screen fixed left-0 top-0 bg-[#0f1c4d] flex flex-col transition-all duration-300 ease-out border-r border-gray-800 z-50`}
    >

      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-800">

        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">

          <span className="text-white font-bold text-sm">
            I
          </span>
        </div>

        {!collapsed && (

          <div className="ml-3 overflow-hidden">

            <h1 className="text-white font-bold text-sm leading-tight">
              Ignitron
            </h1>

            <p className="text-gray-400 text-[10px]">
              Event Management
            </p>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">

        {menuItems.map((item) => {

          const active =
            location.pathname === item.url;

          return (
            <Link
              key={item.title}
              to={item.url}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                active
                  ? "bg-orange-500 text-white font-medium"
                  : "text-gray-300 hover:bg-[#1b2a63] hover:text-white"
              }`}
            >

              <item.icon className="w-[18px] h-[18px] shrink-0" />

              {!collapsed && (
                <span>{item.title}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-800">

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-red-500 hover:text-white w-full transition-all duration-200 cursor-pointer"
        >

          <LogOut className="w-[18px] h-[18px] shrink-0" />

          {!collapsed && (
            <span>Logout</span>
          )}
        </button>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() =>
          setCollapsed(!collapsed)
        }
        className="absolute top-20 -right-3 w-6 h-6 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center text-gray-600 hover:text-black transition-colors z-50 cursor-pointer"
        style={{
          left: collapsed ? 57 : 247,
        }}
      >

        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </aside>
  );
};

export default AppSidebar;