import React from "react";
import { Clock } from "lucide-react";
import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/get-server-session";
import { getDashboardCourses } from "@/lib/actions/get-dashboard-courses";

import CoursesList from "@/components/courses-list";
import InfoCard from "./_components/dashboard-info-card";

const Dashboard = async () => {
  const session = await getServerSession();
  const userId = session?.user?.id;

  // Redirect if not logged in
  if (!userId) return redirect("/");

  // Get dashboard datas
  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />

        <InfoCard
          icon={Clock}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>

      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
};

export default Dashboard;
