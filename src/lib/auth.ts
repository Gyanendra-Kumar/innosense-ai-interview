import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getResetPasswordEmail } from "../modules/email/email-render/getResetEmail";
import { getWelcomeEmail } from "../modules/email/email-render/getWelcomeEmail";
import { verification } from "../modules/email/email-render/sendVerificationMail";
import { sendMail } from "./sendMail";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      const html = await getResetPasswordEmail(user.name ?? "User", url);

      await sendMail({
        to: user.email,
        userName: user.name,
        subject: `Reset your password`,
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
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      const html = await verification(user.name ?? "User", url);
      await sendMail({
        to: user?.email,
        userName: user?.name,
        subject: `Verify your email`,
        html,
      });
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
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
