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
