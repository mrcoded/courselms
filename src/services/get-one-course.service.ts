import { db } from "@/config/db";
import { Chapter, Course } from "@prisma/client";

export const getOneCourse = async ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}): Promise<(Course & { chapters: Chapter[] }) | null> => {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          orderBy: {
            position: "asc",
          },
        },
        attachments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return course;
  } catch (error) {
    console.log(error);
    return null;
  }
};
