"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import AuthCard from "@/components/auth/AuthCard";
import GoogleButton from "@/components/auth/GoogleButton";
import PasswordInput from "@/components/auth/PasswordInput";

export default function SignupPage() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (res.ok) {
      router.push("/login"); // ✅ redirect after signup
    } else {
      // optional: handle error
      console.error("Signup failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <AuthCard title="Create account" subtitle="Join us in seconds">
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              name="name"
              required
              className="bg-neutral-800 border-neutral-700 text-white"
            />
          </div>

          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              required
              className="bg-neutral-800 border-neutral-700 text-white"
            />
          </div>

          <div className="space-y-1">
            <Label>Password</Label>
            <PasswordInput name="password" />
          </div>

          <Button className="w-full bg-white text-black hover:bg-neutral-200">
            Create Account
          </Button>
        </form>

        <div className="my-6">
          <Separator className="bg-neutral-800" />
        </div>

        <GoogleButton />
      </AuthCard>
    </div>
  );
}
