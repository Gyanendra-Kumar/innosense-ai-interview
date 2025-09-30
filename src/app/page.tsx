"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "../lib/auth-client";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Redirect after render
  useEffect(() => {
    if (session) {
      router.push("/main");
    }
  }, [session, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
        <Link href="/sign-in">Sign In</Link>
        <Link href="/sign-up">Sign Up</Link>
      </div>
    );
  }

  // Optional: render nothing while redirecting
  return null;
}
