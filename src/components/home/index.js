import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUIContext } from "../../context/ui";
import { useNavigate } from "react-router-dom";
import {
  AppointmentContainer,
  HomeContainer,
  HomeDivider,
  PendingAppointmentContainer,
  Subtitle,
  TodayAppointmentContainer,
  VerticalDivider,
} from "../../styles/home";
import CurrentTime from "../calendar/other/currentTime";
import { PopupDivider } from "../../styles/calendar";
import { Colors } from "../../styles/theme";
import StudentHome from "./student/studentHome";

const Home = () => {
  const { authorized, setAlertOpen, setAlertMessage, userType } =
    useUIContext();
  const navigate = useNavigate();
  if (!authorized) {
    setAlertOpen(true);
    setAlertMessage("Please login to continue");
    navigate("/");
  }

  return (
    <>
    {userType === "Student" && (
      <StudentHome/>
    )}
    </>
  );
};

export default Home;
