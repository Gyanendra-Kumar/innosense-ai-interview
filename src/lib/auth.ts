import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getResetPasswordEmail } from "../modules/email/email-render/getResetEmail";
import { getWelcomeEmail } from "../modules/email/email-render/getWelcomeEmail";
import { verification } from "../modules/email/email-render/sendVerificationMail";
import { sendMail } from "./sendMail";

export const auth = betterAuth({
  appName: "InnoSense AI",
  // baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  /**
   * Only allow your own frontends to talk to auth.
   * This is a big CSRF / cross-origin protection layer.
   */
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL, // your main frontend
    "http://localhost:3000",
    "http://localhost:5173",
  ].filter(Boolean) as string[],

  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for", "cf-connecting-ip"],
      disableIpTracking: false,
    },
    // Always use secure cookies in production
    useSecureCookies: true,
    // Default for all cookies (session, OAuth state, etc.)
    defaultCookieAttributes: {
      httpOnly: true,
      secure: true,
      sameSite: "lax", // good protection against CSRF for most cases
    },

    // Avoid cookie name collisions with other apps on same domain
    cookiePrefix: "InnoSense-AI",
  },

  emailAndPassword: {
    enabled: true,
    // Force email verification before session is created
    requireEmailVerification: true,

    // Stronger password policy than default
    minPasswordLength: 10,
    maxPasswordLength: 128,

    resetPasswordExpiresIn: 60 * 30, // 30 minutes in seconds
    async sendResetPassword({ user, url }) {
      const html = await getResetPasswordEmail(user.name ?? "User", url);

      await sendMail({
        to: user.email,
        userName: user.name,
        subject: `😓 Reset your password`,
        html,
      });
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      prompt: "select_account",
      clientId: process.env.NEXT_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET as string,
    },
  },

  /**
   * Secure OAuth account storage & linking rules
   */
  account: {
    encryptOAuthTokens: true, // encrypt provider access/refresh tokens in DB  [oai_citation:1‡Better Auth](https://www.better-auth.com/docs/reference/options)
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github", "email-password"],
      allowDifferentEmails: false, // avoid linking accounts with different emails
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
        defaultValue: "user",
      },
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60, // 1 hours in seconds
    async sendVerificationEmail({ user, url }) {
      const html = await verification(user.name ?? "User", url);
      await sendMail({
        to: user?.email,
        userName: user?.name,
        subject: `🚨 Verify your email 🚓`,
        html,
      });
    },
  },
  /**
   * Stronger, DB-backed rate-limits
   */
  rateLimit: {
    enabled: true,
    window: 60, // 60s window
    max: 100, // global default  [oai_citation:2‡Better Auth](https://www.better-auth.com/docs/concepts/rate-limit?utm_source=chatgpt.com)

    // Use DB to make rate-limit work across multiple instances
    // storage: "database",
    // modelName: "rateLimit",

    // Extra strict on sensitive endpoints
    customRules: {
      "/sign-in/email": { window: 60, max: 5 },
      "/sign-up/email": { window: 60, max: 3 },
      "/reset-password/*": { window: 60, max: 3 },
      "/two-factor/*": { window: 60, max: 3 },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 2,
    updateAge: 60 * 60 * 4,
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const html = await getWelcomeEmail(user.name ?? "User");

          await sendMail({
            to: user.email,
            userName: user.name,
            subject: "Welcome to our platform 🎉",
            html,
          });
        },
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
