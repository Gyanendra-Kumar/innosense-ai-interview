"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "../../trpc/client";

const DashboardLandingPage = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Gyan" }));
  return <div>DashboardLandingPage: {data?.greeting}</div>;
};

export default DashboardLandingPage;
