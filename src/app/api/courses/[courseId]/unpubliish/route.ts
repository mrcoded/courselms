import { NextResponse } from "next/server";

import { db } from "@/config/db";
import { getServerSession } from "@/lib/get-server-session";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    //get user
    const session = await getServerSession();
    const user = session?.user;
    const userId = user?.id;

    //if user is not logged in
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify course ownership
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    // If user is not the owner of the course
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify course existence
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    // If course not found
    if (!course) {
      return new NextResponse("Not found", { status: 401 });
    }

    // Unpublish the course
    const unPublishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unPublishedCourse);
  } catch (error) {
    console.log("[COURSEID_UNPUBLISH]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
