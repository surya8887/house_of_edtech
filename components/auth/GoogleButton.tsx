"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function GoogleButton() {
  return (
    <Button
      variant="outline"
      className="w-full flex items-center gap-2"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    >
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.66 1.22 9.14 3.6l6.84-6.84C35.82 2.48 30.36 0 24 0 14.72 0 6.8 5.38 2.92 13.22l7.98 6.2C12.86 13.1 17.98 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.1 24.55c0-1.64-.15-3.22-.43-4.75H24v9h12.5c-.54 2.9-2.18 5.36-4.64 7.04l7.2 5.6C43.98 37.36 46.1 31.46 46.1 24.55z"
        />
        <path
          fill="#FBBC05"
          d="M10.9 28.6c-.54-1.6-.86-3.3-.86-5.1s.32-3.5.86-5.1l-7.98-6.2C1.04 15.14 0 19.42 0 24s1.04 8.86 2.92 12.8l7.98-6.2z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.36 0 11.82-2.1 15.76-5.7l-7.2-5.6c-2 1.34-4.56 2.1-8.56 2.1-6.02 0-11.14-3.6-13.1-8.62l-7.98 6.2C6.8 42.62 14.72 48 24 48z"
        />
      </svg>
      Continue with Google
    </Button>
  );
}
