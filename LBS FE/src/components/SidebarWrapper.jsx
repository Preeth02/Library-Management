import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";

function SidebarWrapper() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div className="h-screen bg-gray-800 sticky top-0 flex">
          <div className="border-gray-500 border-r-[1px] min-h-screen"></div>
          {/* <div className="h-screen bg-gray-800 "> */}
            <SidebarTrigger className="bg-gray-800 text-white p-1 my-1" />
          {/* </div> */}
          <div className="border-gray-500 border-l-[1px] min-h-screen "></div>
        </div>
        <main className="w-full">
          <Outlet/>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default SidebarWrapper;
