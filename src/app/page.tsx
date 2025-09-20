import Link from "next/link";
import { ThemeToggle } from "../components/toggle-theme";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-5">
      <div>Hello People</div>
      <ThemeToggle />
      <Link href="/sign-in">Sign In</Link>
      <Link href="/sign-up">Sign Up</Link>
      <h1>Checking develop branch</h1>
    </div>
  );
}
