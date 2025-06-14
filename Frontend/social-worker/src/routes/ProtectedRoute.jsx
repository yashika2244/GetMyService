import React from "react";
import { useContext } from "react";

import { authContext } from "../context/AppContext";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectiveRoute = ({ children, allowedRoles }) => {
  const {token} =useContext(authContext)
  // Still loading context?
  // const token = localStorage.getItem("token");
  // const role = localStorage.getItem("role");


  // const isallowed = allowedRoles.includes(role);
  const accessibleRoute =
    token  ? children : <Navigate to={"/login"} replace={true} />;
  return accessibleRoute;
};

export default ProtectiveRoute;
