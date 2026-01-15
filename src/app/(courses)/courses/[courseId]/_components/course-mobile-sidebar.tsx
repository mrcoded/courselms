import { Menu } from "lucide-react";

import CourseSidebar from "./course-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { CourseMobileSidebarProps } from "@/types/course.types";

const CourseMobileSidebar = ({
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSidebar;
