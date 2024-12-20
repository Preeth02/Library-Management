import fetchReq from "@/utilityFunctions/fetchReq";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handler = async () => {
    const req = await fetchReq({
      link: "http://localhost:3000/api/v1/user/logout",
      method: "POST",
    });
    if (!req.error) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <Button
      onClick={handler}
      className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 transition"
    >
      <FaSignOutAlt className="text-xl text-red-500" />
      <span className="text-lg font-medium text-red-400">Log out</span>
    </Button>
  );
}

export default Logout;
