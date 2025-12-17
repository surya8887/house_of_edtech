import mongoose, { Schema, InferSchemaType } from "mongoose";

/**
 * ✅ Course status enum
 */
export const COURSE_STATUS = [
  "upcoming",
  "ongoing",
  "completed",
] as const;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: COURSE_STATUS,
      default: "upcoming",
      index: true,
    },

    instructorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export type Course = InferSchemaType<typeof courseSchema>;


const CourseModel =
  mongoose.models.Course ||
  mongoose.model("Course", courseSchema);

export default CourseModel;
