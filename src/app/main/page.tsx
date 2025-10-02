import { getUser } from "@/lib/getUser";
import { redirect } from "next/navigation";

const MainPage = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main>
      <h1>User Name: {user?.name}</h1>
      <p>User Email:{user?.email}</p>
    </main>
  );
};

export default MainPage;
