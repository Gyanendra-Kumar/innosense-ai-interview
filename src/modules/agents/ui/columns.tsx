"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";
import GenerateAvatar from "../../../components/generate-avatar";
import { Badge } from "../../../components/ui/badge";
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
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge
        className="flex items-center gap-x-2 [&>svg]:size-4"
        variant="outline"
      >
        <VideoIcon className="text-blue-700" />
        <span>
          {row.original.meetingCount}{" "}
          {row.original.meetingCount === 1 ? "meeting" : "meetings"}
        </span>
      </Badge>
    ),
  },
];
