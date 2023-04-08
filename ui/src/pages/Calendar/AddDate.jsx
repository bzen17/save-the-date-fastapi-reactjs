import {
  Container,
  CssBaseline,
  Box,
  Grid,
  Stack,
  Chip,
  TextField,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import useStyles from "../../config/muiMakeStyles";
import React, { useEffect, useRef, useState } from "react";
import ScrollableSelector from "../../components/ScrollableSelector";
import styled from "styled-components";
import { getCurrentUser } from "../../api/auth";
import { addEvent } from "../../api/event";
import { useHorizontalScroll } from "../../utils/useHorizontalScroll";
import { useLoader } from "../../redux/store/loader-context";
import Loader from "../../components/Loader";
import Notification from "../../components/Notification";
import LoadingButton from '@mui/lab/LoadingButton';
import ReactLoading from "react-loading";
import { useMediaQuery } from "react-responsive";

const AddDate = () => {
  const classes = useStyles();
  const loader = useLoader();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [notification, setNotification] = useState({})
  const [selectedDate, setSelectedDate] = useState({ Day: "", Month: "" });
  const [selectedOccasion, setSelectedOccasion] = useState({
    Name: "",
    Other: "",
  });
  const [selectedPerson, setSelectedPerson] = useState({
    Relation: "",
    Name: "",
    Other: "",
  });
  const months = [
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
  const occasion = ["Birthday", "Anniversary", "Others"];
  const relation = [
    "Self",
    "Friend",
    "Mother",
    "Father",
    "Sister",
    "Brother",
    "Daughter",
    "Son",
    "Cousin",
    "Colleagues",
    "Employees",
    "Others",
  ];
  const scrollRef1 = useHorizontalScroll();
  const scrollRef2 = useHorizontalScroll();
  const scrollRef3 = useHorizontalScroll();
  const scrollRef4 = useHorizontalScroll();

  const handleDayClick = (e, i) => {
    setSelectedDate((prevState) => {
      return { ...prevState, Day: i };
    });
  };
  const handleMonthClick = (e, i) => {
    setSelectedDate((prevState) => {
      return { ...prevState, Month: i };
    });
  };
  const handleoccasionClick = (e, i) => {
    setSelectedOccasion((prevState) => {
      return { ...prevState, Name: i };
    });
  };
  const handlePersonRelationClick = (e, i) => {
    setSelectedPerson((prevState) => {
      return { ...prevState, Relation: i };
    });
  };
  const ValidateForm = () => {
    if (
      selectedDate.Day &&
      selectedDate.Month &&
      (selectedOccasion.Name ||
        (selectedOccasion.Name === "Others" && selectedOccasion.Other)) &&
      selectedPerson.Name &&
      (selectedPerson.Relation ||
        (selectedPerson.Relation === "Others" && selectedPerson.Other))
    ) {
      return true;
    } else {
      return false;
    }
  };
  const FormData = async () => {
    const user = await getCurrentUser();
    let data = {
      username: user.data.username,
      day: selectedDate.Day,
      month: selectedDate.Month,
      occasion:
        selectedOccasion.Name && selectedOccasion.Name === "Others"
          ? selectedOccasion.Other
          : selectedOccasion.Name,
      relation:
        selectedPerson.Relation && selectedPerson.Relation === "Others"
          ? selectedPerson.Other
          : selectedPerson.Relation,
      name: selectedPerson.Name,
    };
    return data;
  };
  useEffect(() => {
    loader.setIsLoading(false);
    console.log('not',notification,Object.keys(notification).length===0)
  },[]);
  const handleSubmitForm = async () => {
    loader.setIsLoading(true);
    if (ValidateForm()) {
      const formData = await FormData();
      
      const res = await addEvent(formData).catch((err) => {
        loader.setIsLoading(false);
        setNotification({message: "Something went wrong! Database server might be down.", type: "error"})
      });
      console.log('addEvent',res)
      loader.setIsLoading(false);
      setNotification({message: "Event added successfully!", type: "success"})
    } else {
      setNotification({message: "Form Data Invalid!", type: "error"})
    }
    loader.setIsLoading(false);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="false" sx={{ bgcolor: "primary.main" }}>
        <Notification notification={notification} setNotification={setNotification}/>
        <Container maxWidth="xl">
          <Box sx={{ bgcolor: "transparent" }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: isMobile?"2.75rem":"3.75rem",
                color: "secondary.main",
                textAlign: "center",
              }}
            >
              Add a Date
            </Typography>
            <Divider sx={{ mt: 2 }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h2" sx={{ fontSize: isMobile?"2.75rem":"3.75rem",color: "secondary.dark" }}>
                Date
              </Typography>
              <Stack direction="row" spacing={3}>
                {Object.keys(selectedDate).map((key) => {
                  let px, py, val;
                  val = selectedDate[key];
                  if (key === "Day") {
                    px =
                      val === 1
                        ? "0.7rem"
                        : val.toString().trim().length === 1 || val === 11
                        ? "0.6rem"
                        : "0.5rem";
                    py = "1.5rem";
                  } else {
                    px = "1rem";
                    py = "1.5rem";
                  }

                  return selectedDate[key] !== "" ? (
                    <Chip
                      label={val}
                      key={key}
                      sx={{
                        fontSize: "1rem",
                        py: py,
                        px: px,
                        borderRadius: "4rem",
                        bgcolor: "rgba(13, 33, 161, 1)",
                        color: "primary.main",
                      }}
                    />
                  ) : (
                    ""
                  );
                })}
              </Stack>
            </div>
            <Divider sx={{ mb: 3 }} />
            <ScrollableSelector
              title="Day"
              scrollRef={scrollRef1}
              array={[...Array(31)]}
              handleClick={handleDayClick}
              selected={selectedDate.Day}
            />
            <ScrollableSelector
              title="Month"
              scrollRef={scrollRef2}
              array={months}
              handleClick={handleMonthClick}
              selected={selectedDate.Month}
            />
            <Divider />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h2" sx={{ fontSize: isMobile?"2.75rem":"3.75rem",color: "secondary.dark" }}>
                Occasion
              </Typography>
              {selectedOccasion.Name !== "" &&
              selectedOccasion.Name !== "Others" ? (
                <Chip
                  label={selectedOccasion.Name}
                  sx={{
                    fontSize: "1rem",
                    py: "1.5rem",
                    px: "1rem",
                    borderRadius: "4rem",
                    bgcolor: "rgba(13, 33, 161, 1)",
                    color: "primary.main",
                  }}
                />
              ) : selectedOccasion.Name === "Others" ? (
                <TextField
                  name="name"
                  variant="filled"
                  placeholder="Enter occasion..."
                  InputProps={{ className: classes.selectedInput }}
                  inputProps={{ className: classes.input }}
                  value={selectedOccasion.Other}
                  onChange={(e) =>
                    setSelectedOccasion((prevState) => {
                      return { ...prevState, Other: e.target.value };
                    })
                  }
                />
              ) : (
                ""
              )}
            </div>
            <Divider sx={{ mb: 3 }} />
            <ScrollableSelector
              title="Name"
              scrollRef={scrollRef3}
              array={occasion}
              handleClick={handleoccasionClick}
              selected={selectedOccasion.Name}
            />

            <Divider />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h2" sx={{ fontSize: isMobile?"2.75rem":"3.75rem", color: "secondary.dark" }}>
                Person
              </Typography>
              <Stack direction="row" spacing={3}>
                {Object.keys(selectedPerson).map((key) => {
                  let val;
                  val = selectedPerson[key];
                  return selectedPerson[key] !== "" &&
                    selectedPerson["Relation"] !== "Others" ? (
                    <Chip
                      key={val}
                      label={val}
                      sx={{
                        fontSize: "1rem",
                        py: "1.5rem",
                        px: "1rem",
                        borderRadius: "4rem",
                        bgcolor: "rgba(13, 33, 161, 1)",
                        color: "primary.main",
                      }}
                    />
                  ) : (
                    ""
                  );
                })}
                {selectedPerson["Relation"] === "Others" && (
                  <TextField
                    name="name"
                    variant="filled"
                    placeholder="Enter relation..."
                    InputProps={{ className: classes.selectedInput }}
                    inputProps={{ className: classes.input }}
                    value={selectedPerson.Other}
                    onChange={(e) =>
                      setSelectedPerson((prevState) => {
                        return { ...prevState, Other: e.target.value };
                      })
                    }
                  />
                )}
              </Stack>
            </div>
            <Divider sx={{ mb: 3 }} />
            <ScrollableSelector
              title="Relation"
              scrollRef={scrollRef4}
              array={relation}
              handleClick={handlePersonRelationClick}
              selected={selectedPerson.Relation}
            />
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant="h3"
                  mr={6}
                  sx={{ fontSize: isMobile?"2rem":"3rem",color: "secondary.main" }}
                >
                  Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <TextField
                  name="name"
                  variant="filled"
                  fullWidth={true}
                  InputProps={{ className: classes.Input }}
                  inputProps={{ className: classes.input }}
                  value={selectedPerson.Name}
                  onChange={(e) =>
                    setSelectedPerson((prevState) => {
                      return { ...prevState, Name: e.target.value };
                    })
                  }
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth={true}
              onClick={handleSubmitForm}
              sx={{
                mt: 3,
                mb: 3,
                color: "primary.main",
                textAlign: "center",
                backgroundColor: "secondary.main",
                fontWeight: "600",
                fontSize: "1.5rem",
                padding: "0.5rem 2rem",
                borderRadius: "3rem",
                "&:hover": {
                  backgroundColor: "secondary.dark",
                  color: "primary.main",
                },
              }}
              loading={loader.isLoading}
              loadingIndicator={<ReactLoading type="balls" height={32} width={32}/>}
            >
              SAVE
            </LoadingButton>
          </Box>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default AddDate;
