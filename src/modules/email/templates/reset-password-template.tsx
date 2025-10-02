// emails/ResetPasswordEmail.tsx
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";

interface ResetPasswordEmailProps {
  userName: string;
  url: string;
}

export default function ResetPasswordEmail({
  userName,
  url,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#6366f1",
              },
            },
          },
        }}
      >
        <div className="bg-gray-50 p-6">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Reset your password
            </h2>
            <p className="mt-2 text-gray-600">Hi {userName || "there"},</p>
            <p className="mt-2 text-gray-600">
              We received a request to reset your password. Click the button
              below to set up a new one:
            </p>

            <a
              href={url}
              className="mt-4 inline-block rounded-md bg-brand px-5 py-2 text-white font-medium no-underline"
            >
              Reset Password
            </a>

            <p className="mt-4 text-sm text-gray-500">
              If you did not request this, you can safely ignore this email.
            </p>
          </div>
        </div>
      </Tailwind>
    </Html>
  );
}
