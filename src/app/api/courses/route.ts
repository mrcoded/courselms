import { db } from "@/config/db";
import { getServerSession } from "@/lib/get-server-session";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    const user = session?.user;
    const userId = user?.id;

    // Get request body
    const { title } = await req.json();

    //if user is not logged in
    if (!userId) {
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
