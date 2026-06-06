import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
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

const TopNavbar = () => {

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  // Close Dropdown Outside Click
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  // Logout API
  const handleLogout = async () => {

    try {

      await axios.post(
        "http://localhost:8080/api/login/logout",
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
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-6 shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-3">

        <div>

          <h1 className="text-xl font-bold text-gray-800 tracking-wide">
            IGNITRON
          </h1>

          <p className="text-[11px] text-gray-500 -mt-1">
            Event Management System
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-lg mx-8 hidden md:block">

        <div className="relative">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search events, students, passes..."
            className="w-full h-11 pl-11 pr-4 rounded-xl bg-gray-100 border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200">

          <Bell className="w-5 h-5 text-gray-600" />

          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
            3
          </span>
        </button>

        {/* Profile Dropdown */}
        <div
          className="relative"
          ref={dropdownRef}
        >

          <button
            onClick={() =>
              setDropdownOpen(!dropdownOpen)
            }
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
          >

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center shadow-md">

              <span className="text-white text-sm font-bold">
                AD
              </span>
            </div>

            {/* Admin Info */}
            <div className="hidden sm:block text-left">

              <h3 className="text-sm font-semibold text-gray-800 leading-none">
                Admin
              </h3>

              <p className="text-[11px] text-gray-500 mt-1">
                Super Administrator
              </p>
            </div>

            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                dropdownOpen
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (

            <div className="absolute right-0 top-full mt-3 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in duration-200">

              {/* Header */}
              <div className="px-4 py-4 bg-gradient-to-r from-blue-900 to-indigo-900">

                <h2 className="text-white font-semibold text-sm">
                  Admin Panel
                </h2>

                <p className="text-blue-100 text-xs mt-1">
                  admin@ignitron.com
                </p>
              </div>

              {/* Menu */}
              <div className="p-2">

                <button
                  onClick={() =>
                    navigate("/profile")
                  }
                  className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
                >

                  <User className="w-4 h-4" />

                  View Profile
                </button>

                <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-xl transition-all">

                  <Settings className="w-4 h-4" />

                  Settings
                </button>

                <div className="border-t border-gray-200 my-2" />

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all"
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