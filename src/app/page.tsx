"use client";

import Link from "next/link";
import { authClient } from "../lib/auth-client";
import MainPage from "./(main)/page";

export default function Home() {
  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-13 h-13 border-7 border-b-amber-600 border-t-blue-600 border-r-cyan-600 border-l-emerald-600 border-dashed animate-spin rounded-full" />
      </div>
    );
  }

  if (!session) {
    return (
      <div>
        <Link href="/sign-in">Sign In</Link>
        <Link href="/sign-up">Sign Up</Link>
      </div>
    );
  }

  console.log("session: ", session);
  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-5">
      <MainPage user={session.user}/>
    </div>
  );
}
