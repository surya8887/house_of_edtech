"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface CourseFormProps {
  onSuccess?: () => void;
  initialData?: {
    title: string;
    description?: string;
  };
}

export default function CourseForm({
  onSuccess,
  initialData,
}: CourseFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        let message = "Failed to save course";
        const text = await res.text();
        if (text) {
          try {
            const data = JSON.parse(text);
            message = data.message || message;
          } catch {}
        }
        throw new Error(message);
      }

      setTitle("");
      setDescription("");
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardContent className="p-6 space-y-5">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-white">
            {initialData ? "Update Course" : "Create New Course"}
          </h2>
          <p className="text-sm text-neutral-400">
            Fill in the course details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-300">
              Course Title
            </label>
            <Input
              placeholder="e.g. Advanced React"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
              className="
                bg-neutral-950
                text-white
                placeholder:text-neutral-500
                border-neutral-800
                focus-visible:ring-2
                focus-visible:ring-neutral-700
                disabled:opacity-60
              "
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-300">
              Description
            </label>
            <Input
              placeholder="Short course description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              className="
                bg-neutral-950
                text-white
                placeholder:text-neutral-500
                border-neutral-800
                focus-visible:ring-2
                focus-visible:ring-neutral-700
                disabled:opacity-60
              "
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-md">
              {error}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-white text-black
              hover:bg-neutral-200
              font-medium
              transition
            "
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </span>
            ) : initialData ? (
              "Update Course"
            ) : (
              "Create Course"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
