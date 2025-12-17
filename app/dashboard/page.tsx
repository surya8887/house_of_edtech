import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBaseUrl } from "@/lib/getBaseUrl";

/* ================= FETCH FUNCTIONS ================= */

async function getCoursesCount() {
  const res = await fetch(
    `${getBaseUrl()}/api/courses`,
    { cache: "no-store" }
  );
  if (!res.ok) return 0;
  const data = await res.json();
  return data.length as number;
}

async function getActiveUsersCount() {
  const res = await fetch(
    `${getBaseUrl()}/api/stats/active-users`,
    { cache: "no-store" }
  );
  if (!res.ok) return 0;
  const data = await res.json();
  return data.count as number;
}

/* ================= DASHBOARD PAGE ================= */

export default async function DashboardPage() {
  const [totalCourses, activeUsers] = await Promise.all([
    getCoursesCount(),
    getActiveUsersCount(),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-neutral-400">
          Welcome back 👋 Here’s what’s happening.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Courses" value={totalCourses} />
        <StatCard title="Active Users" value={activeUsers} />
        <StatCard title="Completed Courses" value="—" />
        <StatCard title="Pending Tasks" value="—" />
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QuickLink href="/dashboard/courses" label="📚 Manage Courses" />
            <QuickLink href="/dashboard/profile" label="👤 Edit Profile" />
            <QuickLink href="/dashboard/settings" label="⚙️ Settings" />
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-neutral-400 space-y-2">
            <p>✅ Logged in successfully</p>
            <p>📚 Viewed courses</p>
            <p>⚙️ Dashboard loaded</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ================= REUSABLE ================= */

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardHeader className="pb-2">
        <p className="text-sm text-neutral-400">{title}</p>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}

function QuickLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="block w-full rounded-md bg-neutral-800 px-4 py-2 text-sm hover:bg-neutral-700 transition"
    >
      {label}
    </Link>
  );
}
