import { Navigate } from "react-router-dom";
import { useApp } from "../lib/app-store";

function ProfileGuard({ children }) {
  const { user, hydrated } = useApp();

  // Wait for localStorage to restore
  if (!hydrated) {
    return null;  // or a loading spinner
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but profile incomplete
  if (!user.profileComplete) {
    return <Navigate to="/complete-profile" replace />;
  }

  return children;
}

export default ProfileGuard;