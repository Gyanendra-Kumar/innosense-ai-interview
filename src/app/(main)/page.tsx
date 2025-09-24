"use client";

import { Button } from "../../components/ui/button";
import { authClient } from "../../lib/auth-client";
import { ThemeToggle } from "../../modules/theme/toggle-theme";

interface MainPageProps {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
}
const MainPage = ({ user }: MainPageProps) => {
  return (
    <main>
      <ThemeToggle />
      <h1>User Name: {user.name}</h1>
      <p>User Email:{user.email}</p>
      <Button variant="outline" onClick={() => authClient.signOut()}>
        Logout
      </Button>
    </main>
  );
};

export default MainPage;
