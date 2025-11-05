"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import ErrorState from "../../../components/error-state";
import LoadingState from "../../../components/loading-state";
import { useTRPC } from "../../../trpc/client";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";

const AgentView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      {/*<ResponsiveDialog
        title="Responsive test"
        description="Responsive description" open onOpenChange={() => {}}
      >
        <Button>Some Actions</Button>
      </ResponsiveDialog>*/}
      <p>Agent View</p>
    </div>
  );
};

export default AgentView;
