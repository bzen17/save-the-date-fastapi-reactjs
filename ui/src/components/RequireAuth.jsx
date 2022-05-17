import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

export const RequireAuth = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
