import NavBar from "./NavBar";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../redux/store/auth-context";
import Loader from "./Loader";
const LayoutwithNavbar = (props) => {
  const ctx = useAuth();
  const { isLoggedIn, isLoading } = ctx;
  return (
    <div
      className="d-flex flex-column layoutWrapper"
      style={{ backgroundColor: "#EEC643" }}
    >
        <>
          <NavBar />
          {props.children}
        </>
      <Outlet />
    </div>
  );
};

export default LayoutwithNavbar;
