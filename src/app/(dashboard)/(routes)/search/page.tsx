import { Suspense } from "react";
import { redirect } from "next/navigation";

import { db } from "@/config/db";

import SearchInput from "@/components/search-input";
import CoursesList from "@/components/courses-list";
import { Categories } from "./_components/categories";

import { SearchPageProps } from "@/types/dashboard.types";

import { getServerSession } from "@/lib/get-server-session";
import { getCourses } from "@/lib/actions/get-courses.actions";

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const session = await getServerSession();
  const user = session?.user;
  const userId = user?.id;
  //await params
  const resolvedSearchParams = await searchParams;

  // Redirect if not logged in
  if (!userId) redirect("/auth/login");

  // Get categories
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // Get courses
  const courses = await getCourses({
    userId,
    ...resolvedSearchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <Suspense>
          <SearchInput />
        </Suspense>
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
