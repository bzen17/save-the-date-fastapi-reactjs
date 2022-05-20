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
import {
  getCurrentMonthUserEvents,
  getUpcomingUserEvents,
} from "../../api/event";
import { getCurrMonth } from "../../utils/getDateAttr";
import { useHorizontalScroll } from "../../utils/useHorizontalScroll";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "../../redux/store/auth-context";
import Loader from "../../components/Loader";
import { useLoader } from "../../redux/store/loader-context";

const ListDate = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const loader = useLoader();
  const scrollRef1 = useHorizontalScroll();
  const scrollRef2 = useHorizontalScroll();
  const [currentDates, setCurrentDates] = useState([]);
  const [upcomingDates, setUpcomingDates] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const current = await getCurrentMonthUserEvents(
        new Date().getDate(),
        getCurrMonth()
      ).catch((err) => {
        console.log(err);
      });
      const upcoming = await getUpcomingUserEvents(getCurrMonth(), 3).catch(
        (err) => {
          console.log(err);
          loader.setIsLoading(false);
        }
      );
      setCurrentDates(current.data.data);
      setUpcomingDates(upcoming.data.data);
      loader.setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      {loader.isLoading?<Loader/>:<Container maxWidth="false" sx={{ bgcolor: "primary.main" }}>
      <Container maxWidth="xl" >
        <Box sx={{ bgcolor: "transparent" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: isMobile?"2.75rem":"3.75rem",
              color: "secondary.main",
              textAlign: "center",
            }}
          >
            Upcoming Dates
          </Typography>
          <Divider sx={{ mt: 2 }} />
          <Typography variant="h3" sx={{ fontSize: isMobile?"2rem":"3rem",color: "secondary.dark" }}>
            Current Month
          </Typography>
          <Divider sx={{ mb: 3 }} />
          {currentDates.length > 0 ? (
            <DateCard savedDates={currentDates} scrollRef={scrollRef1}/>
          ) : (
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                my: "9.5rem",
                fontSize: "1.5rem",
              }}
            >
              No saved dates found.
            </Typography>
          )}
          <Divider sx={{ mt: 3 }} />
          <Typography variant="h3" sx={{ fontSize: isMobile?"2rem":"3rem",color: "secondary.dark" }}>
            Upcoming Months
          </Typography>
          <Divider sx={{ mb: 3 }} />
          {upcomingDates.length > 0 ? (
            <DateCard savedDates={upcomingDates} scrollRef={scrollRef2} />
          ) : (
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                my: "9.5rem",
                fontSize: "1.5rem",
              }}
            >
              No saved dates found.
            </Typography>
          )}
        </Box>
      </Container>
      </Container>}
    </React.Fragment>
  );
};

export default ListDate;
