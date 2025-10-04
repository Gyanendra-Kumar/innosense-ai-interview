import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { getUser } from "../../lib/getUser";
import DashboardSidebar from "../../modules/dashboard/ui/components/dashboard.sidebar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <DashboardSidebar user={user} />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
