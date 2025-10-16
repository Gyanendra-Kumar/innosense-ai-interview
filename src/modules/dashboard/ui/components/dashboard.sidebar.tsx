"use client";

import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "../../../../components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../../components/ui/sidebar";
import { SidebarItem } from "../../../../types";
import DashboardUserButton from "./dashboard.user.button";

const firstSection: SidebarItem[] = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];
const secondSection: SidebarItem[] = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  const slug = pathname.split("/")[1];

  const renderSidebarGroup = (sidebarItem: SidebarItem[]) => {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {sidebarItem.map((item) => {
              const active = pathname === item.href;
              const fullHref = `/${slug}${item.href}`;

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center gap-2 px-3 pt-2 rounded-md transition-colors ${active ? "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 hover:dark:bg-slate-500"}`}
                    // border-[#5D6B68]/10
                    isActive={pathname === fullHref}
                  >
                    <Link href={fullHref}>
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };

  return (
    <Sidebar className="shadow-xl">
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href={`/${slug}`} className="flex gap-2 items-center px-2 pt-2">
          <Image
            src="/loading.svg"
            alt="InnoSense AI Interview logo"
            width={36}
            height={36}
          />
          <p className="text-2xl font-semibold text-slate-700 dark:text-slate-200">
            InnoSense AI
          </p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-50 text-[#5D6B68]" />
      </div>
      <SidebarContent>
        {renderSidebarGroup(firstSection)}

        <div className="px-4 py-2">
          <Separator className="opacity-50 text-[#5D6B68]" />
        </div>

        {renderSidebarGroup(secondSection)}
      </SidebarContent>
      <SidebarFooter>
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
