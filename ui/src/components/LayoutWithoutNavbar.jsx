import NavBar from "./NavBar";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
const LayoutWithoutNavbar = (props) => {
  return (
    <div className="d-flex flex-column " style={{ minHeight: "100vh" }}>
      <>{props.children}</>
      <Outlet />
    </div>
  );
};

export default LayoutWithoutNavbar;
