import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  Input: {
    backgroundColor: "rgba(13, 33, 161, 0.75) !important",
    color: "#EEC643 !important",
    borderRadius: "5rem !important",
    "&::before": {
      content: "none !important",
    },
    "&:hover": {
      backgroundColor: "#011638 !important",
    },
  },
  selectedInput: {
    backgroundColor: "rgba(13, 33, 161, 1) !important",
    color: "#EEC643 !important",
    borderRadius: "5rem !important",
    padding: "0 2rem !important",
    "&::before": {
      content: "none !important",
    },
    "&:hover": {
      backgroundColor: "#011638 !important",
    },
  },
  input: {
    textAlign: "center",
    padding: "0.8rem 1rem !important",
  },
}));

export default useStyles;
