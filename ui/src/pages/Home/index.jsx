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

const Home = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <div class="heroimage" style={{ backgroundImage: `url(${heroImg})` }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              bgcolor: "transparent",
              height: "100vh",
              float: "right",
              pt: 20,
            }}
          >
            <Typography
              sx={{
                fontSize: "3rem",
                color: "secondary.main",
                fontWeight: "600",
                textAlign: "right",
                letterSpacing: "0.3rem",
              }}
            >
              My Big Dates
            </Typography>
            <Typography
              sx={{
                fontSize: "2rem",
                color: "light",
                fontWeight: "600",
                textAlign: "right",
                mb: 3,
                marginLeft: "7rem",
                textShadow: `-1px 1px 0 #0D21A1,1px 1px 0 #0D21A1,1px -1px 0 #0D21A1,-1px -1px 0 #0D21A1`,
              }}
            >
              Never forget the big days of your friends, <br />
              colleagues, employees or loved ones.
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
                backgroundColor: "primary.main",
                fontWeight: "600",
                fontSize: "1.5rem",
                padding: "0.5rem 2rem",
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Home;
