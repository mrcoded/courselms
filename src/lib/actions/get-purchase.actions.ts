import { db } from "@/config/db";
import { Course } from "@prisma/client";

export const getPurchase = async ({
  userId,
  course,
}: {
  userId: string;
  course: Course;
}) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    });

    return purchase;
  } catch (error) {
    console.log("GET_PURCHASE", error);
    return null;
  }
};
