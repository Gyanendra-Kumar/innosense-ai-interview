import React from "react";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-2">{children}</div>;
};

export default SidebarLayout;
