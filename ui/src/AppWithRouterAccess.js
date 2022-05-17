import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PrivateRoute, ProtectedRoute, PublicRoute } from "react-secure-route";
import LayoutWithoutNavbar from "./components/LayoutWithoutNavbar";
import LayoutwithNavbar from "./components/LayoutWithNavbar";
import { useAuth } from "./redux/store/auth-context";
import { lazy } from "react";
import { RequireAuth } from "./components/RequireAuth";
import Loader from "./components/Loader";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const AddDate = lazy(() => import("./pages/Calendar/AddDate"));
const ListDate = lazy(() => import("./pages/Calendar/ListDate"));

const AppWithRouteAccess = (props) => {
  const ctx = useAuth();

  const AppRoutes = [
    {
      path: "/",
      element: <Home />,
      exact: true,
      navbar: true,
    },
    {
      path: "/add",
      element: (
        <RequireAuth isLoggedIn={ctx.isLoggedIn}>
          <AddDate />
        </RequireAuth>
      ),
      exact: true,
      navbar: true,
    },
    {
      path: "/list",
      element: (
        <RequireAuth isLoggedIn={ctx.isLoggedIn}>
          <ListDate />
        </RequireAuth>
      ),
      exact: true,
      navbar: true,
    },
    {
      path: "/login",
      element: <Login />,
      exact: true,
    },
    {
      path: "/signup",
      element: <SignUp />,
      exact: true,
    },
  ];
  return (
    <>
      {ctx.isLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route element={<LayoutWithoutNavbar />}>
            {AppRoutes.map((route, i) =>
              !route.navbar ? <Route key={i} {...route} /> : ""
            )}
          </Route>
          <Route element={<LayoutwithNavbar />}>
            {AppRoutes.map((route, i) =>
              route.navbar ? <Route key={i} {...route} /> : ""
            )}
          </Route>
        </Routes>
      )}
    </>
  );
};

export default AppWithRouteAccess;
