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
    return <div>Loading...</div>;
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
      <MainPage />
    </div>
  );
}
