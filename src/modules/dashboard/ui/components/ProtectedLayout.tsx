// app/(protected)/ProtectedLayout.tsx
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getUser } from "../../../../lib/getUser";

interface ProtectedLayoutProps {
  children: ReactNode;
  params?: {
    slug: string;
  };
}

export default async function ProtectedLayout({
  children,
  params,
}: ProtectedLayoutProps) {
  const slug = await params;
  const user = await getUser(); // get logged-in user

  // Not logged in → redirect
  if (!user) {
    redirect("/sign-in");
  }

  // Logged in but trying to access another user's dashboard → redirect
  if (user?.slug !== slug?.slug) {
    redirect("/sign-in");
  }

  // Authorized → render children
  return <>{children}</>;
}
