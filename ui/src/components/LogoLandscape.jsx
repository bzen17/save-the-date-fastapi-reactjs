import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";
import { getCurrDay, getCurrMonth } from "../utils/getDateAttr";
import { useMediaQuery } from "react-responsive";

const LogoLandscape = (props) => {
  const isPortrait = useMediaQuery({ query: "(max-width: 1020px)" });
  var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  var months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setChecked((checked) => {
        return !checked;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  return (
    <a href="/" style={{ textDecoration: "none" }}>
      <div
        style={{
          padding: props.padding ? props.padding : "0",
          transform: props.scale ? `scale(${props.scale})` : "",
          display: "flex",
        }}
      >

          <Typography
            sx={{
              fontSize: "2rem",
              color: "secondary.main",
              fontWeight: "600",
              alignSelf: "flex-end",
            }}
          >
            Save the
          </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 0.5rem",
            marginBottom: "0.6rem",
          }}
        >
          <Box
            sx={{
              width: 50,
              height: 20,
              backgroundColor: "secondary.main",
              borderTopLeftRadius: "0.3rem",
              borderTopRightRadius: "0.3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              align="center"
              noWrap
              variant="h6"
              sx={{ fontSize: "0.9rem", fontWeight: "300", color: "white" }}
            >
              {getCurrDay()}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 50,
              height: 30,
              backgroundColor: "light",
              borderBottomLeftRadius: "0.3rem",
              borderBottomRightRadius: "0.3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Fade in={!checked}>
              <Typography
                align="center"
                noWrap
                variant="h4"
                sx={{ position: "absolute", color: "secondary.main" }}
              >
                {new Date().getDate()}
              </Typography>
            </Fade>
            <Fade in={checked}>
              <Typography
                align="center"
                noWrap
                variant="h6"
                sx={{
                  position: "absolute",
                  fontWeight: "300",
                  color: "secondary.main",
                }}
              >
                {getCurrMonth()}
              </Typography>
            </Fade>
          </Box>
        </div>
          <Typography
            sx={{
              fontSize: "2rem",
              color: "secondary.main",
              fontWeight: "600",
              alignSelf: "flex-end",
            }}
          >
            Dates
          </Typography>
      </div>
    </a>
  );
};

export default LogoLandscape;
