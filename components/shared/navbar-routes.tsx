"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTutorPage = pathname?.startsWith("/tutor");
  const isCoursePage = pathname?.startsWith("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTutorPage || isCoursePage ? (
        <Link href="/">
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" /> Exit
          </Button>
        </Link>
      ) : (
        <Link href="/tutor/courses">
          <Button size="sm" variant="ghost">
            Tutor Dashboard
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavbarRoutes;
