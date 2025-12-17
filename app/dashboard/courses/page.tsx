"use client";

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import CourseForm from "./CourseForm";
import { Card, CardContent } from "@/components/ui/card";

interface Course {
  _id: string;
  title: string;
  description?: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    
  async function fetchCourses() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/courses");
      if (!res.ok) throw new Error("Failed to load courses");

      const data: Course[] = await res.json();
      setCourses(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  async function deleteCourse(id: string) {
    await fetch(`/api/courses/${id}`, { method: "DELETE" });
    fetchCourses();
  }

  async function updateCourse(
    id: string,
    data: { title: string; description?: string }
  ) {
    await fetch(`/api/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchCourses();
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Courses</h1>
        <p className="text-sm text-neutral-400">
          Create, update, and manage your courses
        </p>
      </div>

      {/* Create Course */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium mb-4">
            Create New Course
          </h2>
          <CourseForm onSuccess={fetchCourses} />
        </CardContent>
      </Card>

      {/* States */}
      {loading && (
        <p className="text-neutral-400">Loading courses…</p>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {!loading && courses.length === 0 && (
        <div className="text-center text-neutral-400 py-10 border border-dashed border-neutral-800 rounded-md">
          No courses yet. Create your first course 🚀
        </div>
      )}

      {/* Course List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            onDelete={deleteCourse}
            onUpdate={updateCourse}
          />
        ))}
      </div>
    </div>
  );
}
