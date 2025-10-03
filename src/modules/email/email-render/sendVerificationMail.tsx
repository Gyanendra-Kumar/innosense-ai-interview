// lib/emails.ts
import { render } from "@react-email/render";
import VerificationEmail from "../templates/verificationEmail";

export function verification(userName: string, url: string) {
  return render(<VerificationEmail userName={userName} url={url} />);
}
