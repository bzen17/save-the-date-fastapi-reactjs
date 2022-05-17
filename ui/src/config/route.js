import { lazy } from "react";
import { RequireAuth } from "../components/RequireAuth";
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));
const AddDate = lazy(() => import("../pages/Calendar/AddDate"));
const ListDate = lazy(() => import("../pages/Calendar/ListDate"));

export const AppRoutes = [
  {
    path: "/",
    element: <Home />,
    exact: true,
    navbar: true,
  },
  {
    path: "/add",
    element: <RequireAuth><AddDate /></RequireAuth>,
    exact: true,
    navbar: true,
  },
  {
    path: "/list",
    element: <RequireAuth><ListDate /></RequireAuth>,
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
