import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import connectDB from "@/lib/db";
import Course from "@/app/models/Course";
import { courseSchema } from "@/lib/validators/course";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    // 🔥 HARD CHECK (IMPORTANT)
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized - no user id" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = courseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: parsed.error },
        { status: 400 }
      );
    }

    // 🔥 THIS IS THE KEY LINE
    const course = await Course.create({
      title: parsed.data.title,
      description: parsed.data.description,
      instructorId: session.user.id,
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error);

    return NextResponse.json(
      { message: "Course validation failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json([]);

  const courses = await Course.find({
    instructorId: session.user.id,
  }).sort({ createdAt: -1 });

  return NextResponse.json(courses);
}
