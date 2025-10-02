"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserType } from "../../types.ts";
import { getUser } from "../lib/getUser";
import Loader from "../modules/Loader";

export default function Home() {
  const router = useRouter();
  // const { data: session, isPending } = authClient.useSession();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const u = await getUser();
        if (mounted) setUser(u ?? null);
      } catch (e) {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Redirect after render
  useEffect(() => {
    if (!loading && user) {
      router.push("/main");
    }
  }, [loading, user, router]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
        <Link href="/sign-in">Sign In</Link>
        <Link href="/sign-up">Sign Up</Link>
      </div>
    );
  }

  // Optional: render nothing while redirecting
  return <Loader />;
}
