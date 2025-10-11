"use client";

import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Dropdown = ({
  children,
  trigger,
  triggerClassName,
  alignOverlay = "end",
  overflowSide = "right",
  onOpenChange,
}: {
  children: React.ReactNode;
  trigger: React.ReactElement | null;
  triggerClassName?: string;
  alignOverlay?: "end" | "center" | "start";
  overflowSide?: "right" | "left" | "top" | "bottom";
  onOpenChange?: (open: boolean) => void;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger
        className={cn(
          "rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-slate-200 dark:bg-black/50 cursor-pointer",
          triggerClassName
        )}
        asChild
      >
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={alignOverlay}
        side={isMobile ? "top" : overflowSide}
        className="w-72"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
