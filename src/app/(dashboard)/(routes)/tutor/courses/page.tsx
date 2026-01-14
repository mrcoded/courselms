import { redirect } from "next/navigation";
import { db } from "@/config/db";

import { columns } from "./_components/columns";
import { TutorTable } from "./_components/tutor-table";

import { getServerSession } from "@/lib/get-server-session";

const CoursesPage = async () => {
  const session = await getServerSession();

  const user = session?.user;
  const userId = user?.id;

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <TutorTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
