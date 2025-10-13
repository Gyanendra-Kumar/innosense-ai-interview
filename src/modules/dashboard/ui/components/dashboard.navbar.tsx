"use client";

import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useSidebar } from "../../../../components/ui/sidebar";

const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();

  return (
    <div className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
      <Button
        className="size-9 cursor-pointer"
        variant="outline"
        onClick={toggleSidebar}
      >
        {state === "collapsed" || isMobile ? (
          <PanelLeftIcon size={4} />
        ) : (
          <PanelLeftCloseIcon size={4} />
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {}}
        className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
      >
        <SearchIcon />
        Search
        <kbd className="ml-auto pointer-events-none inline-flex h-5  select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ">
          <span className="text-sm">&#8984;</span>K
        </kbd>
      </Button>
    </div>
  );
};

export default DashboardNavbar;
