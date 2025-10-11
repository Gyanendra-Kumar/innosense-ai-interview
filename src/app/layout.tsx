import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "../components/theme-provider";
import { Providers } from "../lib/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "InnoSense AI Interview - Practice Smarter with AI",
  description:
    "Schedule AI-powered mock interviews, get real-time feedback, and prepare with confidence. InnoSense AI Interview is your smart companion for job readiness.",
  icons: {
    icon: "/loading.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className="bg-gradient-to-bl from-[#F6FAF9] from-30% via-[#E8F0EE] via-80% to-[#E3E8E7]"> */}
      <body className="bg-[#F2F3F5]">
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={false}
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
