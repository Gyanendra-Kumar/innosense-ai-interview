"use client"

import { UserDropdown } from "@/components/user-dropdown";
import { ThemeToggle } from "@/modules/theme/toggle-theme";
import Image from "next/image";
import Link from "next/link";
// import { UserType } from "../../../types";
import IaTooltip from "../../components/Tooltip";
import { useAppSelector } from "../../lib/store";

export  function Navbar() {
  const user = useAppSelector((state) => state.user.user);
  if (!user) return null;

  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href={user ? "/main" : "/"}
          className="flex items-center gap-2 font-semibold text-gradient"
        >
          {/* InnoSense AI */}
          <IaTooltip content="InnoSense AI Interview">
            <Image
              src="/loading.svg"
              alt="InnoSense AI Interview logo"
              width={40}
              height={40}
            />
          </IaTooltip>
        </Link>
        <div className="flex items-center gap-2" suppressHydrationWarning>
          <ThemeToggle />
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
