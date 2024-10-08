import { Suspense } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getCourses } from "@/lib/actions/get-courses.actions";

import SearchInput from "@/components/search-input";
import CoursesList from "@/components/courses-list";

import { Categories } from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;

  if (!userId) redirect("/");

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
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
