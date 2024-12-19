import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";

function SidebarWrapper() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div className="border-gray-500 border-r-[1px] max-h-screen"></div>
        <main>
          <Outlet></Outlet>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default SidebarWrapper;
