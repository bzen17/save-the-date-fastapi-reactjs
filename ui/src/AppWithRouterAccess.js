import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { RoutesWithNavbar, RoutesWithoutNavbar } from "./config/route";
import LayoutWithoutNavbar from "./components/LayoutWithoutNavbar";
import LayoutwithNavbar from "./components/LayoutWithNavbar";
const AppWithRouteAccess = (props) => {
  return (
    <Routes>
      <Route element={<LayoutWithoutNavbar />}>
        {RoutesWithoutNavbar.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Route>
      <Route element={<LayoutwithNavbar />}>
        {RoutesWithNavbar.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppWithRouteAccess;
