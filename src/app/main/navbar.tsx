import { UserDropdown } from "@/components/user-dropdown";
import Link from "next/link";
import { getSession } from "../../lib/getSession";
import { ThemeToggle } from "../../modules/theme/toggle-theme";

export async function Navbar() {
  const session = await getSession();
  const user = session?.user;

  if (!user) return null;

  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href={user ? "/main" : "/"}
          className="flex items-center gap-2 font-semibold text-gradient"
        >
          InnoSense AI
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
