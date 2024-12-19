import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaFolder,
  FaBookmark,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";

export function AppSidebar() {
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
              <Link
                to="/dashboard"
                className="flex items-center gap-2 p-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                <FaBox className="text-xl" />
                <span className="text-lg font-medium">Dashboard</span>
              </Link>

              {/* My Collections */}
              <Link
                to="/collections"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 transition"
              >
                <FaFolder className="text-xl" />
                <span className="text-lg font-medium">My Collections</span>
              </Link>

              {/* Favourites */}
              <Link
                to="/favourites"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 transition"
              >
                <FaBookmark className="text-xl" />
                <span className="text-lg font-medium">Favourites</span>
              </Link>
            </nav>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="border-t border-gray-700 p-4">
          <SidebarGroup className="space-y-2">
            <nav className="space-y-2">
              {/* Settings */}
              <Link
                to="/settings"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 transition"
              >
                <FaCogs className="text-xl" />
                <span className="text-lg font-medium">Settings</span>
              </Link>

              {/* Logout */}
              <Link
                to="/logout"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 transition"
              >
                <FaSignOutAlt className="text-xl text-red-500" />
                <span className="text-lg font-medium text-red-400">
                  Log out
                </span>
              </Link>
            </nav>
          </SidebarGroup>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
