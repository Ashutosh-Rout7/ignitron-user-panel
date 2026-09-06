import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import HomePage from "./pages/HomePage";
import OrganizerLayout from "./pages/OrganizerLayout";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import VerifyTicket from "./pages/VerifyTicket";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/organizer" element={<OrganizerLayout />}>
          <Route index element={<OrganizerDashboard />} />
          <Route path="verify-tickets" element={<VerifyTicket />} />
          <Route path="students" element={<Students />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;