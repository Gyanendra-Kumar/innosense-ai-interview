// lib/emails.ts
import { render } from "@react-email/render";
import ResetPasswordEmail from "../templates/reset-password-template";


export function getResetPasswordEmail(userName: string, url: string) {
  return render(<ResetPasswordEmail userName={userName} url={url} />);
}