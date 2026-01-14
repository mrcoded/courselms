import { Suspense } from "react";
import { redirect } from "next/navigation";

import { db } from "@/config/db";
import { getCourses } from "@/lib/actions/get-courses.actions";

import SearchInput from "@/components/search-input";
import CoursesList from "@/components/courses-list";

import { Categories } from "./_components/categories";
import { getServerSession } from "@/lib/get-server-session";

interface SearchPageProps {
  searchParams: Promise<{
    title: string;
    categoryId: string;
  }>;
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const session = await getServerSession();
  const user = session?.user;
  const userId = user?.id;
  //await
  const resolvedSearchParams = await searchParams;

  if (!userId) redirect("/");

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

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
