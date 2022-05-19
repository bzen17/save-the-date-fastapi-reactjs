import React from "react";
import { styled } from "@mui/material/styles";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { useMediaQuery } from "react-responsive";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#EEC643",
    color: "black",
    boxShadow: theme.shadows[1],
    fontSize: 16,
    border: "2px solid #0D21A1",
  },
}));

const ListItem = (props) => {
  const isPortrait = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <CheckCircleTwoToneIcon
        sx={{
          color: "secondary.main",
          alignSelf: isPortrait ? "flex-start" : "center",
        }}
      />
      <Typography
        sx={{
          fontSize: isPortrait ? "1.2rem" : "1.5rem",
          color: "secondary.dark",
          fontWeight: "600",
          ml: 2,
        }}
      >
        {props.content}
      </Typography>
      <CustomTooltip title={props.tooltip} placement="top-end">
        <InfoOutlinedIcon
          sx={{ color: "light", ml: "2.5vw", alignSelf: "flex-start" }}
        />
      </CustomTooltip>
    </div>
  );
};

export default ListItem;
