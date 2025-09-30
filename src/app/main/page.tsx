"use client";

import { useEffect, useState } from "react";
import { UserType } from "../../../types.ts";
import { getUser } from "../../lib/getUser";

const MainPage = () => {
  const [user, setUser] = useState<UserType | null>();

  useEffect(() => {
    (async () => {
      const data = await getUser();
      setUser(data ?? null);
    })();
  }, []);

  return (
    <main>
      <h1>User Name: {user?.name}</h1>
      <p>User Email:{user?.email}</p>
    </main>
  );
};

export default MainPage;
