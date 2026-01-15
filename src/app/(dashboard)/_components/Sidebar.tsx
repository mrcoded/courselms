"use client";

import React from "react";
import Logo from "./logo";
import { LogOut } from "lucide-react";

import SidebarRoutes from "./sidebar-routes";
import { Button } from "@/components/ui/button";

import { LogoutService } from "@/services/auth.service";

const Sidebar = () => {
  //handle logout
  const { handleLogout } = LogoutService();

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-1 flex-col w-full">
        <SidebarRoutes />
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={handleLogout}
        className="flex justify-start items-center text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20"
      >
        <LogOut className="size-3 sm:size-4 mr-2" /> Logout
      </Button>
    </div>
  );
};

export default Sidebar;
