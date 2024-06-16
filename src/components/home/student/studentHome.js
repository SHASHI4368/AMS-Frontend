import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../context/ui";
import { useNavigate } from "react-router-dom";
import {
  AppointmentContainer,
  HomeContainer,
  HomeDivider,
  PendingAppointmentContainer,
  Subtitle,
  TodayAppointmentContainer,
} from "../../../styles/home";
import CurrentTime from "../../calendar/other/currentTime";
import { PopupDivider } from "../../../styles/calendar";
import { Colors } from "../../../styles/theme";

const StudentHome = () => {

 const {
   authorized,
   setAlertOpen,
   setAlertMessage,
   userType,
   studentAppointments,
 } = useUIContext();
 const [todayAppointments, setTodayAppointments] = useState([]);

 useEffect(() => {
   console.log(studentAppointments);
   if (studentAppointments) {
     const today = new Date();
     const appointments = studentAppointments.filter((appointment) => {
       const date = new Date(appointment.Start_time);
       return (
         date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear() && 
         appointment.Apt_status === "New"
       );
     });
     setTodayAppointments(appointments);
   }
 }, []);

 const navigate = useNavigate();
  return (
    <HomeContainer sx={{ minHeight: "600px" }}>
      <AppointmentContainer>
        <TodayAppointmentContainer>
          <CurrentTime />
          <Subtitle>Today's Appointments</Subtitle>
          <HomeDivider />
          {studentAppointments.map((appointment) => {
            return (
              <Box key={appointment.Id}>
                <Box>
                  <Typography>{appointment.Subject}</Typography>
                  <Typography>{appointment.StartTime}</Typography>
                </Box>
              </Box>
            );
          })}
        </TodayAppointmentContainer>
        <PendingAppointmentContainer>sdfsdfdsdsf</PendingAppointmentContainer>
      </AppointmentContainer>
    </HomeContainer>
  );
};

export default StudentHome;
