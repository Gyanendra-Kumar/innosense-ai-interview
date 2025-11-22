// prisma.config.ts (at project root)
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },

  // 👇 This is how you set the DB URL in Prisma 7
  datasource: {
    url: process.env.PRISMA_DATABASE_URL!, // or DATABASE_URL if that's your env
  },
});
