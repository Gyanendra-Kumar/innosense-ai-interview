import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";

export default function WelcomeEmail({ userName }: { userName: string }) {
  return (
    <Html>
      <Tailwind>
        <div className="bg-gray-50 p-6">
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800">🎉 Welcome!</h2>
            <p className="mt-3 text-gray-600">Hi {userName || "there"},</p>

            <p className="mt-2 text-gray-600">
              Thanks for joining our platform. We’re excited to have you onboard
              🚀
            </p>
            <p className="mt-4 text-sm text-gray-500">
              You can now explore features, connect your account, and get
              started.
            </p>
          </div>
        </div>
      </Tailwind>
    </Html>
  );
}
