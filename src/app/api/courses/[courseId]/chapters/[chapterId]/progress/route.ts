import { NextResponse } from "next/server";

import { db } from "@/config/db";
import { getServerSession } from "@/lib/get-server-session";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const session = await getServerSession();
    const user = session?.user;
    const userId = user?.id;

    // Get request body
    const { isCompleted } = await req.json();

    //if no userId
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get chapterId from params
    const { chapterId } = await params;

    // Update progress
    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId,
        isCompleted,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[CHAPTERID_PROGRESS]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
