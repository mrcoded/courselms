import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const CoursesPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
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
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
