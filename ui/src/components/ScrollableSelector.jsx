import React, { useEffect, useRef } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Grid,
  Chip,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import useStyles from "../config/muiMakeStyles";

const ScrollableSelector = ({
  title,
  scrollRef,
  array,
  handleClick,
  selected,
}) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={12} md={4}>
        <Typography variant="h3" mr={6} sx={{ color: "secondary.main" }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <Stack
          ref={scrollRef}
          className="scrollableContainer"
          direction="row"
          spacing={3}
        >
          {array.map((e, i) => {
            let px, py, content;
            if (title === "Day") {
              px =
                i + 1 === 1
                  ? "1.1rem"
                  : (i + 1).toString().trim().length === 1 || i + 1 === 11
                  ? "0.9rem"
                  : "0.8rem";
              py = "2rem";
              content = i + 1;
            } else {
              px = "1rem";
              py = "1.5rem";
              content = e;
            }
            return (
              <Chip
                key={content}
                label={content}
                onClick={(e) => handleClick(e, content)}
                sx={{
                  fontSize: "1rem",
                  py: py,
                  px: px,
                  borderRadius: "4rem",
                  bgcolor:
                    content === selected
                      ? "secondary.dark"
                      : "rgba(13, 33, 161, 0.75)",
                  cursor: "pointer",
                  color: "primary.main",
                  "&:hover": {
                    bgcolor: "secondary.dark",
                  },
                }}
              />
            );
          })}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ScrollableSelector;
