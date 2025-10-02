import { render } from "@react-email/render";
import WelcomeEmail from "../templates/WelcomeEmail";

export function getWelcomeEmail(userName: string) {
  return render(<WelcomeEmail userName={userName} />);
}
