import { getUser } from "@/lib/getUser";

const MainPage = async () => {
  const user = await getUser();

  return (
    <main>
      <h1>User Name: {user?.name}</h1>
      <p>User Email:{user?.email}</p>
    </main>
  );
};

export default MainPage;
