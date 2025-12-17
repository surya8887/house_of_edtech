"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";

interface User {
  name: string;
  email: string;
  role: string;
}

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then(setUser);
  }, []);

  async function savePreferences() {
    setLoading(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notifications }),
    });
    setLoading(false);
  }

  async function deleteAccount() {
    if (!confirm("This action is irreversible. Delete your account?")) return;
    await fetch("/api/profile", { method: "DELETE" });
    signOut({ callbackUrl: "/login" });
  }

  if (!user) {
    return (
      <p className="text-lg text-neutral-400">
        Loading settings…
      </p>
    );
  }

  return (
    <div className="max-w-4xl space-y-10">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Settings
        </h1>
        <p className="text-lg text-neutral-400 mt-2">
          Manage your account, preferences, and security
        </p>
      </div>

      {/* ACCOUNT */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 text-base">
          <div className="flex justify-between">
            <span className="text-neutral-400">Name</span>
            <span className="font-medium text-white">
              {user.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-400">Email</span>
            <span className="font-medium text-white">
              {user.email}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-400">Role</span>
            <span className="font-semibold text-indigo-400 capitalize">
              {user.role}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* PREFERENCES */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-white">
                Email Notifications
              </p>
              <p className="text-base text-neutral-400">
                Receive updates, reminders, and alerts
              </p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          <Separator className="bg-neutral-800" />

          <Button
            onClick={savePreferences}
            disabled={loading}
            className="text-base"
          >
            {loading ? "Saving..." : "Save Preferences"}
          </Button>
        </CardContent>
      </Card>

      {/* SECURITY */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="secondary"
            className="text-base"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Log out
          </Button>
        </CardContent>
      </Card>

      {/* DANGER ZONE */}
      <Card className="border border-red-900 bg-red-950/40">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-red-500">
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base text-red-400">
            Deleting your account is permanent and cannot be undone.
          </p>
          <Button
            variant="destructive"
            className="text-base"
            onClick={deleteAccount}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
