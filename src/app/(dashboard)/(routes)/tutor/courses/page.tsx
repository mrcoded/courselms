import { redirect } from "next/navigation";

import { columns } from "./_components/columns";
import { TutorTable } from "./_components/tutor-table";

import { getServerSession } from "@/lib/get-server-session";
import { getCoursesForTutor } from "@/lib/actions/get-courses.actions";

const CoursesPage = async () => {
  const session = await getServerSession();

  const user = session?.user;
  const userId = user?.id;

  //If user is not found
  if (!userId) {
    return redirect("/");
  }

  //get courses
  const courses = await getCoursesForTutor(userId);

  return (
    <div className="p-6">
      <TutorTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
