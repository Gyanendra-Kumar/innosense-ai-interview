"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import ErrorState from "../../../components/error-state";
import LoadingState from "../../../components/loading-state";
import { useTRPC } from "../../../trpc/client";

const AgentView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div>Agent View</div>;
};

export default AgentView;
