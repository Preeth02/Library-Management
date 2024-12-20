import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [navigate, authStatus, authentication]);

  if (loader) {
    return (
      <div className="bg-gray-600 w-screen h-screen flex items-center font-extrabold text-white text-2xl">
        Loading...
      </div>
    );
  } else {
    return children;
  }
}

export default AuthLayout;
