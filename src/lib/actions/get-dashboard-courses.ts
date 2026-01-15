import { db } from "@/config/db";

import { getProgressActions } from "@/lib/actions/get-progress.actions";
import {
  CourseWithProgressWithCategory,
  DashboardCourses,
} from "@/types/course.types";

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    //get purchased courses
    const courses = purchasedCourses.map(
      (purchase) => purchase.course
    ) as CourseWithProgressWithCategory[];

    //
    for (let course of courses) {
      const progress = await getProgressActions(userId, course.id);
      course["progress"] = progress;
    }

    // get completed courses
    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );

    // get courses in progress
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
