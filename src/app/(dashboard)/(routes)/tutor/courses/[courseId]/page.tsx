import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/get-server-session";
import { getOneCourse } from "@/lib/actions/get-one-course.actions";

import { getCompletionStats } from "@/utils/get-completion-stats";

import Banner from "@/components/banner";
import CourseActions from "./_components/course-actions";
import CourseFormsList from "./_components/course-forms-list";

const CourseIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const session = await getServerSession();
  const userId = session?.user?.id;

  // get courseid from params
  const { courseId } = await params;

  // Redirect if not logged in
  if (!userId) {
    return redirect("/auth/login");
  }

  // Get course
  const course = await getOneCourse({
    courseId,
    userId,
  });

  // Redirect if course is not found
  if (!course) redirect("/");

  // Get completion stats
  const { completionText, isCompleted } = getCompletionStats([
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ]);

  return (
    <>
      {!course.isPublished && (
        <Banner
          variant="warning"
          label="This course is unpublished. It will not be visible in the course."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="tex-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>

          <CourseActions
            disabled={!isCompleted}
            courseId={courseId}
            isPublished={course.isPublished}
          />
        </div>

        <CourseFormsList course={course} />
      </div>
    </>
  );
};

export default CourseIdPage;
