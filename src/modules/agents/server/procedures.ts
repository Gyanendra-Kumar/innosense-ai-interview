import { TRPCError } from "@trpc/server";
import { db } from "../../../db";
import { agents } from "../../../db/schema";
import { baseProcedure, createTRPCRouter } from "../../../trpc/init";

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);

    // Loading simulation
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    // Error simulation
    // throw new TRPCError({ code: "BAD_REQUEST" });

    return data;
  }),
});
