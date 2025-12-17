import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/app/models/User";

export async function GET() {
  await connectDB();

  const fifteenMinutesAgo = new Date(
    Date.now() - 15 * 60 * 1000
  );

  const count = await User.countDocuments({
    lastActive: { $gte: fifteenMinutesAgo },
  });

  return NextResponse.json({ count });
}
