import { db } from "@/config/db";
import { Chapter } from "@prisma/client";

export const getOneChapter = async ({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}): Promise<Chapter | null> => {
  try {
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      include: {
        muxData: true,
      },
    });

    return chapter;
  } catch (error) {
    console.log(error);
    return null;
  }
};
