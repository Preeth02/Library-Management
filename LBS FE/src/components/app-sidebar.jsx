import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

import { Plus, Edit } from "lucide-react";
import { Button } from "./ui/button";
import { NavLink, Link } from "react-router-dom";
import { FaBox, FaFolder, FaBookmark, FaCogs } from "react-icons/fa";
import Logout from "./Logout";
import { useSelector } from "react-redux";

export function AppSidebar() {
  const user = useSelector((state) => state.auth.userData);
  return (
    <Sidebar>
      {/* Header */}
      <div className="min-h-screen w-64 bg-gray-900 text-gray-200 flex flex-col shadow-lg">
        <SidebarHeader className="p-6">
          <Link to={"/"} className="flex ">
            <h1 className="text-2xl font-bold text-blue-500">JSSATEB</h1>
          </Link>
          {/* <SidebarTrigger /> */}
        </SidebarHeader>
        {/* Content */}
        <hr className="border-gray-600 " />
        <SidebarContent className="flex-grow">
          {/* Group 1 */}
          <SidebarGroup className="space-y-2 px-4 my-5">
            <nav className="space-y-2 px-4">
              {/* Dashboard */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-md text-white ${
                    isActive
                      ? "bg-blue-600 hover:bg-blue-700"
                      : " hover:bg-gray-800"
                  }  transition`
                }
              >
                <FaBox className="text-xl" />
                <span className="text-lg font-medium">Dashboard</span>
              </NavLink>

              {/* My Collections */}
              <NavLink
                to="/collections"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-md text-white ${
                    isActive
                      ? "bg-blue-600 hover:bg-blue-700"
                      : " hover:bg-gray-800"
                  }  transition`
                }
              >
                <FaFolder className="text-xl" />
                <span className="text-lg font-medium">My Collections</span>
              </NavLink>

              {/* Favourites */}
              {/* <NavLink
                to="/favourites"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-md text-white ${
                    isActive
                      ? "bg-blue-600 hover:bg-blue-700"
                      : " hover:bg-gray-800"
                  }  transition`
                }
              >
                <FaBookmark className="text-xl" />
                <span className="text-lg font-medium">Favourites</span>
              </NavLink> */}
            </nav>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="border-t border-gray-700 p-4">
          <SidebarGroup className="space-y-2">
            <nav className="space-y-2">
              {/* Settings */}
              {user.role === "ADMIN" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div
                      className={`flex items-center gap-2 p-2 rounded-md text-white transition cursor-pointer hover:bg-gray-800`}
                    >
                      <FaCogs className="text-xl" />
                      <span className="text-lg font-medium">Settings</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-gray-900 text-white border border-gray-700 shadow-lg">
                    <DropdownMenuLabel className="text-gray-400">
                      Settings
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuGroup>
                      {/* Add Books Option */}
                      <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Plus className="text-gray-400" />
                        <Link to={"/addBooks"}>Add Books</Link>
                        <DropdownMenuShortcut className="text-gray-500">
                          ⌘A
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>

                      {/* Update Books Option
                      <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Edit className="text-gray-400" />
                        <Link to={"/updateBook"}>Update Books</Link>
                        <DropdownMenuShortcut className="text-gray-500">
                          ⌘U
                        </DropdownMenuShortcut>
                      </DropdownMenuItem> */}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Logout */}
              <Logout />
            </nav>
          </SidebarGroup>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
