import React, { useEffect, useState } from "react";
import { CalendarHeader, CurrentTimeDisplay } from "../../../styles/calendar";
import { format } from "date-fns";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(
    format(new Date(), "EEE MMM dd yyyy hh:mm a")
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), "EEE MMM dd yyyy hh:mm a"));
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);
  return <CurrentTimeDisplay>{currentTime}</CurrentTimeDisplay>;
};

export default CurrentTime;
