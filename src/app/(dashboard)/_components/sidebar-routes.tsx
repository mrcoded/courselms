"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import React from "react";
import SidebarItem from "./sidebar-items";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const tutorRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/tutor/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/tutor/analytics",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTutorPage = pathname?.includes("/tutor");

  const routes = isTutorPage ? tutorRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
