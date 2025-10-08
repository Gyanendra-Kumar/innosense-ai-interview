"use client";

import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import {
  ChevronRight,
  CreditCardIcon,
  LogOutIcon,
  Mail,
  UserCircle2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Dropdown from "../../../../components/dropdown.component";
import GenerateAvatar from "../../../../components/generate-avatar";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../../../../components/ui/dropdown-menu";
import { authClient } from "../../../../lib/auth-client";
import { ThemeToggle } from "../../../theme/toggle-theme";

const dropdownItems: { label: String; icon: React.ElementType }[] = [
  {
    label: "Billing",
    icon: CreditCardIcon,
  },
  {
    label: "Logout",
    icon: LogOutIcon,
  },
];

const DashboardUserButton = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const [open, setOpen] = useState<boolean>(false);

  if (isPending || !data?.user) {
    return null;
  }

  const { name, image, email } = data.user;

  const dropdownTrigger = () => (
    <button
      className="flex items-center justify-between w-full cursor-pointer"
      onClick={() => setOpen((prev) => !prev)}
    >
      {image ? (
        <Avatar>
          <AvatarImage src={image} />
        </Avatar>
      ) : (
        <GenerateAvatar
          seed={image ?? name}
          variant="initials"
          className="size-7 mr-3"
        />
      )}

      <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
        <p className="text-sm truncate w-full">{name}</p>
        <p className="text-xs truncate w-full">{email}</p>
      </div>

      {/* Single Chevron icon with rotation animation */}
      <ChevronRight
        className={`transition-transform duration-300 origin-center ${
          !open ? "rotate-90" : "rotate-0"
        }`}
      />
    </button>
  );

  function handleSignOut() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully.");
          router.push("/sign-in");
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      },
    });
  }

  return (
    <div>
      <Dropdown trigger={dropdownTrigger()} onOpenChange={setOpen}>
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1.5 p-2">
            <span className="font-medium truncate flex items-center gap-1.5">
              <UserCircle2Icon size={16} /> {name}
            </span>
            <span className="text-sm font-normal text-muted-foreground truncate flex items-center gap-1.5">
              <Mail size={16} /> {email}
            </span>
            <div className="mt-1">
              <ThemeToggle />
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dropdownItems.map((item, index) => {
          return (
            <DropdownMenuItem
              key={index}
              className="cursor-pointer flex items-center justify-between"
              onClick={index === 1 ? handleSignOut : undefined}
            >
              {item.label} <item.icon className="size-4" />
            </DropdownMenuItem>
          );
        })}
      </Dropdown>
    </div>
  );
};

export default DashboardUserButton;
