import React, { useEffect } from "react";
import {
  CalendarContainer,
  CalendarHeader,
  CalendarHeaderItem,
  PopupDivider,
} from "../../styles/calendar";
import { useUIContext } from "../../context/ui";
import { useNavigate } from "react-router-dom";
import StudentCalendar from "./studentCalendar";
import StaffCalendar from "./staffCalendar";
import Popup from "./popups";
import { CalendarProvider } from "../../context/calendar";
import CurrentTime from "./other/currentTime";
import ColorPalette from "./other/colorPalette";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import "@fontsource/raleway";
import "@fontsource/poppins";
import StaffInfoCard from "./other/staffInfoCard";

const Calendar = () => {
  const navigate = useNavigate();
  const { authorized, userType } = useUIContext();
  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, []);

  return (
    <CalendarProvider>
      {userType === "Student" && (
        <>
          <CalendarHeader
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: "110px",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <CalendarHeaderItem>
              <StaffInfoCard />
            </CalendarHeaderItem>
            <CalendarHeaderItem>
              {!medium && <CurrentTime />}

              <Typography sx={{ fontFamily: "Poppins", mt: "10px" }}>
                Palette
              </Typography>
              <PopupDivider />
              <ColorPalette />
            </CalendarHeaderItem>
          </CalendarHeader>
          <CalendarContainer>
            <StudentCalendar />
            <Popup />
          </CalendarContainer>
        </>
      )}
      {userType === "Staff" && (
        <>
          <CalendarHeader>
            <CurrentTime />
            <Typography sx={{ fontFamily: "Poppins", mt: "10px" }}>
              Palette
            </Typography>
            <PopupDivider />
            <ColorPalette />
          </CalendarHeader>
          <CalendarContainer>
            {userType === "Student" ? <StudentCalendar /> : <StaffCalendar />}
            <Popup />
          </CalendarContainer>
        </>
      )}
    </CalendarProvider>
  );
};

export default Calendar;
