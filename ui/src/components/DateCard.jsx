import React, { useRef } from "react";
import {
  Card,
  CardContent,
  Stack,
  Chip,
  Typography,
  Divider,
} from "@mui/material";
import {
  getCurrMonth,
  getFullDate,
  getMonthIndex,
  getYear,
} from "../utils/getDateAttr";

const DateCard = ({ savedDates, scrollRef }) => {
  const countDays = (day, month) => {
    const currMonth = getCurrMonth();
    if (month === currMonth) {
      return day - new Date().getDate();
    } else {
      let year;
      if (getMonthIndex(month) - getMonthIndex(currMonth) < 0) {
        year = getYear() + 1;
      } else {
        year = getYear();
      }
      const date = new Date(`${day}/${month}/${year}`);
      const diffinDays = Math.floor(
        Math.abs(date - new Date()) / (1000 * 60 * 60 * 24)
      );
      return diffinDays;
    }
  };
  const parseChipPadding = (title, content) => {
    let px, py;
    if (title === "Day") {
      px =
        content === 1
          ? "0.7rem"
          : content.toString().trim().length === 1 || content === 11
          ? "0.6rem"
          : "0.5rem";
      py = "1.5rem";
    } else {
      px = "1rem";
      py = "1.5rem";
    }
    return { px, py };
  };
  return (
    <Stack
      ref={scrollRef}
      className="scrollableContainer"
      direction="row"
      spacing={3}
      sx={{my:3}}
    >
      {savedDates.map((el, id) => {
        return (
          <div
            key={id}
            style={{
              backgroundColor: "transparent",
              padding: "0.2rem",
              border: "2px solid #0D21A1",
              borderRadius: "1.75rem",
            }}
          >
            <Card
              key={el.id}
              sx={{
                minWidth: 250,
                bgcolor: "secondary.main",
                borderRadius: "1.5rem",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  textAlign: "center",
                  mt: 1.5,
                }}
              >
                {el.occasion}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "primary.main",
                  fontSize: "1.2rem",
                  textAlign: "center",
                  mt: 0.5,
                  mb: 1.5,
                }}
              >
                ~ {el.name} ({el.relation}) ~
              </Typography>
              <Divider
                sx={{
                  borderColor: "primary.main",
                  borderBottomWidth: "medium",
                }}
              />
              <CardContent
                sx={{
                  bgcolor: "primary.main",
                  border: "2px solid #0D21A1",
                }}
              >
                <Stack
                  direction="column"
                  spacing={3}
                  sx={{ justifyContent: "center" }}
                >
                  <Chip
                    label={el.day}
                    sx={{
                      fontSize: "1.5rem",
                      py: parseChipPadding("Day", el.day).py,
                      px: parseChipPadding("Day", el.day).px,
                      borderRadius: "4rem",
                      bgcolor: "rgba(13, 33, 161, 1)",
                      cursor: "pointer",
                      color: "primary.main",
                    }}
                  />
                  <Chip
                    label={el.month}
                    sx={{
                      fontSize: "1.5rem",
                      py: parseChipPadding("Month", el.month).py,
                      px: parseChipPadding("Month", el.month).px,
                      borderRadius: "4rem",
                      bgcolor: "rgba(13, 33, 161, 1)",
                      cursor: "pointer",
                      color: "primary.main",
                    }}
                  />
                </Stack>
              </CardContent>
              <Divider
                sx={{
                  borderColor: "primary.main",
                  borderBottomWidth: "medium",
                }}
              />
              <CardContent
                sx={{
                  bgcolor: "secondary.main",
                  borderBottomLeftRadius: "1.5rem",
                  borderBottomRightRadius: "1.5rem",
                  padding: "0.5rem !important",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "primary.main",
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  in{" "}
                  <b style={{ fontSize: "1.5rem" }}>
                    {countDays(el.day, el.month)}
                  </b>{" "}
                  days
                </Typography>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </Stack>
  );
};

export default DateCard;
