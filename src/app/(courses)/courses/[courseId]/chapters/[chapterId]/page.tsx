import React from "react";
import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/get-server-session";
import { getChapter } from "@/lib/actions/get-chapter.actions";

import Banner from "@/components/banner";
import { Preview } from "@/components/preview";
import VideoPlayer from "./_components/video-player";
import { Separator } from "@/components/ui/separator";
import AttachmentLink from "./_components/attachment-link";
import CourseEnrollButton from "./_components/course-enroll-button";
import CourseProgressButton from "./_components/course-progress-button";

const ChapterIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>;
}) => {
  const session = await getServerSession();
  const user = session?.user;
  const userId = user?.id;

  //redirect if not logged in
  if (!userId) redirect("/");

  //get course id and chapter id from params
  const { courseId, chapterId } = await params;

  //get chapter datas
  const data = await getChapter({
    userId,
    chapterId: chapterId,
    courseId: courseId,
  });

  //if chapter or course not found
  if (!data.chapter || !data.course) {
    return redirect("/");
  }

  //
  const isLocked = !data.chapter.isFree && !data.purchase;
  const completeOnEnd = !!data.purchase && !data.userProgress?.isCompleted;

  return (
    <div>
      {data.userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purhase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapterId}
            title={data.chapter.title}
            courseId={courseId}
            nextChapterId={data.nextChapter?.id}
            playbackId={data.muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>

        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-lg sm:text-2xl font-semibold mb-2 capitalize">
              {data.chapter.title}
            </h2>
            {data.purchase ? (
              <CourseProgressButton
                chapterId={chapterId}
                courseId={courseId}
                nextChapterId={data.nextChapter?.id}
                isCompleted={!!data.userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={courseId}
                price={data.course.price!}
              />
            )}
          </div>

          <Separator />
          <div>
            <Preview value={data.chapter.description!} />
          </div>
          {!!data.attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {data.attachments.map((attachment) => (
                  <AttachmentLink attachment={attachment} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
