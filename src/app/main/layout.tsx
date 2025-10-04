import { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import DashboardSidebar from "../../modules/dashboard/ui/components/dashboard.sidebar";

export const metadata: Metadata = {
  title: "InnoSense AI Interview - Practice Smarter with AI",
  description:
    "Schedule AI-powered mock interviews, get real-time feedback, and prepare with confidence. InnoSense AI Interview is your smart companion for job readiness.",
  icons: {
    icon: "/loading.svg",
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
