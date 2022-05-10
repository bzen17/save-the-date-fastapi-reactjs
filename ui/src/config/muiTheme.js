import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#0D21A1",
      dark: "#011638",
    },
    primary: {
      main: "#EEC643",
      dark: "#141414",
    },
    light: "#EEF0F2",
  },
  typography: {
    fontFamily: `"Poppins", sans-serif`,
  },
});

export default theme;
