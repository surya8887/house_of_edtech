"use client";

import { Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MobileSidebar from "./MobileSidebar";

interface Props {
  user: {
    name?: string | null;
    email?: string | null;
  };
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

export default function DashboardNavbar({
  user,
  sidebarOpen,
  setSidebarOpen,
}: Props) {
  return (
    <header className="h-16 border-b border-neutral-800 flex items-center justify-between px-4 md:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <MobileSidebar />

        {/* Desktop toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={22} />
        </Button>

        <span className="font-semibold text-lg">EduPulse</span>
      </div>

      {/* Right */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-neutral-700">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="bg-neutral-900 border-neutral-800 text-white"
        >
          <div className="px-3 py-2 text-sm">
            <p className="font-medium">{user?.name}</p>
            <p className="text-neutral-400 text-xs">{user?.email}</p>
          </div>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
