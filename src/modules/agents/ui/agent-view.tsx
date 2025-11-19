"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "../../../trpc/client";

const AgentView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default AgentView;
