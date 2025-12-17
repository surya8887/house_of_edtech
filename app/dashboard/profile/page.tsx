"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";

interface User {
  name: string;
  email: string;
  role: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchProfile() {
    const res = await fetch("/api/profile");
    const data = await res.json();
    setUser(data);
    setName(data.name);
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  async function updateProfile() {
    setLoading(true);
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setLoading(false);
    fetchProfile();
  }

  async function deleteAccount() {
    if (!confirm("This will permanently delete your account. Continue?"))
      return;

    await fetch("/api/profile", { method: "DELETE" });
    signOut({ callbackUrl: "/login" });
  }

  if (!user) return <p className="text-neutral-400">Loading…</p>;

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>

      <div className="space-y-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-neutral-900 text-white border-neutral-800"
        />

        <Input
          value={user.email}
          disabled
          className="bg-neutral-900 text-neutral-400 border-neutral-800"
        />

        <Input
          value={user.role}
          disabled
          className="bg-neutral-900 text-neutral-400 border-neutral-800"
        />

        <Button onClick={updateProfile} disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </div>

      <hr className="border-neutral-800" />

      <Button variant="destructive" onClick={deleteAccount}>
        Delete Account
      </Button>
    </div>
  );
}
