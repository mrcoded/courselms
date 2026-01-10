import { NextResponse } from "next/server";

import Mux from "@mux/mux-node";
import { db } from "@/config/db";

import { getServerSession } from "@/lib/get-server-session";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function PATCH(
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
    const values = await req.json();

    //if user is not logged in
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify course ownership
    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const session = await getServerSession();
    const user = session?.user;
    const userId = user?.id;

    // Get courseId from params
    const { courseId } = await params;

    //if user is not logged in
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify course ownership
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    // If user is not the owner of the course
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    // If course not found
    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Delete associated Mux assets
    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await mux.video.assets.delete(chapter.muxData.assetId);
      }
    }

    // Delete the course
    const deletedCourse = await db.course.delete({
      where: {
        id: courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSERID_DELETE]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
