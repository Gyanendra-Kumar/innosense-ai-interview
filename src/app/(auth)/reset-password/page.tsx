import { SearchParamsType } from "../../../../types.ts";
import ResetPasswordView from "../../../modules/auth/reset-password";

export const metadata = {
  title: "Reset Password",
  description: "Reset your password",
};

const ResetPassword = async ({ searchParams }: SearchParamsType) => {
  const { token } = await searchParams;

  return (
    <main>
      {token ? (
        <ResetPasswordView token={token} />
      ) : (
        <p role="alert" className="text-red-600">
          Missing Token
        </p>
      )}
    </main>
  );
};

export default ResetPassword;
