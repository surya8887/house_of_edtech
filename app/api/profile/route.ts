import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import connectDB from "@/lib/db";
import User from "@/app/models/User";

/* ===================== GET PROFILE ===================== */
export async function GET() {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findById(session.user.id).select("-password");

  return NextResponse.json(user);
}

/* ===================== UPDATE PROFILE ===================== */
export async function PUT(req: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json();

  const updatedUser = await User.findByIdAndUpdate(
    session.user.id,
    { name },
    { new: true }
  ).select("-password");

  return NextResponse.json(updatedUser);
}

/* ===================== DELETE PROFILE ===================== */
export async function DELETE() {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await User.findByIdAndDelete(session.user.id);

  return NextResponse.json({ success: true });
}
