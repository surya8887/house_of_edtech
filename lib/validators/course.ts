import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  description: z.string().optional(),
});

export type CourseInput = z.infer<typeof courseSchema>;
