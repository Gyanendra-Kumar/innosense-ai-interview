"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import EmptyState from "../../../components/empty-state";
import { useTRPC } from "../../../trpc/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const AgentView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data} columns={columns} />
      {data.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during call."
        />
      )}
    </div>
  );
};

export default AgentView;
