import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center px-4">
      
      {/* 🔮 Background Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
      </div>

      {/* 🌟 Content */}
      <div className="relative z-10 max-w-2xl text-center space-y-8">
        
        <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm text-neutral-300 backdrop-blur">
          🚀 Learning Redefined
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            House of EdTech
          </span>
        </h1>

        <p className="text-lg md:text-xl text-neutral-400">
          Learn. Build. Grow.  
          <br />
          A next-gen platform for students & instructors.
        </p>

        {/* 🔘 CTA Buttons */}
        <div className="flex justify-center gap-5 pt-4">
          <Link href="/login">
            <Button className="px-8 py-6 text-base font-semibold bg-white text-black hover:bg-neutral-200 transition-all hover:scale-105 shadow-lg">
              Login
            </Button>
          </Link>

          <Link href="/signup">
            <Button
              variant="outline"
              className="px-8 py-6 text-base font-semibold border-white/20 text-black hover:bg-white/10 transition-all hover:scale-105 backdrop-blur"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* 🔽 Subtle hint */}
        <p className="text-sm text-neutral-500 pt-6">
          Trusted by learners. Built for the future.
        </p>
      </div>
    </main>
  );
}
