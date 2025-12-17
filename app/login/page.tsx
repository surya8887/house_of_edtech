"use client";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import AuthCard from "@/components/auth/AuthCard";
import GoogleButton from "@/components/auth/GoogleButton";
import PasswordInput from "@/components/auth/PasswordInput";

export default function LoginPage() {

  async function handleSubmit(formData: FormData) {
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, // ✅ IMPORTANT
    });

    if (res?.ok) {
      redirect("/dashboard");
    } else {
      console.error(res?.error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <AuthCard title="Welcome back" subtitle="Sign in to continue">
        <form action={handleSubmit} className="space-y-4">
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
            Sign In
          </Button>
        </form>

        <div className="my-6">
          <Separator className="bg-neutral-800" />
        </div>

        <GoogleButton />

        <p className="text-sm text-center mt-4 text-neutral-400">
          Don’t have an account?{" "}
          <a href="/signup" className="underline text-white">
            Sign up
          </a>
        </p>
      </AuthCard>
    </div>
  );
}
