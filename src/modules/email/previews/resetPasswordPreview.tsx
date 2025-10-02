// emails/ResetPasswordEmail.preview.tsx
import { Preview } from "@react-email/preview";
import ResetPasswordEmail from "../templates/reset-password-template";

export default function ResetPasswordEmailPreview() {
  return (
    <>
      <Preview>Reset your password</Preview>
      <ResetPasswordEmail
        userName="John Doe"
        url="https://example.com/reset-password?token=123"
      />
    </>
  );
}
