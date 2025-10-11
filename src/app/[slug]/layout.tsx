import { Metadata } from "next";
import React from "react";
import { SidebarProvider } from "../../components/ui/sidebar";
import DashboardSidebar from "../../modules/dashboard/ui/components/dashboard.sidebar";
import ProtectedLayout from "../../modules/dashboard/ui/components/ProtectedLayout";
import Main from "./(sidebar-items)/main";

export const metadata: Metadata = {
  title: "Dashboard | InnoSense AI Interview",
  description:
    "Schedule AI-powered mock interviews, get real-time feedback, and prepare with confidence. InnoSense AI Interview is your smart companion for job readiness.",
  icons: {
    icon: "/loading.svg",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

const DashboardLayout = async ({ children, params }: PageProps) => {
  const slug = await params;
  console.log("🚀 ~ layout.tsx:25 ~ DashboardLayout ~ slug:", slug);
  return (
    <ProtectedLayout params={slug}>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="p-2">
          <Main>{children}</Main>
        </main>
      </SidebarProvider>
    </ProtectedLayout>
  );
};

export default DashboardLayout;
