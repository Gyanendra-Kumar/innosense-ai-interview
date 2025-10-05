// app/(protected)/ProtectedLayout.tsx
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getSession } from "../../../../lib/getSession";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const session = await getSession(); // replace with your auth check

  if (!session?.user) {
    // console.log("tried user forced entry");
    redirect("/sign-in"); // server-side redirect
  }

  return <>{children}</>;
}
