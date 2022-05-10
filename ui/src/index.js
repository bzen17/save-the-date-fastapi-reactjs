import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./config/muiGlobal.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MUITheme from "./config/muiTheme";
import { ThemeProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={MUITheme}>
    <App />
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
