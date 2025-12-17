"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import Sidebar from "./Sidebar";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
        >
          <Menu size={22} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="p-0 bg-black border-neutral-800 w-64"
      >
        <VisuallyHidden>
          <SheetTitle>Dashboard Navigation</SheetTitle>
        </VisuallyHidden>

        <Sidebar mobile />
      </SheetContent>
    </Sheet>
  );
}
