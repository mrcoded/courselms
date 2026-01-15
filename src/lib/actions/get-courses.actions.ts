import { db } from "@/config/db";
import { getProgressActions } from "./get-progress.actions";

import {
  CoursesWithProgressWithCategory,
  GetCourses,
} from "@/types/course.types";
import { Course } from "@prisma/client";

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CoursesWithProgressWithCategory[] | undefined> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const courseWithProgress: CoursesWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }

          const progressPercentage = await getProgressActions(
            userId,
            course.id
          );

          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return courseWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
  }
};

export const getCoursesForTutor = async (userId: string): Promise<Course[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return courses;
  } catch (error) {
    console.log("[GET_TUTOR_COURSES]", error);
    return [];
  }
};
