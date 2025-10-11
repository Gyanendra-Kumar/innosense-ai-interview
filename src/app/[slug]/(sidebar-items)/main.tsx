"use client";

import { SidebarTrigger } from "../../../components/ui/sidebar";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`h-full shadow-2xl rounded-2xl p-6`}>
      <SidebarTrigger />
      {children}
    </div>
  );
};

export default Main;
