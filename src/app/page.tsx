"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "../lib/getUser";
import Loader from "../modules/Loader";
import { UserType } from "../types";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const u = await getUser();
        if (u) {
          setUser(u);
          setLoading(false);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
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
