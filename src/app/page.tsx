import { ThemeToggle } from "../components/toggle-theme";

export default function Home() {
  return (
    <div className="flex justify-center gap-5 mt-5">
      <div>Hello People</div>
      <ThemeToggle />
    </div>
  );
}
