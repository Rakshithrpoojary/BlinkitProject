// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../Store/AuthContext";

// function ProtectedRoutes({ children }) {
//   const userAccountdata = useSelector((selector) => selector.user.userdata);
//   const { isauthenticated } = useAuth();
//   if (!isauthenticated || userAccountdata.role !== "admin") {
//     return <Navigate to="/" />;
//   }
//   return children;
// }

// export default ProtectedRoutes;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Store/AuthContext";
import { useSelector } from "react-redux";
function ProtectedRoutes(Component) {
  return function EnhancedProtectedRoutes(props) {
    const userAccountdata = useSelector((selector) => selector.user.userdata);
    const { isauthenticated } = useAuth();
    if (!isauthenticated || userAccountdata.role !== "admin") {
      return <Navigate to="/" />;
    }
    return <Component {...props} />;
  };
}

export default ProtectedRoutes;
