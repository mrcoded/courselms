import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getServerSession } from "@/lib/get-server-session";
import { getCompletionStats } from "@/utils/get-completion-stats";
import { getOneChapter } from "@/services/get-one-chapter.service";

import Banner from "@/components/banner";
import ChapterFormsList from "./_components/chapter-forms-list";
import ChapterActions from "./_components/chapter-actions";

const ChapterIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>;
}) => {
  const session = await getServerSession();
  if (!session?.user?.id) return redirect("/");

  //get chapterId and courseId from params
  const { chapterId, courseId } = await params;

  // Get chapter
  const chapter = await getOneChapter({
    chapterId,
    courseId,
  });

  //if chapter is not found
  if (!chapter) redirect("/");

  // Get completion stats
  const { completionText, isCompleted } = getCompletionStats([
    chapter.title,
    chapter.description,
    chapter.videoUrl,
  ]);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/tutor/courses/${courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course section
            </Link>

            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>

              <ChapterActions
                disabled={!isCompleted}
                courseId={courseId}
                chapterId={chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>

        <ChapterFormsList
          chapter={chapter}
          courseId={courseId}
          chapterId={chapterId}
        />
      </div>
    </>
  );
};

export default ChapterIdPage;
