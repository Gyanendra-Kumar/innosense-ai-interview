import { Metadata } from "next";
import React from "react";
import { SidebarProvider } from "../../components/ui/sidebar";
import DashboardNavbar from "../../modules/dashboard/ui/components/dashboard.navbar";
import DashboardSidebar from "../../modules/dashboard/ui/components/dashboard.sidebar";
import ProtectedLayout from "../../modules/dashboard/ui/components/ProtectedLayout";

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

  return (
    <ProtectedLayout params={slug}>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full">
          {/* <SidebarTrigger /> */}
          <DashboardNavbar />
          {children}
        </main>
      </SidebarProvider>
    </ProtectedLayout>
  );
};

export default DashboardLayout;
