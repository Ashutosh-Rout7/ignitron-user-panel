import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { MainLayout } from "./components/layout/MainLayout";
import ProfileGuard from "./components/ProfileGuard";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompleteProfile from "./pages/CompleteProfile";
import PassSelection from "./pages/PassSelection";
import Events from "./pages/Events";
import BookingConfirmation from "./pages/BookingConfirmation";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import MyRegistrations from "./pages/MyRegistrations";
import PaymentSuccess from "./pages/PaymentSuccess";  
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CatCursor from "./components/CatCursor";


function App() {
  return (
    <MainLayout>
      <Toaster richColors position="top-right" />
      <CatCursor /> 
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complete-profile" element={<CompleteProfile />}/>
        <Route path="/verify-email" element={<VerifyEmail />} />  {/* ← ADD THIS */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/pass-selection"
          element={
            <ProfileGuard>
              <PassSelection />
            </ProfileGuard>
          }
        />

        <Route
          path="/events"
          element={
            <ProfileGuard>
              <Events />
            </ProfileGuard>
          }
        />

        <Route
          path="/payment"
          element={
            <ProfileGuard>
              <Payment />
            </ProfileGuard>
          }
        />

        <Route
          path="/my-registrations"
          element={
            <ProfileGuard>
              <MyRegistrations />
            </ProfileGuard>
          }
        />

        <Route
          path="/booking-confirmation"
          element={
            <ProfileGuard>
              <BookingConfirmation />
            </ProfileGuard>
          }
        />

        <Route
          path="/profile"
          element={
            <ProfileGuard>
              <Profile />
            </ProfileGuard>
          }
        />
        // in Routes, after /payment:
        <Route
          path="/payment-success"
          element={<PaymentSuccess />}
        />


        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-white">
              <h1 className="text-3xl font-bold">
                404 - Page Not Found
              </h1>
            </div>
          }
        />
      </Routes>
    </MainLayout>
  );
}

export default App;