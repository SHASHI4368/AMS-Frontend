import React, { useEffect, useState } from "react";
import {
  PopupButton,
  PopupButtonContainer,
  PopupDate,
  PopupDivider,
  PopupLabel,
  PopupPaper,
  PopupTitle,
} from "../../../../styles/calendar";
import { Divider, Typography } from "@mui/material";
import { useCalendarContext } from "../../../../context/calendar";
import { format } from "date-fns";
import { Colors } from "../../../../styles/theme";
import { lighten } from "polished";
import axios from "axios";
import { useUIContext } from "../../../../context/ui";

const BlockPopup = () => {
  const { email } = useUIContext();
  const { startTime, endTime, setPopupOpen } = useCalendarContext();
  const [formattedStartTime, setFormattedStartTime] = useState("");
  const [formattedEndTime, setFormattedEndTime] = useState("");

  useEffect(() => {
    setFormattedStartTime(format(new Date(startTime), "EEE MMM dd yyyy HH:mm"));
  }, [startTime]);

  useEffect(() => {
    setFormattedEndTime(format(new Date(endTime), "EEE MMM dd yyyy HH:mm"));
  }, [endTime]);

  const getLastAppointment = async () => {
    try {
      const url = `http://localhost:8080/db/appointment/last`;
      const response = await axios.get(url);
      console.log(response.data);
      if (response.data.length === 0) {
        return 1;
      } else {
        return response.data[0].Id;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addBlockTimeSlot = async () => {
   const id = await getLastAppointment() + 1;
   console.log(id);
    try {
      const url = `http://localhost:8080/db/appointment/block`;
      const data = {
        Id: id,
        Lecturer_mail: email,
        StartTime: startTime,
        EndTime: endTime,
      };
      const response = await axios.post(url, data);
      console.log(response.data);
      setPopupOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PopupPaper>
      <PopupTitle variant="h4">Block this time slot</PopupTitle>
      <PopupDivider />
      <PopupLabel>From</PopupLabel>
      <PopupDate>{formattedStartTime}</PopupDate>
      <PopupLabel sx={{ ml: "-430px" }}>To</PopupLabel>
      <PopupDate>{formattedEndTime}</PopupDate>
      <PopupButtonContainer>
        <PopupButton onClick={() => addBlockTimeSlot()} variant="contained">Block</PopupButton>
        <PopupButton variant="text" onClick={() => setPopupOpen(false)}>
          Cancel
        </PopupButton>
      </PopupButtonContainer>
    </PopupPaper>
  );
};

export default BlockPopup;
