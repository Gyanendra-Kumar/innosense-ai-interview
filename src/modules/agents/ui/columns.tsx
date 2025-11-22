"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CornerDownRightIcon } from "lucide-react";
import GenerateAvatar from "../../../components/generate-avatar";
import { AgentGetOne } from "../types";

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex gap-x-2 items-center">
          <GenerateAvatar
            variant="botttsNeutral"
            seed={row.original.name}
            className="size-6"
          />
          <span className="font-semibold capitalize">{row.original.name}</span>
        </div>
        <div className="flex gap-x-2 items-center">
          <CornerDownRightIcon className="size-3 text-muted-foreground" />
          <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  //   {
  //     accessorKey: "meetingCount",
  //     header: "Meetings",
  //   },
];
