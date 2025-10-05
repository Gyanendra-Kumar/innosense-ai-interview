import { Metadata } from "next";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
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
  params: {
    slug: string;
  };
  children: React.ReactNode;
}

const DashboardLayout = ({ children, params }: PageProps) => {
  return (
    <ProtectedLayout params={params}>
      <SidebarProvider>
        <DashboardSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </ProtectedLayout>
  );
};

export default DashboardLayout;
