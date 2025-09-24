import { drizzle } from "drizzle-orm/neon-http";

if (!process.env.DATABASE_URL) {
  throw new Error("Please check the database url.");
}
export const db = drizzle(process.env.DATABASE_URL);
