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
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const session = await getServerSession();
    const user = session?.user;
    const userId = user?.id;

    // Get request body
    const { isPublished, ...values } = await req.json();

    //if user is not logged in
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get courseId from params
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

    // Verify course existence
    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        ...values,
      },
    });

    //if video exists
    if (values.videoUrl) {
      const exisitingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: chapterId,
        },
      });

      //if video exists
      // if (exisitingMuxData) {
      //   await mux.video.assets.delete(exisitingMuxData.assetId);
      //   await db.muxData.delete({
      //     where: {
      //       id: exisitingMuxData.id,
      //     },
      //   });
      // }

      //if video does not exists from user
      const asset = await mux.video.assets.create({
        inputs: [{ type: "video", url: values.videoUrl }],
        playback_policies: ["public"],
        test: false,
      });

      console.log(asset);
      //create mux data
      await db.muxData.create({
        data: {
          chapterId: chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[COURSES_CHAPTERID]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const session = await getServerSession();
    const user = session?.user;
    const userId = user?.id;

    //if user is not logged in
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get courseId from params
    const { courseId, chapterId } = await params;

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

    // Verify course existence
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
    });

    //if chapter does not exist
    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    //if video exists
    if (chapter.videoUrl) {
      const exisitingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: chapterId,
        },
      });

      //if video exists
      if (exisitingMuxData) {
        await mux.video.assets.delete(exisitingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: exisitingMuxData.id,
          },
        });
      }
    }

    //delete chapter
    const deletedChapter = await db.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    //if course has no published chapters
    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
    });

    //if course has no published chapters
    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTERID_DELETE]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
