// import React from "react";
// import { useContext } from "react";

// import { authContext } from "../context/AppContext";
// import { Navigate, useNavigate } from "react-router-dom";

// const ProtectiveRoute = ({ children, }) => {
//   const {token} =useContext(authContext)
//   // Still loading context?
//   // const token = localStorage.getItem("token");
//   // const role = localStorage.getItem("role");


//   // const isallowed = allowedRoles.includes(role);
//   const accessibleRoute =
//     token  ? children : <Navigate to={"/login"} replace={true} />;
//   return accessibleRoute;
// };

// export default ProtectiveRoute;
import React, { useContext } from "react";
import { authContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const ProtectiveRoute = ({ children }) => {
  const { token } = useContext(authContext);
  const storedToken = localStorage.getItem("token");

  if (token || storedToken) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};
export default ProtectiveRoute;
