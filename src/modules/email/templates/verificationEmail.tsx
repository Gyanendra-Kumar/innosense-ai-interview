// emails/VerificationEmail.tsx
import * as React from "react";
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";

interface VerificationEmailProps {
  userName?: string;
  url: string;
}

export default function VerificationEmail({
  userName,
  url,
}: VerificationEmailProps) {
  return (
    <Html>
      <Tailwind>
        <div className="bg-gray-50 p-6">
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Verify your email address
            </h2>
            <p className="mt-2 text-gray-600">Hi {userName || "there"},</p>
            <p className="mt-2 text-gray-600">
              Thanks for signing up! Please confirm your email address by
              clicking the button below:
            </p>

            <a
              href={url}
              className="mt-4 inline-block rounded-md bg-indigo-600 px-5 py-2 text-white font-medium no-underline"
            >
              Verify Email
            </a>

            <p className="mt-4 text-sm text-gray-500">
              If you did not sign up, you can safely ignore this email.
            </p>
          </div>
        </div>
      </Tailwind>
    </Html>
  );
}
