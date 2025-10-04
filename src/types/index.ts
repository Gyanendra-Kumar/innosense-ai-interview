import { LucideIcon } from "lucide-react";

export interface UserType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
}

export interface TooltipType {
  children: React.ReactNode;
  content: string;
}

export interface SearchParamsType {
  searchParams: Promise<{ token: string }>;
}
export interface ResetPasswordUIProps {
  token: string;
}

export interface SidebarItem {
  icon: LucideIcon; // any icon from lucide-react
  label: string;
  href: string;
}
