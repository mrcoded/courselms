import React from "react";

import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "@/components/shared/navbar-routes";

const Navbar = ({ sessionId, role }: { sessionId?: string; role?: string }) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes sessionId={sessionId} role={role} />
    </div>
  );
};

export default Navbar;
