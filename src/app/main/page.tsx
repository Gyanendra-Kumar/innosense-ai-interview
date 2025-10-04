"use client";

import { redirect } from "next/navigation";
import { useAppSelector } from "../../lib/store";

const MainPage = () => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main>
      <h1>User Name: {user?.name}</h1>
      <p>User Email:{user?.email}</p>
      <p>created At: {user?.createdAt}</p>
    </main>
  );
};

export default MainPage;
