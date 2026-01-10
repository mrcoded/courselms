import { db } from "@/config/db";
import { getServerSession } from "@/lib/get-server-session";
import { NextResponse } from "next/server";

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
    const url = await req.json();

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

    // Create attachment
    const attachment = await db.attachment.create({
      data: {
        url: url.url,
        name: url.url.split("/").pop(),
        courseId: courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[COURSEID_ATTACHMENTS]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
