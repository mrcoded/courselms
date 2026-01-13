import React from "react";
import { Eye, LayoutDashboard, Video } from "lucide-react";

import type { Chapter } from "@prisma/client";

import { IconBadge } from "@/components/icon-badge";
import ChapterTitleForm from "./chapter-title-form";
import ChapterAccessForm from "./chapter-access-form";
import ChapterVideoForm from "./chapter-video-form";
import ChapterDescriptionForm from "./chapter-description-form";

const ChapterFormsList = ({
  chapter,
  courseId,
  chapterId,
}: {
  chapter: Chapter;
  courseId: string;
  chapterId: string;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your chapter</h2>
          </div>
          <ChapterTitleForm
            initialData={chapter}
            courseId={courseId}
            chapterId={chapterId}
          />
          <ChapterDescriptionForm
            initialData={chapter}
            courseId={courseId}
            chapterId={chapterId}
          />
        </div>
        <div className="flex itetms-center gap-x-2">
          <IconBadge icon={Eye} />
          <h2 className="text-xl">Access Settings</h2>
        </div>
        <ChapterAccessForm
          initialData={chapter}
          courseId={courseId}
          chapterId={chapterId}
        />
      </div>

      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={Video} />
          <h2 className="text-xl">Add a video</h2>
        </div>
        <ChapterVideoForm
          initialData={chapter}
          chapterId={chapterId}
          courseId={courseId}
        />
      </div>
    </div>
  );
};

export default ChapterFormsList;
