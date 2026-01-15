import { redirect } from "next/navigation";
import { getOnePublishedCourse } from "@/lib/actions/get-one-course.actions";

const CourseIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  //get course id from params
  const { courseId } = await params;

  //get course
  const course = await getOnePublishedCourse({ courseId });

  // Redirect if course not found
  if (!course) redirect("/");

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
};

export default CourseIdPage;
