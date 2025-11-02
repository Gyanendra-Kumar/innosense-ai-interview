import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import AgentView from "@/modules/agents/ui/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <div className="flex items-center h-[calc(100vh-10rem)]">
            <LoadingState
              title="Loading Agent"
              description="This may take a few seconds..."
            />
          </div>
        }
      >
        <ErrorBoundary
          fallback={
            <div className="flex items-center h-[calc(100vh-10rem)]">
              <ErrorState
                title="Failed to load agent"
                description="Something went wrong! Please try again."
              />
            </div>
          }
        >
          <AgentView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
