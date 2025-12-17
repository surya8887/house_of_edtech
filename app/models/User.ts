import mongoose, { Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "admin" | "instructor" | "student";
  provider: "credentials" | "google";
  notifications?: boolean;
  lastActive?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["admin", "instructor", "student"],
      default: "student",
    },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      required: true,
    },
    notifications: { type: Boolean, default: true },
    lastActive: Date,
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
