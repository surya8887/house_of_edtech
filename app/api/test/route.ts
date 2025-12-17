import connectDB from "@/lib/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    const isConnected = mongoose.connection.readyState === 1;

    return Response.json({
      success: true,
      message: isConnected ? "Database connected" : "Database not connected",
      readyState: mongoose.connection.readyState,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 }
    );
  }
}
