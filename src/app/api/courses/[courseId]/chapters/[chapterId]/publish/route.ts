import { NextResponse } from "next/server";

import { db } from "@/config/db";
import { getServerSession } from "@/lib/get-server-session";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const session = await getServerSession();
    const user = session?.user;
    const userId = user?.id;

    //if no userId
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get courseId and chapterId from params
    const { courseId, chapterId } = await params;

    // Verify course ownership
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    // If user is not the owner of the course
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find chapter and its mux data
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
    });

    // Find mux data
    const muxData = await db.muxData.findFirst({
      where: {
        chapterId: chapterId,
      },
    });

    // If chapter or mux data is not found
    if (
      !chapter ||
      !muxData ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    ) {
      return new NextResponse("Missing required fields", {
        status: 400,
      });
    }

    // Update chapter
    const publishedChapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("[CHAPTERID_PUBLISH]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
