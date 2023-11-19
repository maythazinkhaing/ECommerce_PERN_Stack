// PrivateRoute.js
import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "context/ContextProvider";

const PrivateRoute = () => {
  let { auth } = useStateContext();
  const location = useLocation();
  console.log(auth.user.accessToken);
  return auth.user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
