
import React, { useContext, useEffect } from "react";
import { authContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectiveRoute = ({ children }) => {
  const { token } = useContext(authContext);
  const storedToken = localStorage.getItem("token");

  const isAuthenticated = token || storedToken;

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info("Please login to continue!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectiveRoute;
