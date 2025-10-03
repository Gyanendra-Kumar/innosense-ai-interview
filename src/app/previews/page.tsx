import ResetPasswordEmailPreview from "../../modules/email/previews/resetPasswordPreview";
import VerificationEmailPreview from "../../modules/email/previews/verificationMailPreview";

const Preview = () => {
  return (
    <div>
      <ResetPasswordEmailPreview />
      <VerificationEmailPreview />
    </div>
  );
};

export default Preview;
