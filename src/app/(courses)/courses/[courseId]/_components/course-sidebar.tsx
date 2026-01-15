import React from "react";
import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/get-server-session";

import CourseSidebarItem from "./course-sidebar-item";
import CourseProgress from "@/components/course-progress";

import { CourseSidebarProps } from "@/types/course.types";
import { getPurchase } from "@/lib/actions/get-purchase.actions";

const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
  const session = await getServerSession();
  const user = session?.user;
  const userId = user?.id;

  // Redirect if not logged in
  if (!userId) redirect("/");

  // Get purchase
  const purchase = await getPurchase({ userId, course });

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
