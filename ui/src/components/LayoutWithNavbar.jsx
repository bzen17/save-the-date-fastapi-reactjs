import NavBar from "./NavBar";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
const LayoutwithNavbar = (props) => {
  return (
    <div
      className="d-flex flex-column "
      style={{ minHeight: "100vh", backgroundColor: "#EEC643" }}
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
