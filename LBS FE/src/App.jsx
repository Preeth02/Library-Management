import { Button } from "./components/ui/button";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";


function App() {
  return (
    <>
      <Outlet></Outlet>
      <Toaster className="bg-gray-800 text-gray-200 border border-gray-700 rounded-md shadow-md" />
    </>
  );
}

export default App;
