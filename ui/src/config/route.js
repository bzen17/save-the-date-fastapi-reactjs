import { lazy } from "react";
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));
const AddDate = lazy(() => import("../pages/Calendar/AddDate"));
const ListDate = lazy(() => import("../pages/Calendar/ListDate"));

export const RoutesWithNavbar = [
  {
    path: "/",
    element: <Home />,
    exact: true,
  },
  {
    path: "/add",
    element: <AddDate />,
    exact: true,
  },
  {
    path: "/list",
    element: <ListDate />,
    exact: true,
  },
];

export const RoutesWithoutNavbar = [
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
