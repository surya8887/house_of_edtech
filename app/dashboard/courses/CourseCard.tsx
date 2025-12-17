"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Loader2 } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  description?: string;
}

export default function CourseCard({
  course,
  onDelete,
  onUpdate,
}: {
  course: Course;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: { title: string; description?: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description ?? "");
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    setLoading(true);
    await onUpdate(course._id, { title, description });
    setLoading(false);
    setOpen(false);
  }

  return (
    <div
      className="
        group
        relative
        rounded-xl
        border border-neutral-800
        bg-neutral-900
        p-5
        space-y-4
        transition
        hover:border-neutral-700
        hover:bg-neutral-900/80
      "
    >
      {/* Content */}
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-white line-clamp-1">
          {course.title}
        </h3>
        <p className="text-sm text-neutral-400 line-clamp-2">
          {course.description || "No description provided"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* EDIT */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="gap-1"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-neutral-900 border-neutral-800">
            <DialogHeader>
              <DialogTitle className="text-white">
                Edit Course
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-sm text-neutral-400">
                  Course title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="
                    bg-neutral-950
                    text-white
                    placeholder:text-neutral-500
                    border-neutral-800
                    focus-visible:ring-neutral-700
                  "
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-sm text-neutral-400">
                  Description
                </label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description"
                  className="
                    bg-neutral-950
                    text-white
                    placeholder:text-neutral-500
                    border-neutral-800
                    focus-visible:ring-neutral-700
                  "
                />
              </div>

              {/* Update */}
              <Button
                className="w-full"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </span>
                ) : (
                  "Update Course"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* DELETE */}
        <Button
          variant="destructive"
          size="sm"
          className="gap-1"
          onClick={() => onDelete(course._id)}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>
    </div>
  );
}
