import { NextResponse } from "next/server";

import { db } from "@/config/db";
import { getServerSession } from "@/lib/get-server-session";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ courseId: string; attachmentId: string }> }
) {
  try {
    const session = await getServerSession();
    const user = session?.user;
    const userId = user?.id;

    //if user is not logged in
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get courseId and attachmentId from params
    const { courseId, attachmentId } = await params;

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

    // Delete attachment
    const attachment = await db.attachment.delete({
      where: {
        courseId: courseId,
        id: attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[ATTACHMENT_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
