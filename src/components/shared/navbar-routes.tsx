"use client";

import { Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import SearchInput from "@/components/search-input";
import { useSession } from "@/config/auth-client";

const NavbarRoutes = () => {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();

  // Get if user is a tutor
  const isTutor = session?.data?.user?.role === "tutor";

  const isTutorPage = pathname?.startsWith("/tutor");
  const isCoursePage = pathname?.startsWith("/courses");
  const isSearchPage = pathname === "/search";

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
            onClick={() => router.push(`/`)}
            className="text-xs sm:text-sm"
          >
            <LogOut className="size-2 sm:size-4 sm:mr-2" />
            Back
          </Button>
        ) : isTutor ? (
          <Button
            onClick={() => router.push("/tutor/courses")}
            size="sm"
            variant="ghost"
          >
            Tutor Dashboard
          </Button>
        ) : null}
        {!session?.isPending && !session?.data ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
        ) : null}
      </div>
    </>
  );
};

export default NavbarRoutes;
