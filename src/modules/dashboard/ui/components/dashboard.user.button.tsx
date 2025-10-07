import { ChevronRight } from "lucide-react";
import { useState } from "react";
import Dropdown from "../../../../components/dropdown.component";
import GenerateAvatar from "../../../../components/generate-avatar";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { authClient } from "../../../../lib/auth-client";

const DashboardUserButton = () => {
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

  return (
    <div>
      <Dropdown trigger={dropdownTrigger()} onOpenChange={setOpen}>
        <div className="flex flex-col gap-1">
          <span className="font-medium truncate">{name}</span>
          <span className="text-sm font-normal text-muted-foreground truncate">
            {email}
          </span>
        </div>
      </Dropdown>
    </div>
  );
};

export default DashboardUserButton;
