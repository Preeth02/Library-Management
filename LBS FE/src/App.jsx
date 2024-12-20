import { Button } from "./components/ui/button";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import fetchReq from "./utilityFunctions/fetchReq";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(true);
    (async () => {
      const user = await fetchReq({
        link: "http://localhost:3000/api/v1/user/get-user",
      });
      if (user.data) {
        // console.log(user.data);
        dispatch(login(user.data));
      }
    })();

    setLoader(false);
    return () => {};
  }, []);

  if (loader) {
    return (
      <div className="bg-gray-600 w-screen h-screen flex justify-center items-center font-extrabold text-white text-2xl">
        Loading...
      </div>
    );
  } else
    return (
      <>
        <Outlet></Outlet>
        <Toaster className="bg-gray-800 text-gray-200 border border-gray-700 rounded-md shadow-md" />
      </>
    );
}

export default App;
