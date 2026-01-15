import { db } from "@/config/db";
import { Chapter, Course, UserProgress } from "@prisma/client";

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
    console.log("[GET_ONE_COURSE]", error);
    return null;
  }
};

export const getOneCourseWithProgress = async ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}): Promise<
  | (Course & {
      chapters: (Chapter & {
        userProgress: UserProgress[];
      })[];
    })
  | null
> => {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          include: {
            userProgress: {
              where: {
                userId,
              },
            },
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    return course;
  } catch (error) {
    console.log("[GET_ONE COURSE_WITH_PROGRESS]", error);

    return null;
  }
};

export const getOnePublishedCourse = async ({
  courseId,
}: {
  courseId: string;
}): Promise<
  | (Course & {
      chapters: Chapter[];
    })
  | null
> => {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    return course;
  } catch (error) {
    console.log("[GET_ONE COURSE_WITH_PROGRESS]", error);

    return null;
  }
};
