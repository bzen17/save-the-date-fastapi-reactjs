import React from "react";
import { styled } from "@mui/material/styles";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#EEC643",
    color: "rgba(20, 20, 20, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 16,
  },
}));

const ListItem = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <CheckCircleTwoToneIcon sx={{ color: "secondary.main" }} />
      <Typography
        sx={{
          fontSize: "1.5rem",
          color: "secondary.dark",
          fontWeight: "600",
          textAlign: "right",
          ml: 2,
        }}
      >
        {props.content}
      </Typography>
      <CustomTooltip title={props.tooltip} placement="top-end">
        <InfoOutlinedIcon sx={{ color: "primary.dark" }} />
      </CustomTooltip>
    </div>
  );
};

export default ListItem;
