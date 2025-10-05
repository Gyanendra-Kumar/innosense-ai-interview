"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "../lib/getUser";
import Loader from "../modules/Loader";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userSlug, setUserSlug] = useState<string | null>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();

        if (!user) {
          setLoading(false); // Not logged in → show landing page
          return;
        }

        setUserSlug(user?.slug);
        // router.push(`/${user.slug}`);
      } catch (err) {
        console.error("🚀 fetchUser error:", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  useEffect(() => {
    if (userSlug) {
      router.push(`${userSlug}`);
    }
  }, [userSlug]);

  if (loading) return <Loader />;

  // Landing page for guests
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Welcome to InnoSense AI Interview</h1>
      <p className="text-center max-w-md">
        Schedule AI-powered mock interviews, get real-time feedback, and prepare
        with confidence.
      </p>
      <div className="flex gap-4 mt-6">
        <Link
          href="/sign-in"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
