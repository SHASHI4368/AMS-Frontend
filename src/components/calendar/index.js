import React, { useEffect } from "react";
import { CalendarContainer } from "../../styles/calendar";
import { useUIContext } from "../../context/ui";
import { useNavigate } from "react-router-dom";
import StudentCalendar from "./studentCalendar";
import StaffCalendar from "./staffCalendar";
import Popup from "./popups";
import { CalendarProvider } from "../../context/calendar";

const Calendar = () => {
  const navigate = useNavigate();
  const { authorized, userType } = useUIContext();

  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, []);

  return (
    <CalendarProvider>
      <CalendarContainer>
        {userType === "Student" ? <StudentCalendar /> : <StaffCalendar />}
        <Popup/>
      </CalendarContainer>
    </CalendarProvider>
  );
};

export default Calendar;
