import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInformation } = useSelector((state) => state?.auth);
  console.log("userInformation", userInformation);
  return userInformation ? <Outlet /> : <Navigate to={`/login`} replace />;
};

export default PrivateRoute;
