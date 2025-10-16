import { CommandList } from "cmdk";
import { Dispatch, SetStateAction } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandItem,
} from "../../../../components/ui/command";

interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardCommand = ({ open, setOpen }: PropsType) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or agent" />
      <CommandList>
        <CommandItem>Test</CommandItem>
      </CommandList>
    </CommandDialog>
  );
};

export default DashboardCommand;
