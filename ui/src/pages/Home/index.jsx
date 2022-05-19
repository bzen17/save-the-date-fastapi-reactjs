import React, { useEffect, useState } from "react";
import heroImg from "../../assets/images/hero-image.png";
import styled from "styled-components";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ListItem from "../../components/ListItem";
import Button from "@mui/material/Button";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const isPortrait = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" disableGutters={isPortrait} sx={{ bgcolor: "primary.main" }}>
        <Box
          sx={{
            bgcolor: "transparent",
            float: "right",
          }}
        >
          <Box
            sx={{
              p: isPortrait ? 2 : 3,
              maxWidth: isPortrait ? "100%" : "85%",
              float: "left",
              borderRadius: "1rem",
              border: "5px solid #0D21A1",
            }}
          >
            <Box
              sx={{
                p: isPortrait ? 2.5 : 5,
                pb: 6.5,
                maxWidth: "100%",
                borderRadius: "1rem",
                border: "5px solid #fff",
              }}
            >
              <Typography
                sx={{
                  fontSize: isPortrait ? "2.5rem" : "4rem",
                  color: "secondary.main",
                  fontWeight: "600",
                  letterSpacing: "0.3rem",
                }}
              >
                Save the Dates
              </Typography>
              <Typography
                sx={{
                  fontSize: isPortrait ? "1.5rem" : "2rem",
                  color: "light",
                  fontWeight: "600",
                  mt: 1,
                  mb: 3,
                  textShadow: `-1px 1px 0 #0D21A1,1px 1px 0 #0D21A1,1px -1px 0 #0D21A1,-1px -1px 0 #0D21A1`,
                }}
              >
                Never forget the big days of your friends, family, colleagues,
                employees, and even your boss.
              </Typography>
              <ListItem
                content="Save your favorite dates."
                tooltip="Birthday, Anniversary, etc. save any date that matters."
              />
              <ListItem
                content="Get notified ahead of time."
                tooltip="Recieve email/SMS/WhatsApp message prior to the big dates."
              />
              <ListItem
                content="Send out wishes to your loved ones."
                tooltip="Send email/SMS/WhatsApp notification to the significant people."
              />
              <ListItem
                content="Automate personalized wishes."
                tooltip="Send automated custom messages."
              />
              <Button
                key="login"
                href="/help"
                sx={{
                  my: 2,
                  mt: 3,
                  color: "secondary.main",
                  float: "right",
                  textAlign: "center",
                  backgroundColor: "light",
                  fontWeight: "600",
                  fontSize: isPortrait ? "1.2rem" : "1.5rem",
                  padding: "0.5rem 1.5rem",
                  border: "2px solid #0D21A1",
                  borderRadius: "3rem",
                  "&:hover": {
                    backgroundColor: "secondary.dark",
                    color: "primary.main",
                  },
                }}
              >
                Learn More
                <ArrowCircleRightTwoToneIcon sx={{ ml: 1, fontSize: "2rem" }} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Home;
