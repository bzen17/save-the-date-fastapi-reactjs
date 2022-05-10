import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Grid,
  Stack,
  Chip,
  TextField,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import DateCard from "../../components/DateCard";
import { getCurrentMonthUserEvents, getUpcomingUserEvents } from "../../api/event";
import { getCurrMonth } from "../../utils/getDateAttr";
import { useHorizontalScroll } from "../../utils/useHorizontalScroll";
const ListDate = () => {
    const scrollRef1 = useHorizontalScroll();
    const scrollRef2 = useHorizontalScroll();
    const [currentDates, setCurrentDates] = useState([]);
    const [upcomingDates, setUpcomingDates] = useState([]);
  useEffect(() => {
      const fetchData = async () => {
        const current = await getCurrentMonthUserEvents(new Date().getDate(),getCurrMonth()).catch(err => {
            console.log(err);
        });
        const upcoming = await getUpcomingUserEvents(getCurrMonth(),3).catch(err => {
          console.log(err);
      });
      setCurrentDates(current.data.data);
      setUpcomingDates(upcoming.data.data);
      }
      fetchData();
  },[]);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "transparent" }}>
          <Typography
            variant="h2"
            sx={{
              color: "secondary.main",
              textAlign: "center",
              marginTop: "5rem",
            }}
          >
            Upcoming Dates
          </Typography>
          <Divider sx={{ mt: 2 }} />
          <Typography variant="h3" sx={{ color: "secondary.dark" }}>
            Current Month
          </Typography>
          <Divider sx={{ mb: 3}} />
            <DateCard savedDates={currentDates} scrollRef={scrollRef1}/>
          <Divider sx={{ mt: 3 }} />
          <Typography variant="h3" sx={{ color: "secondary.dark" }}>
            Upcoming Months
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <DateCard savedDates={upcomingDates} scrollRef={scrollRef2}/>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default ListDate;
