"use client";

import { ThemeToggle } from "../../components/toggle-theme";
import { Button } from "../../components/ui/button";
import { authClient } from "../../lib/auth-client";

const MainPage = () => {
  return (
    <main>
      <ThemeToggle />
      <h1>Main Page</h1>
      <Button variant="outline" onClick={() => authClient.signOut()}>
        Logout
      </Button>
    </main>
  );
};

export default MainPage;
