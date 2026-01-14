import React from "react";
import { redirect } from "next/navigation";

import CourseNavbar from "./_components/course-navbar";
import CourseSidebar from "./_components/course-sidebar";

import { getServerSession } from "@/lib/get-server-session";
import { getProgressActions } from "@/lib/actions/get-progress.actions";
import { getOneCourseWithProgress } from "@/services/get-one-course.service";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) => {
  const session = await getServerSession();
  const user = session?.user;
  const userId = user?.id;

  // Redirect if not logged in
  if (!userId) redirect("/");

  // Get courseId from params
  const { courseId } = await params;

  // Get course with progress
  const course = await getOneCourseWithProgress({ courseId, userId });

  // Redirect if course not found
  if (!course) {
    return redirect("/");
  }

  // Get progress total
  const progressCount = await getProgressActions(userId, course.id);

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
