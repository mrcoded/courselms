"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

import SearchInput from "../search-input";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const { isAuthenticated } = useKindeBrowserClient();

  const isTutorPage = pathname?.startsWith("/tutor");
  const isCoursePage = pathname?.startsWith("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto items-center">
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
        {!isAuthenticated && <LoginLink>Login</LoginLink>}
      </div>
    </>
  );
};

export default NavbarRoutes;
