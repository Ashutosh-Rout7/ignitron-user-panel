import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import TopNavbar from "./TopNavbar";

const DashboardLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Section */}
      <div className="ml-[260px] flex flex-col min-h-screen">
        
        {/* Navbar */}
        <TopNavbar />

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;