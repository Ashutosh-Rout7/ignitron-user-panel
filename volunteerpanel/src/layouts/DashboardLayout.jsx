import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Header } from "../components/dashboard/Header";
import { Toast as ToastProvider } from "../components/dashboard/Toast";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <Header onMenu={() => setOpen(true)} />
        <main className="lg:pl-[280px] pt-[72px]">
          <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}