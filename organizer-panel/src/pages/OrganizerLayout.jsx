import { Outlet } from "react-router-dom";

import OrganizerSidebar from "@/components/organizer/OrganizerSidebar";
import OrganizerHeader from "@/components/organizer/OrganizerHeader";

export default function OrganizerLayout() {
return ( <div className="flex min-h-screen bg-background">

  {/* Sidebar */}
  <div className="hidden md:block">
    <div className="sticky top-0 h-screen">
      <OrganizerSidebar />
    </div>
  </div>

  {/* Main Content */}
  <div className="flex min-w-0 flex-1 flex-col">
    
    <OrganizerHeader />

    <main className="flex-1 p-4 md:p-8">
      <Outlet />
    </main>

  </div>
</div>

);
}
