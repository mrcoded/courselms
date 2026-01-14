import { NextResponse } from "next/server";

import { db } from "@/config/db";

import { isTutor } from "@/lib/get-tutor";
import { getServerSession } from "@/lib/get-server-session";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    const user = session?.user;
    const userId = user?.id;

    // Get request body
    const { title } = await req.json();

    //if user is not logged in or is tutor
    if (!userId || isTutor(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Create new course
    const course = await db.course.create({
      data: {
        userId,
        title,
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
