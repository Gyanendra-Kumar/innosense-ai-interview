"use client";

import { useQuery } from "@tanstack/react-query";
import LoadingState from "../../../components/loading-state";
import { useTRPC } from "../../../trpc/client";

const AgentView = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.agents.getMany.queryOptions()
  );

  if (isLoading) {
    return (
      <div className="flex items-center h-[calc(100vh-10rem)]">
        <LoadingState
          title="Loading Agent"
          description="This may take a few seconds..."
        />
      </div>
    );
  }
  if (isError) {
    return <div>Error loading agents.</div>;
  }

  return <div>Agent View</div>;
};

export default AgentView;
