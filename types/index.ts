export interface UserType {
  id: string;
  createdAt: string;
  updatedAt: string;
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
