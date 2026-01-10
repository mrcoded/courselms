import { db } from "@/config/db";
import { getServerSession } from "@/lib/get-server-session";
import { NextResponse } from "next/server";

export async function PUT(
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
    const { list } = await req.json();
    console.log(list);

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

    // Update chapters positions
    for (let item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
