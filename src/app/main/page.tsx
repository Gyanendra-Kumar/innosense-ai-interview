import { redirect } from "next/navigation";
import { getUser } from "../../lib/getUser";

const MainPage = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main>
      <h1>User Name: {user?.name}</h1>
      <p>User Email:{user?.email}</p>
      <p>created At: {user?.createdAt.toString()}</p>
    </main>
  );
};

export default MainPage;
