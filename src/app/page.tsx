"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setUser } from "../features/userSlice";
import { getUser } from "../lib/getUser";
import { useAppDispatch, useAppSelector } from "../lib/store";
import Loader from "../modules/Loader";
import { UserType } from "../types";

export default function Home() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  // console.log("🚀 ~ page.tsx:19 ~ Home ~ user:", user);

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const u = await getUser();
        if (u) {
          dispatch(
            setUser({
              ...u,
              createdAt: u?.createdAt.toString(),
              updatedAt: u?.updatedAt.toString(),
            } as UserType)
          );
          setLoading(false);
        } else {
          dispatch(setUser(null));
        }
      } catch {
        dispatch(setUser(null)); // or dispatch(clearUser())
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);
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
