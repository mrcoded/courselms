"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import SearchInput from "@/components/search-input";

import { isTutor } from "@/lib/get-tutor";
import { useSession } from "@/config/auth-client";

const NavbarRoutes = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const [isMounted, setIsMounted] = useState(false);

  //check if component is mounted
  useEffect(() => setIsMounted(true), []);

  //get user ID
  const userId = session?.user?.id;

  const isTutorPage = pathname?.startsWith("/tutor");
  const isCoursePage = pathname?.startsWith("/courses");
  const isSearchPage = pathname === "/search";

  //nothing is displayed on server side like hydration errors
  if (!isMounted) return null;

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <Suspense>
            <SearchInput />
          </Suspense>
        </div>
      )}
      <div className="flex gap-x-2 ml-auto items-center">
        {isTutorPage || isCoursePage ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => router.back()}
            className="text-xs sm:text-sm"
          >
            <LogOut className="size-2 sm:size-4 sm:mr-2" />
            Back
          </Button>
        ) : isTutor(userId) ? (
          <Button
            onClick={() => router.push("/tutor/courses")}
            size="sm"
            variant="ghost"
          >
            Tutor Dashboard
          </Button>
        ) : null}
        {!session?.session && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
        )}
      </div>
    </>
  );
};

export default NavbarRoutes;
