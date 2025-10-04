"use client";

import { LogOutIcon, ShieldIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { User } from "../lib/auth";
import { authClient } from "../lib/auth-client";

import { clearUser } from "../features/userSlice";
import { persistor, useAppDispatch } from "../lib/store";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type UserProps = Readonly<{ user: User }>;

export function UserDropdown({ user }: UserProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={16}
              height={16}
              className="rounded-full object-cover"
            />
          ) : (
            <UserIcon />
          )}
          <span className="max-w-[12rem] truncate">{user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserIcon className="size-4" /> <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        {/* {user.role === "admin" && <AdminItem />} */}
        <SignOutItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AdminItem() {
  return (
    <DropdownMenuItem asChild>
      <Link href="/admin">
        <ShieldIcon className="size-4" /> <span>Admin</span>
      </Link>
    </DropdownMenuItem>
  );
}

export function SignOutItem() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleSignOut() {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message ?? "Something went wrong");
      return;
    }

    // 1. Clear user state
    dispatch(clearUser());

    // 2. Clear persisted storage
    await persistor.purge();

    // 3. Navigate to sign-in
    toast.success("Signed out successfully.");
    router.push("/sign-in");
  }

  return (
    <Button onClick={handleSignOut}>
      <LogOutIcon className="size-4" /> <span>Sign out</span>
    </Button>
  );
}
