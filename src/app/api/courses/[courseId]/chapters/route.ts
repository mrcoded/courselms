import { db } from "@/config/db";
import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/get-server-session";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const session = await getServerSession();
    const user = session?.user;
    const userId = user?.id;

    // Get courseId from params
    const { courseId } = await params;

    // Get request body
    const { title } = await req.json();

    //if user is not logged in
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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

    // Get the last chapter to determine the new position
    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    // Calculate the new position
    const newPostition = lastChapter ? lastChapter.position + 1 : 1;
    // Create the new chapter
    const chapter = await db.chapter.create({
      data: {
        title,
        courseId: courseId,
        position: newPostition,
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
