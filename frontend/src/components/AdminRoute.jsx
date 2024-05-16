import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { userInformation } = useSelector((state) => state?.auth);
  console.log("userInformation", userInformation);
  return userInformation && userInformation.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={`/login`} replace />
  );
};

export default AdminRoute;
