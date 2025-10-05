import { LucideIcon } from "lucide-react";

export interface UserType {
  name: string;
  id: string;
  email: string;
  emailVerified: boolean;
  role: string | null;
  slug: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
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
