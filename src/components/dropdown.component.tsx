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
  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger
        className={cn(
          "rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-slate-100 dark:bg-black/50 cursor-pointer",
          triggerClassName
        )}
        asChild
      >
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={alignOverlay}
        side={overflowSide}
        className="w-72"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
