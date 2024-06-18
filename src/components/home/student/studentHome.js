import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../context/ui";
import { useNavigate } from "react-router-dom";
import {
  AppointmentContainer,
  HomeContainer,
  HomeDivider,
  HomeDividerMain,
  MainButton,
  NoAptText,
  NoAptTextMain,
  PendingAppointmentContainer,
  SliderContainer,
  SmallAppointmentContainer,
  Subtitle,
  Subtitle2,
  TodayAppointmentContainer,
} from "../../../styles/home";
import CurrentTime from "../../calendar/other/currentTime";
import { PopupDivider } from "../../../styles/calendar";
import { Colors } from "../../../styles/theme";
import axios from "axios";
import { format } from "date-fns";
import AppointmentCard from "./appointmentCard";
import Slider from "react-slick";
import { Circle } from "@mui/icons-material";
import SmallAppointmentCard from "./smallAppointmentCard";
import { NoStaffText, StaffScrollContainer } from "../../../styles/department";
import RightArrow from "../other/rightArrow";
import LeftArrow from "../other/leftArrow";

const StudentHome = () => {

 const {
   regNumber,
   studentAppointments,
   setStudentAppointments,
 } = useUIContext();
 const [todayAppointments, setTodayAppointments] = useState([]);
 const [pendingAppointments, setPendingAppointments] = useState([]);
  const [requestedAppointments, setRequestedAppointments] = useState([]);

 useEffect(() => {
  const getStudentAppointments = async () => {
    try {
      const url = `http://localhost:8080/db/student/appointments/${regNumber}`;
      const response = await axios.get(url);
      setStudentAppointments(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  getStudentAppointments();
 }, []);

 useEffect(() => {
   if (studentAppointments) {
     const today = new Date();
     const appointments = studentAppointments.filter((appointment) => (format(appointment.StartTime , "yyyy-MM-dd") === format(today, "yyyy-MM-dd")) && appointment.Apt_status === "Confirmed");
     setTodayAppointments(appointments);

      const pending = studentAppointments.filter((appointment) => (appointment.Apt_status === "Confirmed") );
      setPendingAppointments(pending);

      const requested = studentAppointments.filter((appointment) => appointment.Apt_status === "New");
      setRequestedAppointments(requested);
   }

 }, [studentAppointments]);

 const settings = {
   dots: true,
   infinite: false,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
   nextArrow: <RightArrow />,
   prevArrow: <LeftArrow />,

 };

 const navigate = useNavigate();
 const theme = useTheme();
 const medium = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <HomeContainer>
      {!medium && (
        <AppointmentContainer>
          <TodayAppointmentContainer>
            <CurrentTime />
            <Subtitle>Today's Appointments</Subtitle>
            <HomeDividerMain />
            {todayAppointments.length === 0 && (
              <>
                <NoAptTextMain>No Appointments Today</NoAptTextMain>
              </>
            )}
            {todayAppointments.map((appointment) => {
              return <AppointmentCard appointment={appointment} />;
            })}
          </TodayAppointmentContainer>
          <PendingAppointmentContainer>
            <Subtitle2>Pending Appointments</Subtitle2>
            <HomeDivider />
            {pendingAppointments.length === 0 && (
              <NoAptText>No Appointments Found</NoAptText>
            )}
            <SliderContainer>
              <Slider {...settings}>
                {pendingAppointments.map((appointment) => (
                  <SmallAppointmentContainer key={appointment.Id}>
                    <SmallAppointmentCard appointment={appointment} />
                  </SmallAppointmentContainer>
                ))}
              </Slider>
            </SliderContainer>
            <Subtitle2>Requested Appointments</Subtitle2>
            <HomeDivider />
            {requestedAppointments.length === 0 && (
              <NoAptText>No Appointments Found</NoAptText>
            )}
            <SliderContainer>
              <Slider {...settings}>
                {requestedAppointments.map((appointment) => (
                  <SmallAppointmentContainer key={appointment.Id}>
                    <SmallAppointmentCard appointment={appointment} />
                  </SmallAppointmentContainer>
                ))}
              </Slider>
            </SliderContainer>
          </PendingAppointmentContainer>
        </AppointmentContainer>
      )}
      {medium && (
        <PendingAppointmentContainer>
          <Subtitle2 sx={{ mt: 15 }}>Today's Appointments</Subtitle2>
          <HomeDivider />
          {todayAppointments.length === 0 && (
            <NoAptText>No Appointments Found</NoAptText>
          )}
          <SliderContainer>
            <Slider variableWidth {...settings}>
              {todayAppointments.map((appointment) => (
                <SmallAppointmentContainer key={appointment.Id}>
                  <SmallAppointmentCard appointment={appointment} />
                </SmallAppointmentContainer>
              ))}
            </Slider>
          </SliderContainer>
          <Subtitle2>Pending Appointments</Subtitle2>
          <HomeDivider />
          {pendingAppointments.length === 0 && (
            <NoAptText>No Appointments Found</NoAptText>
          )}
          <SliderContainer>
            <Slider variableWidth {...settings}>
              {pendingAppointments.map((appointment) => (
                <SmallAppointmentContainer key={appointment.Id}>
                  <SmallAppointmentCard appointment={appointment} />
                </SmallAppointmentContainer>
              ))}
            </Slider>
          </SliderContainer>
          <Subtitle2>Requested Appointments</Subtitle2>
          <HomeDivider />
          {requestedAppointments.length === 0 && (
            <NoAptText>No Appointments Found</NoAptText>
          )}
          <SliderContainer>
            <Slider variableWidth {...settings}>
              {requestedAppointments.map((appointment) => (
                <SmallAppointmentContainer key={appointment.Id}>
                  <SmallAppointmentCard appointment={appointment} />
                </SmallAppointmentContainer>
              ))}
            </Slider>
          </SliderContainer>
        </PendingAppointmentContainer>
      )}
    </HomeContainer>
  );
};

export default StudentHome;
