import CourseMobileSidebar from "./course-mobile-sidebar";
import NavbarRoutes from "@/components/shared/navbar-routes";

import { CourseNavbarProps } from "@/types/course.types";

const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;
