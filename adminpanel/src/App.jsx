import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import CreatePass from "./pages/CreatePass";
import CreateNotification from "./pages/CreateNotification";
import ManageEvents from "./pages/ManageEvents";
import RegisteredStudents from "./pages/RegisteredStudents";
import NotFound from "./pages/NotFound";
import Profile from "./components/Profile";
import Organizers from "./pages/Organizers";
import Volunteers from "./pages/Volunteers";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const queryClient = new QueryClient();

const PlaceholderPage = ({ title }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-foreground">
      {title}
    </h2>

    <p className="text-sm text-muted-foreground">
      This page is under construction.
    </p>

    <div className="glass-card p-12 text-center text-muted-foreground">
      Coming Soon
    </div>
  </div>
);

// Cookie Based Protected Route
const ProtectedRoute = ({ children }) => {

  const [loading, setLoading] =
    useState(true);

  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {

    checkAuth();

  }, []);

const checkAuth = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/login/check-auth`,
      { method: "GET", credentials: "include" }
    );

    if (response.ok) {
      setAuthenticated(true);
    } else if (response.status === 403) {
      // ✅ logged in but not admin — redirect to login with message
      setAuthenticated(false);
      console.log("Not an admin");
    } else {
      setAuthenticated(false);
    }
  } catch (error) {
    console.log(error);
    setAuthenticated(false);
  } finally {
    setLoading(false);
  }
};

  if (loading) {

    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Checking Authentication...
      </div>
    );
  }

  return authenticated
    ? children
    : <Navigate to="/" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>

    <TooltipProvider>

   <Toaster richColors position="top-center" />

      <Sonner />

      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >

        <Routes>

          {/* Login */}
          <Route
            path="/"
            element={<Login />}
          />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/create-event"
              element={<CreateEvent />}
            />

            <Route
              path="/manage-events"
              element={<ManageEvents />}
            />

            <Route
              path="/create-pass"
              element={<CreatePass />}
            />

            <Route
              path="/students"
              element={<RegisteredStudents />}
            />

            <Route
              path="/organizers"
              element={<Organizers />}
            />

            <Route
              path="/volunteers"
              element={<Volunteers />}  
            />

            <Route
              path="/reports"
              element={
                <PlaceholderPage
                  title="Reports"
                />
              }
            />

            <Route
              path="/create-notification"
              element={
                <CreateNotification />
              }
            />

            <Route
              path="/profile"
              element={<Profile />}
            />
          </Route>

          {/* Not Found */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;