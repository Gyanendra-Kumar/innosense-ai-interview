import * as schema from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
  // baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET!,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //     redirectURI: `${
  //       process.env.BETTER_AUTH_URL || "http://localhost:3000"
  //     }/api/auth/callback/google`,
  //   },
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID!,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  //     redirectURI: `${
  //       process.env.BETTER_AUTH_URL || "http://localhost:3000"
  //     }/api/auth/callback/github`,
  //   },
  // },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
  // trustedOrigins: [
  //   "http://localhost:3000",
  //   process.env.BETTER_AUTH_URL || "http://localhost:3000",
  // ],
});

export type Session = typeof auth.$Infer.Session;
