"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserType } from "../../types";
import { decrement, increment } from "../features/counterSlice";
import { setUser } from "../features/userSlice";
import { getUser } from "../lib/getUser";
import { useAppDispatch, useAppSelector } from "../lib/store";
import Loader from "../modules/Loader";

export default function Home() {
  const router = useRouter();
  const { count, user } = useAppSelector((state) => ({
    count: state.counter.value,
    user: state.user.user,
  }));
  console.log("🚀 ~ page.tsx:19 ~ Home ~ user:", user);

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const u = await getUser();
        dispatch(
          setUser({
            ...u,
            createdAt: u?.createdAt.toString(),
            updatedAt: u?.updatedAt.toString(),
          } as UserType)
        );
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
        <div className="flex flex-col items-center gap-3 mt-10">
          <h1 className="text-2xl font-bold">Counter: {count}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(decrement())}
              className="px-3 py-1 border rounded"
            >
              -
            </button>
            <button
              onClick={() => dispatch(increment())}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Optional: render nothing while redirecting
  return <Loader />;
}
