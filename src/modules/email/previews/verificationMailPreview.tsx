// emails/ResetPasswordEmail.preview.tsx
import { Preview } from "@react-email/preview";
import VerificationEmail from "../templates/verificationEmail";

export default function VerificationEmailPreview() {
  return (
    <>
      <Preview>Reset your password</Preview>
      <VerificationEmail
        userName="John Doe"
        url="https://example.com/reset-password?token=123"
      />
    </>
  );
}
